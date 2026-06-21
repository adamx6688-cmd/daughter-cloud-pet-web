import { describe, expect, test } from 'vitest';
import {
  DAILY_ENERGY_CAP,
  addTaskTemplate,
  buildDailyTasks,
  calculateTimedEnergy,
  completeTask,
  createInitialState,
  dateKey,
  deleteFamilyData,
  energyEarnedOnDate,
  exportFamilyData,
  generateAiMessage,
  generatePetSnapshot,
  getActiveDays,
  getTasksForDate,
  setupPet,
  startTask,
  undoTask,
  updateProfiles,
  useShopItem
} from '../src/lib/domain';

const monday = new Date('2026-06-22T10:00:00.000Z');
const unsafeWords = ['饿死', '死亡', '扣血', '惩罚', '威胁', '害死', '不听话'];

describe('learning habit pet rules', () => {
  test('first-time child can choose and name a pet', () => {
    let state = createInitialState(monday);
    expect(state.childProfile.onboarded).toBe(false);
    state = setupPet(state, {
      childNickname: '小鹿',
      petName: '云云',
      species: 'bunny',
      now: monday
    });
    expect(state.childProfile.onboarded).toBe(true);
    expect(state.childProfile.nickname).toBe('小鹿');
    expect(state.petProfile.name).toBe('云云');
    expect(state.petProfile.species).toBe('bunny');
  });

  test('builds default child-facing daily learning tasks', () => {
    const state = buildDailyTasks(createInitialState(monday), monday);
    const tasks = getTasksForDate(state, monday);
    expect(tasks.some((task) => task.title === '阅读 10 分钟')).toBe(true);
    expect(tasks.some((task) => task.title === '专心完成今天作业')).toBe(true);
    expect(tasks.every((task) => task.requiresParentApproval === false)).toBe(true);
  });

  test('timed completion grants bonus energy when finished early', () => {
    let state = buildDailyTasks(createInitialState(monday), monday);
    const task = getTasksForDate(state, monday).find((item) => item.title === '阅读 10 分钟');
    state = startTask(state, task!.id, { targetMinutes: 15, startedAt: monday });
    expect(state.dailyTasks[task!.id].status).toBe('in_progress');
    state = completeTask(state, task!.id, {
      completedAt: new Date('2026-06-22T10:10:00.000Z'),
      elapsedMinutes: 10
    });
    expect(state.dailyTasks[task!.id].status).toBe('approved');
    expect(state.dailyTasks[task!.id].earnedEnergy).toBeGreaterThan(task!.energyValue);
    expect(state.petProfile.energyBalance).toBeGreaterThan(18);
  });

  test('daily energy cap prevents runaway reward loops', () => {
    let state = createInitialState(monday);
    for (let index = 0; index < 6; index += 1) {
      state = addTaskTemplate(state, {
        id: `bonus-${index}`,
        title: `额外任务 ${index}`,
        type: 'daily',
        energyValue: 24,
        requiresParentApproval: false
      });
    }
    state = buildDailyTasks(state, monday);
    const bonusTasks = getTasksForDate(state, monday).filter((task) => task.templateId.startsWith('bonus-'));
    bonusTasks.forEach((task) => {
      state = startTask(state, task.id, { targetMinutes: 20, startedAt: monday });
      state = completeTask(state, task.id, { completedAt: monday, elapsedMinutes: 10 });
    });
    expect(energyEarnedOnDate(state, dateKey(monday))).toBe(DAILY_ENERGY_CAP);
  });

  test('feeding, cleaning, and dressing spend balance without reducing lifetime energy', () => {
    let state = createInitialState(monday);
    state.petProfile.totalEnergy = 150;
    state.petProfile.energyBalance = 80;
    state.energyLedger.push(
      {
        id: 'seed-1',
        taskId: 'seed-1',
        templateId: 'seed',
        amount: 75,
        dateKey: '2026-06-21',
        reason: 'seed',
        createdAt: monday.toISOString()
      },
      {
        id: 'seed-2',
        taskId: 'seed-2',
        templateId: 'seed',
        amount: 75,
        dateKey: dateKey(monday),
        reason: 'seed',
        createdAt: monday.toISOString()
      }
    );
    const beforeLifetime = state.petProfile.totalEnergy;
    state = useShopItem(state, 'star-cookie', monday);
    state = useShopItem(state, 'bubble-brush', monday);
    state = useShopItem(state, 'star-hat', monday);
    expect(state.petProfile.fullness).toBeGreaterThan(64);
    expect(state.petProfile.cleanliness).toBeGreaterThan(70);
    expect(state.petProfile.equippedOutfit).toContain('star-hat');
    expect(state.petProfile.totalEnergy).toBe(beforeLifetime);
    expect(state.petProfile.energyBalance).toBeLessThan(80);
  });

  test('upgrade depends on lifetime energy and active days', () => {
    let state = createInitialState(monday);
    state.petProfile.totalEnergy = 120;
    state.energyLedger = [
      {
        id: 'd1',
        taskId: 'a',
        templateId: 'a',
        amount: 30,
        dateKey: '2026-06-18',
        reason: 'a',
        createdAt: monday.toISOString()
      },
      {
        id: 'd2',
        taskId: 'b',
        templateId: 'b',
        amount: 30,
        dateKey: '2026-06-19',
        reason: 'b',
        createdAt: monday.toISOString()
      },
      {
        id: 'd3',
        taskId: 'c',
        templateId: 'c',
        amount: 30,
        dateKey: '2026-06-20',
        reason: 'c',
        createdAt: monday.toISOString()
      },
      {
        id: 'd4',
        taskId: 'd',
        templateId: 'd',
        amount: 30,
        dateKey: '2026-06-21',
        reason: 'd',
        createdAt: monday.toISOString()
      },
      {
        id: 'd5',
        taskId: 'e',
        templateId: 'e',
        amount: 30,
        dateKey: '2026-06-22',
        reason: 'e',
        createdAt: monday.toISOString()
      }
    ];
    const snapshot = generatePetSnapshot(state, monday).snapshot;
    expect(getActiveDays(state)).toBe(5);
    expect(snapshot.stageId).toBe('buddy');
    expect(snapshot.unlockedItems).toContain('cloud-scarf');
  });

  test('unfinished tasks and safe templates never create punitive pet states', () => {
    const state = buildDailyTasks(createInitialState(monday), monday);
    const snapshot = generatePetSnapshot(state, monday).snapshot;
    const result = generateAiMessage(state, 'reminder', monday);
    const text = `${snapshot.message} ${snapshot.moodLabel} ${result.message.content}`;
    unsafeWords.forEach((badWord) => expect(text).not.toContain(badWord));
  });

  test('undo removes task energy and parents can export/reset', () => {
    let state = buildDailyTasks(createInitialState(monday), monday);
    let task = getTasksForDate(state, monday).find((item) => item.title === '阅读 10 分钟');
    state = startTask(state, task!.id, { targetMinutes: 10, startedAt: monday });
    state = completeTask(state, task!.id, { completedAt: monday, elapsedMinutes: 8 });
    expect(state.petProfile.totalEnergy).toBeGreaterThan(0);
    state = undoTask(state, task!.id);
    expect(state.dailyTasks[task!.id].status).toBe('open');
    expect(state.petProfile.totalEnergy).toBe(0);

    state = updateProfiles(state, '小鹿', '云云');
    const exported = exportFamilyData(state);
    expect(exported).toContain('云云');

    const reset = deleteFamilyData(monday);
    expect(reset.petProfile.totalEnergy).toBe(0);
    expect(reset.childProfile.onboarded).toBe(false);
  });

  test('timed energy formula rewards early completion more than late completion', () => {
    const early = calculateTimedEnergy(10, 20, 10);
    const onTime = calculateTimedEnergy(10, 20, 19);
    const late = calculateTimedEnergy(10, 20, 30);
    expect(early.amount).toBeGreaterThan(onTime.amount);
    expect(onTime.amount).toBeGreaterThan(late.amount);
  });
});
