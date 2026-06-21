import { describe, expect, test } from 'vitest';
import {
  DAILY_ENERGY_CAP,
  addTaskTemplate,
  approveTask,
  buildDailyTasks,
  completeTask,
  createInitialState,
  dateKey,
  deleteFamilyData,
  energyEarnedOnDate,
  exportFamilyData,
  generateAiMessage,
  generatePetSnapshot,
  getPendingApprovals,
  getTasksForDate,
  moveTaskTemplate,
  sanitizeSafetyText,
  undoTask,
  updateProfiles
} from '../src/lib/domain';

const monday = new Date('2026-06-22T10:00:00.000Z');
const unsafeWords = ['饿死', '死亡', '扣血', '惩罚', '威胁', '害死', '不听话'];

describe('learning habit pet rules', () => {
  test('builds default daily and weekly learning tasks', () => {
    const state = buildDailyTasks(createInitialState(monday), monday);
    const tasks = getTasksForDate(state, monday);
    expect(tasks.some((task) => task.title === '阅读 10 分钟')).toBe(true);
    expect(tasks.some((task) => task.title === '专心完成今天作业')).toBe(true);
    expect(tasks.some((task) => task.type === 'weekly')).toBe(true);
  });

  test('completion that needs parent approval waits before granting energy', () => {
    let state = buildDailyTasks(createInitialState(monday), monday);
    const task = getTasksForDate(state, monday).find((item) => item.requiresParentApproval);
    expect(task).toBeDefined();

    state = completeTask(state, task!.id, { completedAt: monday });
    expect(state.dailyTasks[task!.id].status).toBe('pending_parent');
    expect(state.petProfile.totalEnergy).toBe(0);
    expect(getPendingApprovals(state)).toHaveLength(1);

    state = approveTask(state, task!.id, { approvedAt: monday });
    expect(state.dailyTasks[task!.id].status).toBe('approved');
    expect(state.petProfile.totalEnergy).toBeGreaterThan(0);
  });

  test('daily energy cap prevents runaway reward loops', () => {
    let state = createInitialState(monday);
    for (let index = 0; index < 6; index += 1) {
      state = addTaskTemplate(state, {
        id: `bonus-${index}`,
        title: `额外任务 ${index}`,
        type: 'daily',
        energyValue: 20,
        requiresParentApproval: false
      });
    }
    state = buildDailyTasks(state, monday);
    const bonusTasks = getTasksForDate(state, monday).filter((task) => task.templateId.startsWith('bonus-'));
    bonusTasks.forEach((task) => {
      state = completeTask(state, task.id, { completedAt: monday });
    });
    expect(energyEarnedOnDate(state, dateKey(monday))).toBe(DAILY_ENERGY_CAP);
  });

  test('pet stage upgrades from accumulated growth energy', () => {
    const state = createInitialState(monday);
    state.petProfile.totalEnergy = 95;
    const snapshot = generatePetSnapshot(state, monday).snapshot;
    expect(snapshot.stageId).toBe('buddy');
    expect(snapshot.unlockedItems).toContain('story-corner');
  });

  test('unfinished tasks never create punitive pet states', () => {
    const state = buildDailyTasks(createInitialState(monday), monday);
    const snapshot = generatePetSnapshot(state, monday).snapshot;
    const text = `${snapshot.message} ${snapshot.moodLabel}`;
    unsafeWords.forEach((badWord) => expect(text).not.toContain(badWord));
  });

  test('safe templates sanitize blame and threat language', () => {
    const state = createInitialState(monday);
    const result = generateAiMessage(state, 'reminder', monday);
    unsafeWords.forEach((badWord) => expect(result.message.content).not.toContain(badWord));
    expect(sanitizeSafetyText('宠物不会饿死，也不会因为你不听话而惩罚你')).not.toContain('饿死');
  });

  test('undo removes energy for the target task only', () => {
    let state = buildDailyTasks(createInitialState(monday), monday);
    const task = getTasksForDate(state, monday).find((item) => !item.requiresParentApproval);
    state = completeTask(state, task!.id, { completedAt: monday });
    expect(state.petProfile.totalEnergy).toBeGreaterThan(0);
    state = undoTask(state, task!.id);
    expect(state.dailyTasks[task!.id].status).toBe('open');
    expect(state.petProfile.totalEnergy).toBe(0);
  });

  test('parents can edit profile, reorder tasks, export, and reset', () => {
    let state = createInitialState(monday);
    state = updateProfiles(state, '小鹿', '云云');
    expect(state.childProfile.nickname).toBe('小鹿');
    expect(state.petProfile.name).toBe('云云');

    const firstId = state.taskTemplates[0].id;
    state = moveTaskTemplate(state, firstId, 1);
    expect(state.taskTemplates[1].id).toBe(firstId);

    const exported = exportFamilyData(state);
    expect(exported).toContain('childProfile');
    expect(exported).toContain('云云');

    const reset = deleteFamilyData(monday);
    expect(reset.petProfile.totalEnergy).toBe(0);
    expect(reset.parentSettings.requireParentConsent).toBe(true);
  });
});
