export const APP_VERSION = '0.2.0';
export const DAILY_ENERGY_CAP = 40;

export type TaskType = 'daily' | 'once' | 'weekly';
export type TaskCategory = 'homework' | 'reading' | 'recite' | 'tidy' | 'review' | 'wellbeing';
export type Difficulty = 'easy' | 'normal' | 'brave';
export type TaskStatus = 'open' | 'pending_parent' | 'completed' | 'approved';
export type MessageType = 'encouragement' | 'story' | 'summary' | 'reminder';

export interface Stage {
  id: string;
  name: string;
  minEnergy: number;
  title: string;
  diary: string;
  unlocks: string[];
}

export interface ChildProfile {
  nickname: string;
  gradeBand: string;
  createdAt: string;
}

export interface PetProfile {
  name: string;
  species: 'cloud-star';
  totalEnergy: number;
  companion: number;
  stageId: string;
  unlockedItems: string[];
  lastInteractionAt: string | null;
}

export interface ParentSettings {
  requireParentConsent: boolean;
  aiEnabled: boolean;
  aiModes: MessageType[];
  allowCloudSync: boolean;
  quietHours: {
    start: string;
    end: string;
  };
  dataRetentionDays: number;
  safetyMode: 'child_first';
}

export interface TaskTemplate {
  id: string;
  title: string;
  type: TaskType;
  category: TaskCategory;
  difficulty: Difficulty;
  estimatedMinutes: number;
  energyValue: number;
  requiresParentApproval: boolean;
  countsTowardStreak: boolean;
  enabled: boolean;
  daysOfWeek: number[];
  scheduledDate?: string | null;
}

export interface DailyTask {
  id: string;
  templateId: string;
  title: string;
  type: TaskType;
  category: TaskCategory;
  categoryLabel: string;
  difficulty: Difficulty;
  difficultyLabel: string;
  estimatedMinutes: number;
  energyValue: number;
  requiresParentApproval: boolean;
  countsTowardStreak: boolean;
  dateKey: string;
  weekKey: string | null;
  dueLabel: string;
  status: TaskStatus;
  completedAt: string | null;
  approvedAt: string | null;
  note: string;
}

export interface CheckIn {
  id: string;
  taskId: string;
  dateKey: string;
  note: string;
  status: TaskStatus;
  createdAt: string;
}

export interface EnergyEntry {
  id: string;
  taskId: string;
  templateId: string;
  amount: number;
  dateKey: string;
  reason: string;
  createdAt: string;
}

export interface PetSnapshot {
  id: string;
  dateKey: string;
  petName: string;
  stageId: string;
  stageName: string;
  stageTitle: string;
  moodId: string;
  moodLabel: string;
  message: string;
  totalEnergy: number;
  todayEnergy: number;
  streak: number;
  nextStageName: string;
  progressToNext: number;
  unlockedItems: string[];
}

export interface DiaryEntry {
  id: string;
  type: MessageType;
  content: string;
  source: 'rule_based_safe_template';
  createdAt: string;
}

export interface FamilyState {
  version: string;
  childProfile: ChildProfile;
  petProfile: PetProfile;
  parentSettings: ParentSettings;
  taskTemplates: TaskTemplate[];
  dailyTasks: Record<string, DailyTask>;
  checkIns: CheckIn[];
  energyLedger: EnergyEntry[];
  petSnapshots: PetSnapshot[];
  aiMessageLogs: DiaryEntry[];
}

export const STAGES: Stage[] = [
  {
    id: 'egg',
    name: '云朵蛋',
    minEnergy: 0,
    title: '暖暖的小开始',
    diary: '我刚来到这个家，最喜欢听你讲今天的小发现。',
    unlocks: ['soft-bed']
  },
  {
    id: 'sprout',
    name: '云芽幼崽',
    minEnergy: 30,
    title: '会发光的小伙伴',
    diary: '你每天多一点点努力，我也跟着长出亮亮的小云芽。',
    unlocks: ['reading-lamp', 'star-rug']
  },
  {
    id: 'buddy',
    name: '星云伙伴',
    minEnergy: 90,
    title: '能陪你复盘的一天',
    diary: '我学会了帮你记住进步，也会提醒你休息眼睛。',
    unlocks: ['story-corner', 'focus-clock']
  },
  {
    id: 'guardian',
    name: '小小守护者',
    minEnergy: 180,
    title: '自己的节奏守护者',
    diary: '你已经很会照顾自己的学习节奏了，我为你闪闪发光。',
    unlocks: ['guardian-cape', 'memory-album']
  }
];

export const CATEGORY_LABELS: Record<TaskCategory, string> = {
  homework: '作业',
  reading: '阅读',
  recite: '背诵',
  tidy: '整理',
  review: '复盘',
  wellbeing: '身心'
};

export const DIFFICULTY_LABELS: Record<Difficulty, string> = {
  easy: '轻松',
  normal: '标准',
  brave: '挑战'
};

export const TASK_TYPE_LABELS: Record<TaskType, string> = {
  daily: '每日',
  once: '一次',
  weekly: '本周'
};

const SAFE_MESSAGE_REPLACEMENTS: Array<[string, string]> = [
  ['饿死', '有点想你'],
  ['死亡', '暂停成长'],
  ['死', '停下休息'],
  ['生病', '需要休息'],
  ['扣血', '少一点能量'],
  ['惩罚', '温柔提醒'],
  ['威胁', '提醒'],
  ['害死', '让它难过'],
  ['不听话', '还没准备好'],
  ['淘汰', '先放一放']
];

export const DEFAULT_TASK_TEMPLATES: TaskTemplate[] = [
  {
    id: 'read-10m',
    title: '阅读 10 分钟',
    type: 'daily',
    category: 'reading',
    difficulty: 'easy',
    estimatedMinutes: 10,
    energyValue: 8,
    requiresParentApproval: false,
    countsTowardStreak: true,
    enabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'homework-focus',
    title: '专心完成今天作业',
    type: 'daily',
    category: 'homework',
    difficulty: 'normal',
    estimatedMinutes: 30,
    energyValue: 14,
    requiresParentApproval: true,
    countsTowardStreak: true,
    enabled: true,
    daysOfWeek: [1, 2, 3, 4, 5]
  },
  {
    id: 'tidy-bag',
    title: '整理书包和桌面',
    type: 'daily',
    category: 'tidy',
    difficulty: 'easy',
    estimatedMinutes: 5,
    energyValue: 6,
    requiresParentApproval: false,
    countsTowardStreak: true,
    enabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  },
  {
    id: 'weekly-review',
    title: '本周错题/收获复盘 1 次',
    type: 'weekly',
    category: 'review',
    difficulty: 'brave',
    estimatedMinutes: 15,
    energyValue: 16,
    requiresParentApproval: true,
    countsTowardStreak: false,
    enabled: true,
    daysOfWeek: [0, 1, 2, 3, 4, 5, 6]
  }
];

function clone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

function pad(value: number): string {
  return String(value).padStart(2, '0');
}

function toDate(input?: Date | string | number | null): Date {
  if (!input) {
    return new Date();
  }
  if (input instanceof Date) {
    return new Date(input.getTime());
  }
  return new Date(input);
}

export function dateKey(input?: Date | string | number | null): string {
  const date = toDate(input);
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function isoNow(input?: Date | string | number | null): string {
  return toDate(input).toISOString();
}

function startOfDay(input?: Date | string | number | null): Date {
  const date = toDate(input);
  date.setHours(0, 0, 0, 0);
  return date;
}

function addDays(input: Date | string | number, amount: number): Date {
  const date = startOfDay(input);
  date.setDate(date.getDate() + amount);
  return date;
}

export function weekKey(input?: Date | string | number | null): string {
  const date = startOfDay(input);
  const day = date.getDay() || 7;
  date.setDate(date.getDate() - day + 1);
  return `${dateKey(date)}-week`;
}

export function createInitialState(now?: Date | string | number): FamilyState {
  const createdAt = isoNow(now);
  return {
    version: APP_VERSION,
    childProfile: {
      nickname: '小小探险家',
      gradeBand: 'primary',
      createdAt
    },
    petProfile: {
      name: '星星',
      species: 'cloud-star',
      totalEnergy: 0,
      companion: 0,
      stageId: 'egg',
      unlockedItems: ['soft-bed'],
      lastInteractionAt: null
    },
    parentSettings: {
      requireParentConsent: true,
      aiEnabled: true,
      aiModes: ['encouragement', 'story', 'summary', 'reminder'],
      allowCloudSync: false,
      quietHours: {
        start: '21:00',
        end: '07:00'
      },
      dataRetentionDays: 365,
      safetyMode: 'child_first'
    },
    taskTemplates: clone(DEFAULT_TASK_TEMPLATES),
    dailyTasks: {},
    checkIns: [],
    energyLedger: [],
    petSnapshots: [],
    aiMessageLogs: []
  };
}

export function normalizeState(input?: Partial<FamilyState> | null, now?: Date | string | number): FamilyState {
  const state = input ? clone(input) : createInitialState(now);
  const fresh = createInitialState(now);
  const normalized: FamilyState = {
    ...fresh,
    ...state,
    childProfile: { ...fresh.childProfile, ...(state.childProfile ?? {}) },
    petProfile: { ...fresh.petProfile, ...(state.petProfile ?? {}) },
    parentSettings: {
      ...fresh.parentSettings,
      ...(state.parentSettings ?? {}),
      quietHours: {
        ...fresh.parentSettings.quietHours,
        ...(state.parentSettings?.quietHours ?? {})
      }
    },
    taskTemplates: Array.isArray(state.taskTemplates) ? state.taskTemplates : clone(DEFAULT_TASK_TEMPLATES),
    dailyTasks: state.dailyTasks ?? {},
    checkIns: Array.isArray(state.checkIns) ? state.checkIns : [],
    energyLedger: Array.isArray(state.energyLedger) ? state.energyLedger : [],
    petSnapshots: Array.isArray(state.petSnapshots) ? state.petSnapshots : [],
    aiMessageLogs: Array.isArray(state.aiMessageLogs) ? state.aiMessageLogs : []
  };
  syncPetProgress(normalized);
  return normalized;
}

function isTemplateActiveOnDate(template: TaskTemplate, inputDate: Date | string | number): boolean {
  if (!template.enabled) {
    return false;
  }
  const target = toDate(inputDate);
  if (template.type === 'once') {
    return template.scheduledDate === dateKey(target);
  }
  if (!Array.isArray(template.daysOfWeek) || template.daysOfWeek.length === 0) {
    return true;
  }
  return template.daysOfWeek.includes(target.getDay());
}

function makeTaskId(template: TaskTemplate, inputDate: Date | string | number): string {
  if (template.type === 'weekly') {
    return `${weekKey(inputDate)}_${template.id}`;
  }
  return `${dateKey(inputDate)}_${template.id}`;
}

function makeDailyTask(template: TaskTemplate, inputDate: Date | string | number): DailyTask {
  return {
    id: makeTaskId(template, inputDate),
    templateId: template.id,
    title: template.title,
    type: template.type,
    category: template.category,
    categoryLabel: CATEGORY_LABELS[template.category] || '成长',
    difficulty: template.difficulty,
    difficultyLabel: DIFFICULTY_LABELS[template.difficulty] || '标准',
    estimatedMinutes: Number(template.estimatedMinutes) || 0,
    energyValue: Number(template.energyValue) || 0,
    requiresParentApproval: Boolean(template.requiresParentApproval),
    countsTowardStreak: template.countsTowardStreak !== false,
    dateKey: dateKey(inputDate),
    weekKey: template.type === 'weekly' ? weekKey(inputDate) : null,
    dueLabel: template.type === 'weekly' ? '本周完成一次' : '今天',
    status: 'open',
    completedAt: null,
    approvedAt: null,
    note: ''
  };
}

export function buildDailyTasks(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number): FamilyState {
  const state = normalizeState(stateInput, inputDate);
  state.taskTemplates.forEach((template) => {
    if (!isTemplateActiveOnDate(template, inputDate)) {
      return;
    }
    const id = makeTaskId(template, inputDate);
    if (!state.dailyTasks[id]) {
      state.dailyTasks[id] = makeDailyTask(template, inputDate);
    }
  });
  return state;
}

export function getTasksForDate(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number): DailyTask[] {
  const state = buildDailyTasks(stateInput, inputDate);
  const today = dateKey(inputDate);
  const currentWeek = weekKey(inputDate);
  return Object.values(state.dailyTasks)
    .filter((task) => task.dateKey === today || task.weekKey === currentWeek)
    .sort((a, b) => {
      const statusWeight: Record<TaskStatus, number> = { open: 0, pending_parent: 1, completed: 2, approved: 2 };
      return statusWeight[a.status] - statusWeight[b.status];
    });
}

function hasEarnedEnergyForTask(state: FamilyState, taskId: string): boolean {
  return state.energyLedger.some((entry) => entry.taskId === taskId && entry.amount > 0);
}

export function energyEarnedOnDate(state: FamilyState, targetDateKey: string): number {
  return state.energyLedger
    .filter((entry) => entry.dateKey === targetDateKey)
    .reduce((sum, entry) => sum + entry.amount, 0);
}

function applyEnergyForTask(state: FamilyState, task: DailyTask, approvedAt: Date | string | number): FamilyState {
  if (hasEarnedEnergyForTask(state, task.id)) {
    return state;
  }
  const earnedToday = energyEarnedOnDate(state, dateKey(approvedAt));
  const remaining = Math.max(0, DAILY_ENERGY_CAP - earnedToday);
  const amount = Math.min(Number(task.energyValue) || 0, remaining);
  if (amount <= 0) {
    return state;
  }
  state.energyLedger.push({
    id: `energy_${task.id}_${toDate(approvedAt).getTime()}`,
    taskId: task.id,
    templateId: task.templateId,
    amount,
    dateKey: dateKey(approvedAt),
    reason: task.title,
    createdAt: isoNow(approvedAt)
  });
  state.petProfile.totalEnergy += amount;
  syncPetProgress(state);
  return state;
}

export function completeTask(
  stateInput: FamilyState | Partial<FamilyState>,
  taskId: string,
  options: { completedAt?: Date | string | number; note?: string } = {}
): FamilyState {
  const completedAt = options.completedAt || new Date();
  const state = buildDailyTasks(stateInput, completedAt);
  const task = state.dailyTasks[taskId];
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  if (task.status === 'completed' || task.status === 'approved' || task.status === 'pending_parent') {
    return state;
  }
  task.completedAt = isoNow(completedAt);
  task.note = options.note || '';
  if (task.requiresParentApproval) {
    task.status = 'pending_parent';
  } else {
    task.status = 'completed';
    applyEnergyForTask(state, task, completedAt);
  }
  state.checkIns.push({
    id: `check_${task.id}_${toDate(completedAt).getTime()}`,
    taskId: task.id,
    dateKey: task.dateKey,
    note: task.note,
    status: task.status,
    createdAt: isoNow(completedAt)
  });
  return state;
}

export function approveTask(
  stateInput: FamilyState | Partial<FamilyState>,
  taskId: string,
  options: { approvedAt?: Date | string | number } = {}
): FamilyState {
  const approvedAt = options.approvedAt || new Date();
  const state = normalizeState(stateInput, approvedAt);
  const task = state.dailyTasks[taskId];
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  if (task.status === 'pending_parent') {
    task.status = 'approved';
    task.approvedAt = isoNow(approvedAt);
    applyEnergyForTask(state, task, approvedAt);
  }
  return state;
}

export function undoTask(stateInput: FamilyState | Partial<FamilyState>, taskId: string): FamilyState {
  const state = normalizeState(stateInput);
  const task = state.dailyTasks[taskId];
  if (!task) {
    return state;
  }
  task.status = 'open';
  task.completedAt = null;
  task.approvedAt = null;
  task.note = '';
  const removed = state.energyLedger.filter((entry) => entry.taskId === taskId);
  state.energyLedger = state.energyLedger.filter((entry) => entry.taskId !== taskId);
  const removedAmount = removed.reduce((sum, entry) => sum + entry.amount, 0);
  state.petProfile.totalEnergy = Math.max(0, state.petProfile.totalEnergy - removedAmount);
  syncPetProgress(state);
  return state;
}

export function getPendingApprovals(stateInput: FamilyState | Partial<FamilyState>): DailyTask[] {
  const state = normalizeState(stateInput);
  return Object.values(state.dailyTasks)
    .filter((task) => task.status === 'pending_parent')
    .sort((a, b) => String(a.completedAt).localeCompare(String(b.completedAt)));
}

export function getStageForEnergy(totalEnergy: number): Stage {
  return STAGES.reduce((current, stage) => (totalEnergy >= stage.minEnergy ? stage : current), STAGES[0]);
}

export function getNextStage(totalEnergy: number): Stage | null {
  return STAGES.find((stage) => stage.minEnergy > totalEnergy) || null;
}

function collectUnlockedItems(totalEnergy: number): string[] {
  return STAGES.filter((stage) => totalEnergy >= stage.minEnergy).flatMap((stage) => stage.unlocks);
}

function syncPetProgress(state: FamilyState): FamilyState {
  const stage = getStageForEnergy(state.petProfile.totalEnergy || 0);
  state.petProfile.stageId = stage.id;
  state.petProfile.unlockedItems = Array.from(new Set(collectUnlockedItems(state.petProfile.totalEnergy || 0)));
  return state;
}

function isTaskEarned(task: DailyTask): boolean {
  return task.status === 'completed' || task.status === 'approved';
}

export function calculateStreak(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number): number {
  const state = normalizeState(stateInput, inputDate);
  let streak = 0;
  for (let offset = 0; offset < 60; offset += 1) {
    const key = dateKey(addDays(inputDate, -offset));
    const hasCompleted = Object.values(state.dailyTasks).some((task) => {
      return task.dateKey === key && task.countsTowardStreak && isTaskEarned(task);
    });
    if (!hasCompleted) {
      break;
    }
    streak += 1;
  }
  return streak;
}

export function getTaskStats(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number) {
  const state = buildDailyTasks(stateInput, inputDate);
  const tasks = getTasksForDate(state, inputDate);
  const completed = tasks.filter(isTaskEarned).length;
  const pending = tasks.filter((task) => task.status === 'pending_parent').length;
  const open = tasks.filter((task) => task.status === 'open').length;
  return {
    total: tasks.length,
    completed,
    pending,
    open,
    todayEnergy: energyEarnedOnDate(state, dateKey(inputDate)),
    streak: calculateStreak(state, inputDate)
  };
}

export function getPetMood(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number) {
  const state = buildDailyTasks(stateInput, inputDate);
  const stats = getTaskStats(state, inputDate);
  if (stats.pending > 0) {
    return {
      id: 'waiting',
      label: '等家长确认',
      tone: 'warm',
      message: '我已经看到你的努力啦，等爸爸妈妈点一下确认，我们就一起收下能量。'
    };
  }
  if (stats.todayEnergy >= 24) {
    return {
      id: 'glowing',
      label: '闪闪发光',
      tone: 'celebrate',
      message: '今天的节奏很棒，我的小云朵都亮起来了。'
    };
  }
  if (stats.completed > 0) {
    return {
      id: 'steady',
      label: '稳稳前进',
      tone: 'encourage',
      message: '一点点完成也很珍贵，我们正在把好习惯攒起来。'
    };
  }
  return {
    id: 'resting',
    label: '安静陪伴',
    tone: 'gentle',
    message: '我在这里陪你，先选一件最容易开始的小事吧。'
  };
}

export function generatePetSnapshot(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number) {
  const state = buildDailyTasks(stateInput, inputDate);
  syncPetProgress(state);
  const stage = getStageForEnergy(state.petProfile.totalEnergy);
  const nextStage = getNextStage(state.petProfile.totalEnergy);
  const mood = getPetMood(state, inputDate);
  const stats = getTaskStats(state, inputDate);
  const progressToNext = nextStage
    ? Math.min(100, Math.round((state.petProfile.totalEnergy / nextStage.minEnergy) * 100))
    : 100;
  const snapshot: PetSnapshot = {
    id: `snapshot_${dateKey(inputDate)}`,
    dateKey: dateKey(inputDate),
    petName: state.petProfile.name,
    stageId: stage.id,
    stageName: stage.name,
    stageTitle: stage.title,
    moodId: mood.id,
    moodLabel: mood.label,
    message: mood.message,
    totalEnergy: state.petProfile.totalEnergy,
    todayEnergy: stats.todayEnergy,
    streak: stats.streak,
    nextStageName: nextStage ? nextStage.name : '已满级',
    progressToNext,
    unlockedItems: state.petProfile.unlockedItems
  };
  state.petSnapshots = state.petSnapshots.filter((item) => item.id !== snapshot.id);
  state.petSnapshots.push(snapshot);
  return { state, snapshot };
}

export function sanitizeSafetyText(text: string): string {
  return SAFE_MESSAGE_REPLACEMENTS.reduce((safeText, pair) => {
    return safeText.split(pair[0]).join(pair[1]);
  }, String(text || ''));
}

export function summarizeToday(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number): string {
  const state = buildDailyTasks(stateInput, inputDate);
  const tasks = getTasksForDate(state, inputDate);
  const done = tasks.filter(isTaskEarned);
  if (done.length === 0) {
    return '今天还可以从一件小事开始，比如阅读几页或整理书包。';
  }
  const names = done.slice(0, 3).map((task) => task.title).join('、');
  return `今天完成了 ${names}${done.length > 3 ? ' 等任务' : ''}，这是很扎实的进步。`;
}

export function generateAiMessage(
  stateInput: FamilyState | Partial<FamilyState>,
  type: MessageType,
  inputDate: Date | string | number
): { state: FamilyState; message: DiaryEntry } {
  const state = buildDailyTasks(stateInput, inputDate);
  const snapshot = generatePetSnapshot(state, inputDate).snapshot;
  const childName = state.childProfile.nickname || '小小探险家';
  const petName = state.petProfile.name || '星星';
  const summary = summarizeToday(state, inputDate);
  const templates: Record<MessageType, string> = {
    encouragement: `${childName}，我是${petName}。${summary} 我喜欢你慢慢变厉害的样子，明天也按自己的节奏来。`,
    story: `今晚的小故事：${petName}在云朵房间点亮了一盏阅读灯，灯光不催人，只陪着${childName}把一个小目标完成。`,
    summary: `${snapshot.stageName}日报：今日能量 ${snapshot.todayEnergy}/${DAILY_ENERGY_CAP}，连续成长 ${snapshot.streak} 天。${summary}`,
    reminder: `${petName}轻轻提醒：先挑最容易开始的一项，完成后给自己一个大大的点头。`
  };
  const mode = templates[type] ? type : 'encouragement';
  const message: DiaryEntry = {
    id: `diary_${mode}_${toDate(inputDate).getTime()}_${state.aiMessageLogs.length}`,
    type: mode,
    content: sanitizeSafetyText(templates[mode]),
    source: 'rule_based_safe_template',
    createdAt: isoNow(inputDate)
  };
  state.aiMessageLogs = [message, ...state.aiMessageLogs].slice(0, 80);
  return { state, message };
}

export function interactWithPet(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number): FamilyState {
  const state = normalizeState(stateInput, inputDate);
  state.petProfile.companion += 1;
  state.petProfile.lastInteractionAt = isoNow(inputDate);
  return generateAiMessage(state, 'encouragement', inputDate).state;
}

export function addTaskTemplate(stateInput: FamilyState | Partial<FamilyState>, input: Partial<TaskTemplate>): FamilyState {
  const state = normalizeState(stateInput);
  const title = String(input.title || '').trim();
  if (!title) {
    throw new Error('Task title is required');
  }
  const energyValue = Math.max(1, Math.min(20, Number(input.energyValue) || 8));
  const template: TaskTemplate = {
    id: input.id || `task_${Date.now()}`,
    title,
    type: input.type || 'daily',
    category: input.category || 'homework',
    difficulty: input.difficulty || 'normal',
    estimatedMinutes: Math.max(1, Number(input.estimatedMinutes) || 10),
    energyValue,
    requiresParentApproval: Boolean(input.requiresParentApproval),
    countsTowardStreak: input.countsTowardStreak !== false,
    enabled: input.enabled !== false,
    daysOfWeek: Array.isArray(input.daysOfWeek) ? input.daysOfWeek : [0, 1, 2, 3, 4, 5, 6],
    scheduledDate: input.scheduledDate || null
  };
  state.taskTemplates.push(template);
  return state;
}

export function updateTaskTemplate(
  stateInput: FamilyState | Partial<FamilyState>,
  templateId: string,
  patch: Partial<TaskTemplate>
): FamilyState {
  const state = normalizeState(stateInput);
  state.taskTemplates = state.taskTemplates.map((template) => {
    if (template.id !== templateId) {
      return template;
    }
    return {
      ...template,
      ...patch,
      title: typeof patch.title === 'string' && patch.title.trim() ? patch.title.trim() : template.title,
      energyValue: patch.energyValue ? Math.max(1, Math.min(20, Number(patch.energyValue))) : template.energyValue,
      estimatedMinutes: patch.estimatedMinutes
        ? Math.max(1, Number(patch.estimatedMinutes))
        : template.estimatedMinutes
    };
  });
  return state;
}

export function moveTaskTemplate(
  stateInput: FamilyState | Partial<FamilyState>,
  templateId: string,
  direction: -1 | 1
): FamilyState {
  const state = normalizeState(stateInput);
  const index = state.taskTemplates.findIndex((template) => template.id === templateId);
  const next = index + direction;
  if (index < 0 || next < 0 || next >= state.taskTemplates.length) {
    return state;
  }
  const copy = [...state.taskTemplates];
  const [item] = copy.splice(index, 1);
  copy.splice(next, 0, item);
  state.taskTemplates = copy;
  return state;
}

export function archiveTaskTemplate(stateInput: FamilyState | Partial<FamilyState>, templateId: string): FamilyState {
  return updateTaskTemplate(stateInput, templateId, { enabled: false });
}

export function getTrend(stateInput: FamilyState | Partial<FamilyState>, days = 7, inputDate: Date | string | number) {
  const state = normalizeState(stateInput, inputDate);
  const rows = [];
  for (let offset = days - 1; offset >= 0; offset -= 1) {
    const day = addDays(inputDate, -offset);
    const key = dateKey(day);
    const tasks = Object.values(state.dailyTasks).filter((task) => task.dateKey === key);
    rows.push({
      dateKey: key,
      energy: energyEarnedOnDate(state, key),
      completed: tasks.filter(isTaskEarned).length,
      total: tasks.length
    });
  }
  return rows;
}

export function updateProfiles(
  stateInput: FamilyState | Partial<FamilyState>,
  childNickname: string,
  petName: string
): FamilyState {
  const state = normalizeState(stateInput);
  state.childProfile.nickname = childNickname.trim() || '小小探险家';
  state.petProfile.name = petName.trim() || '星星';
  return state;
}

export function exportFamilyData(stateInput: FamilyState | Partial<FamilyState>): string {
  const state = normalizeState(stateInput);
  return JSON.stringify(
    {
      exportedAt: isoNow(),
      version: state.version,
      childProfile: state.childProfile,
      petProfile: state.petProfile,
      parentSettings: state.parentSettings,
      taskTemplates: state.taskTemplates,
      dailyTasks: state.dailyTasks,
      checkIns: state.checkIns,
      energyLedger: state.energyLedger,
      aiMessageLogs: state.aiMessageLogs
    },
    null,
    2
  );
}

export function deleteFamilyData(now?: Date | string | number): FamilyState {
  return createInitialState(now);
}
