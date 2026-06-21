export const APP_VERSION = '0.3.0';
export const DAILY_ENERGY_CAP = 60;

export type PetSpecies = 'cloud' | 'fox' | 'bunny';
export type TaskType = 'daily' | 'once' | 'weekly';
export type TaskCategory = 'homework' | 'reading' | 'recite' | 'tidy' | 'review' | 'wellbeing';
export type Difficulty = 'easy' | 'normal' | 'brave';
export type TaskStatus = 'open' | 'in_progress' | 'completed' | 'approved';
export type MessageType = 'encouragement' | 'story' | 'summary' | 'reminder';
export type ShopItemType = 'food' | 'care' | 'outfit';

export interface Stage {
  id: string;
  name: string;
  minEnergy: number;
  minActiveDays: number;
  title: string;
  diary: string;
  unlocks: string[];
}

export interface ChildProfile {
  nickname: string;
  gradeBand: string;
  createdAt: string;
  onboarded: boolean;
}

export interface PetProfile {
  name: string;
  species: PetSpecies;
  totalEnergy: number;
  energyBalance: number;
  companion: number;
  stageId: string;
  unlockedItems: string[];
  purchasedItems: string[];
  equippedOutfit: string[];
  fullness: number;
  cleanliness: number;
  joy: number;
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
  targetMinutes: number;
  energyValue: number;
  earnedEnergy: number;
  requiresParentApproval: boolean;
  countsTowardStreak: boolean;
  dateKey: string;
  weekKey: string | null;
  dueLabel: string;
  status: TaskStatus;
  startedAt: string | null;
  completedAt: string | null;
  approvedAt: string | null;
  elapsedMinutes: number | null;
  bonusReason: string;
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

export interface ShopItem {
  id: string;
  type: ShopItemType;
  name: string;
  cost: number;
  effect: number;
  description: string;
  icon: string;
  stageRequired?: string;
}

export interface ActivityEntry {
  id: string;
  type: 'task' | 'feed' | 'clean' | 'dress' | 'upgrade' | 'onboarding';
  text: string;
  createdAt: string;
}

export interface PetSnapshot {
  id: string;
  dateKey: string;
  petName: string;
  species: PetSpecies;
  stageId: string;
  stageName: string;
  stageTitle: string;
  moodId: string;
  moodLabel: string;
  message: string;
  totalEnergy: number;
  energyBalance: number;
  todayEnergy: number;
  activeDays: number;
  streak: number;
  nextStageName: string;
  nextStageEnergyRemaining: number;
  nextStageDaysRemaining: number;
  progressToNext: number;
  unlockedItems: string[];
  equippedOutfit: string[];
  fullness: number;
  cleanliness: number;
  joy: number;
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
  activityLog: ActivityEntry[];
}

export const PET_CHOICES: Array<{
  id: PetSpecies;
  name: string;
  tagline: string;
  palette: string;
}> = [
  { id: 'cloud', name: '星云团', tagline: '爱发光，喜欢被轻轻照顾。', palette: '蓝绿' },
  { id: 'fox', name: '星尾狐', tagline: '跑得快，最爱陪你挑战计时任务。', palette: '珊瑚' },
  { id: 'bunny', name: '月光兔', tagline: '很温柔，喜欢阅读和睡前故事。', palette: '紫金' }
];

export const STAGES: Stage[] = [
  {
    id: 'baby',
    name: '幼幼形态',
    minEnergy: 0,
    minActiveDays: 0,
    title: '刚搬进来的小伙伴',
    diary: '我刚来到这个房间，想先认识你，也想看看你会给我起什么名字。',
    unlocks: ['starter-bed']
  },
  {
    id: 'kid',
    name: '闪光形态',
    minEnergy: 40,
    minActiveDays: 2,
    title: '开始会发光了',
    diary: '你连续照顾我，我也学会了把房间点亮一点点。',
    unlocks: ['star-hat', 'bubble-brush']
  },
  {
    id: 'buddy',
    name: '伙伴形态',
    minEnergy: 120,
    minActiveDays: 5,
    title: '可以一起冒险了',
    diary: '我长出新的样子，也记住了你的学习节奏。',
    unlocks: ['cloud-scarf', 'story-corner']
  },
  {
    id: 'guardian',
    name: '守护形态',
    minEnergy: 260,
    minActiveDays: 10,
    title: '自己的节奏守护者',
    diary: '你已经很会照顾自己和我了，我们可以去更远的星光房间。',
    unlocks: ['hero-cape', 'memory-album']
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'star-cookie',
    type: 'food',
    name: '星星饼干',
    cost: 6,
    effect: 16,
    description: '让宠物饱饱值上升。',
    icon: 'cookie'
  },
  {
    id: 'moon-milk',
    type: 'food',
    name: '月光奶',
    cost: 9,
    effect: 24,
    description: '饱饱值和开心值都会上升。',
    icon: 'milk'
  },
  {
    id: 'bubble-brush',
    type: 'care',
    name: '泡泡刷',
    cost: 8,
    effect: 26,
    description: '帮宠物洗得亮亮的。',
    icon: 'brush'
  },
  {
    id: 'star-hat',
    type: 'outfit',
    name: '星星帽',
    cost: 24,
    effect: 0,
    description: '戴上之后宠物更像小冒险家。',
    icon: 'hat',
    stageRequired: 'kid'
  },
  {
    id: 'cloud-scarf',
    type: 'outfit',
    name: '云朵围巾',
    cost: 36,
    effect: 0,
    description: '软软的围巾，适合认真完成任务后换上。',
    icon: 'scarf',
    stageRequired: 'buddy'
  },
  {
    id: 'hero-cape',
    type: 'outfit',
    name: '小守护披风',
    cost: 54,
    effect: 0,
    description: '守护形态解锁的特别装扮。',
    icon: 'cape',
    stageRequired: 'guardian'
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
    requiresParentApproval: false,
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

function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

function logActivity(state: FamilyState, type: ActivityEntry['type'], text: string, now?: Date | string | number) {
  state.activityLog = [
    {
      id: `activity_${type}_${toDate(now).getTime()}_${state.activityLog.length}`,
      type,
      text,
      createdAt: isoNow(now)
    },
    ...state.activityLog
  ].slice(0, 20);
}

export function createInitialState(now?: Date | string | number): FamilyState {
  const createdAt = isoNow(now);
  return {
    version: APP_VERSION,
    childProfile: {
      nickname: '小小探险家',
      gradeBand: 'primary',
      createdAt,
      onboarded: false
    },
    petProfile: {
      name: '星星',
      species: 'cloud',
      totalEnergy: 0,
      energyBalance: 18,
      companion: 0,
      stageId: 'baby',
      unlockedItems: ['starter-bed'],
      purchasedItems: [],
      equippedOutfit: [],
      fullness: 64,
      cleanliness: 70,
      joy: 68,
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
    aiMessageLogs: [],
    activityLog: []
  };
}

export function normalizeState(input?: Partial<FamilyState> | null, now?: Date | string | number): FamilyState {
  const incoming = input ? clone(input) : createInitialState(now);
  const fresh = createInitialState(now);
  const normalized: FamilyState = {
    ...fresh,
    ...incoming,
    version: APP_VERSION,
    childProfile: { ...fresh.childProfile, ...(incoming.childProfile ?? {}) },
    petProfile: {
      ...fresh.petProfile,
      ...(incoming.petProfile ?? {}),
      species: (incoming.petProfile?.species as PetSpecies) || fresh.petProfile.species,
      energyBalance:
        typeof incoming.petProfile?.energyBalance === 'number'
          ? incoming.petProfile.energyBalance
          : incoming.petProfile?.totalEnergy || fresh.petProfile.energyBalance,
      purchasedItems: Array.isArray(incoming.petProfile?.purchasedItems) ? incoming.petProfile.purchasedItems : [],
      equippedOutfit: Array.isArray(incoming.petProfile?.equippedOutfit) ? incoming.petProfile.equippedOutfit : [],
      fullness: typeof incoming.petProfile?.fullness === 'number' ? incoming.petProfile.fullness : fresh.petProfile.fullness,
      cleanliness:
        typeof incoming.petProfile?.cleanliness === 'number' ? incoming.petProfile.cleanliness : fresh.petProfile.cleanliness,
      joy: typeof incoming.petProfile?.joy === 'number' ? incoming.petProfile.joy : fresh.petProfile.joy
    },
    parentSettings: {
      ...fresh.parentSettings,
      ...(incoming.parentSettings ?? {}),
      quietHours: {
        ...fresh.parentSettings.quietHours,
        ...(incoming.parentSettings?.quietHours ?? {})
      }
    },
    taskTemplates: Array.isArray(incoming.taskTemplates) ? incoming.taskTemplates : clone(DEFAULT_TASK_TEMPLATES),
    dailyTasks: incoming.dailyTasks ?? {},
    checkIns: Array.isArray(incoming.checkIns) ? incoming.checkIns : [],
    energyLedger: Array.isArray(incoming.energyLedger) ? incoming.energyLedger : [],
    petSnapshots: Array.isArray(incoming.petSnapshots) ? incoming.petSnapshots : [],
    aiMessageLogs: Array.isArray(incoming.aiMessageLogs) ? incoming.aiMessageLogs : [],
    activityLog: Array.isArray(incoming.activityLog) ? incoming.activityLog : []
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
    targetMinutes: Number(template.estimatedMinutes) || 10,
    energyValue: Number(template.energyValue) || 0,
    earnedEnergy: 0,
    requiresParentApproval: Boolean(template.requiresParentApproval),
    countsTowardStreak: template.countsTowardStreak !== false,
    dateKey: dateKey(inputDate),
    weekKey: template.type === 'weekly' ? weekKey(inputDate) : null,
    dueLabel: template.type === 'weekly' ? '本周完成一次' : '今天',
    status: 'open',
    startedAt: null,
    completedAt: null,
    approvedAt: null,
    elapsedMinutes: null,
    bonusReason: '',
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
      const statusWeight: Record<TaskStatus, number> = { in_progress: 0, open: 1, completed: 2, approved: 2 };
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

export function calculateTimedEnergy(baseEnergy: number, targetMinutes: number, elapsedMinutes: number) {
  const target = Math.max(1, targetMinutes);
  const elapsed = Math.max(1, elapsedMinutes);
  if (elapsed <= target * 0.7) {
    return { amount: Math.ceil(baseEnergy * 1.4), reason: '提前完成，获得速度奖励' };
  }
  if (elapsed <= target) {
    return { amount: Math.ceil(baseEnergy * 1.15), reason: '按时完成，获得准时奖励' };
  }
  return { amount: Math.max(1, Math.ceil(baseEnergy * 0.75)), reason: '已经完成，收下基础能量' };
}

function applyEnergyForTask(state: FamilyState, task: DailyTask, approvedAt: Date | string | number): FamilyState {
  if (hasEarnedEnergyForTask(state, task.id)) {
    return state;
  }
  const previousStage = state.petProfile.stageId;
  const earnedToday = energyEarnedOnDate(state, dateKey(approvedAt));
  const remaining = Math.max(0, DAILY_ENERGY_CAP - earnedToday);
  const amount = Math.min(Number(task.earnedEnergy || task.energyValue) || 0, remaining);
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
  state.petProfile.energyBalance += amount;
  state.petProfile.joy = clamp(state.petProfile.joy + 8, 0, 100);
  logActivity(state, 'task', `${task.title} 完成，获得 ${amount} 能量。${task.bonusReason}`, approvedAt);
  syncPetProgress(state);
  if (previousStage !== state.petProfile.stageId) {
    const stage = STAGES.find((item) => item.id === state.petProfile.stageId);
    logActivity(state, 'upgrade', `${state.petProfile.name}升级成 ${stage?.name || '新形态'}。`, approvedAt);
  }
  return state;
}

export function setupPet(
  stateInput: FamilyState | Partial<FamilyState>,
  options: { childNickname: string; petName: string; species: PetSpecies; now?: Date | string | number }
): FamilyState {
  const state = normalizeState(stateInput, options.now);
  state.childProfile.nickname = options.childNickname.trim() || '小小探险家';
  state.childProfile.onboarded = true;
  state.petProfile.name = options.petName.trim() || PET_CHOICES.find((choice) => choice.id === options.species)?.name || '星星';
  state.petProfile.species = options.species;
  state.petProfile.lastInteractionAt = isoNow(options.now);
  logActivity(state, 'onboarding', `${state.petProfile.name}搬进了你的宠物房间。`, options.now);
  return state;
}

export function startTask(
  stateInput: FamilyState | Partial<FamilyState>,
  taskId: string,
  options: { targetMinutes: number; startedAt?: Date | string | number }
): FamilyState {
  const startedAt = options.startedAt || new Date();
  const state = buildDailyTasks(stateInput, startedAt);
  const task = state.dailyTasks[taskId];
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  if (task.status !== 'open') {
    return state;
  }
  task.status = 'in_progress';
  task.startedAt = isoNow(startedAt);
  task.targetMinutes = clamp(Math.round(options.targetMinutes || task.estimatedMinutes), 1, 180);
  logActivity(state, 'task', `${task.title} 开始啦，目标 ${task.targetMinutes} 分钟。`, startedAt);
  return state;
}

export function completeTask(
  stateInput: FamilyState | Partial<FamilyState>,
  taskId: string,
  options: { completedAt?: Date | string | number; note?: string; elapsedMinutes?: number } = {}
): FamilyState {
  const completedAt = options.completedAt || new Date();
  const state = buildDailyTasks(stateInput, completedAt);
  const task = state.dailyTasks[taskId];
  if (!task) {
    throw new Error(`Task not found: ${taskId}`);
  }
  if (task.status === 'completed' || task.status === 'approved') {
    return state;
  }
  if (task.status === 'open') {
    task.startedAt = task.startedAt || isoNow(completedAt);
    task.status = 'in_progress';
  }
  const startedAt = task.startedAt ? toDate(task.startedAt) : toDate(completedAt);
  const computedElapsed = Math.max(1, Math.ceil((toDate(completedAt).getTime() - startedAt.getTime()) / 60000));
  const elapsedMinutes = Math.max(1, Math.round(options.elapsedMinutes || computedElapsed));
  const energy = calculateTimedEnergy(task.energyValue, task.targetMinutes || task.estimatedMinutes, elapsedMinutes);
  task.completedAt = isoNow(completedAt);
  task.elapsedMinutes = elapsedMinutes;
  task.earnedEnergy = energy.amount;
  task.bonusReason = energy.reason;
  task.note = options.note || '';
  task.status = task.requiresParentApproval ? 'completed' : 'approved';
  state.checkIns.push({
    id: `check_${task.id}_${toDate(completedAt).getTime()}`,
    taskId: task.id,
    dateKey: task.dateKey,
    note: task.note,
    status: task.status,
    createdAt: isoNow(completedAt)
  });
  if (!task.requiresParentApproval) {
    applyEnergyForTask(state, task, completedAt);
  }
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
  if (task.status === 'completed') {
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
  task.startedAt = null;
  task.completedAt = null;
  task.approvedAt = null;
  task.elapsedMinutes = null;
  task.earnedEnergy = 0;
  task.bonusReason = '';
  task.note = '';
  const removed = state.energyLedger.filter((entry) => entry.taskId === taskId);
  state.energyLedger = state.energyLedger.filter((entry) => entry.taskId !== taskId);
  const removedAmount = removed.reduce((sum, entry) => sum + entry.amount, 0);
  state.petProfile.totalEnergy = Math.max(0, state.petProfile.totalEnergy - removedAmount);
  state.petProfile.energyBalance = Math.max(0, state.petProfile.energyBalance - removedAmount);
  syncPetProgress(state);
  return state;
}

export function getPendingApprovals(stateInput: FamilyState | Partial<FamilyState>): DailyTask[] {
  const state = normalizeState(stateInput);
  return Object.values(state.dailyTasks)
    .filter((task) => task.requiresParentApproval && task.status === 'completed' && !hasEarnedEnergyForTask(state, task.id))
    .sort((a, b) => String(a.completedAt).localeCompare(String(b.completedAt)));
}

export function getActiveDays(stateInput: FamilyState | Partial<FamilyState>): number {
  const ledger = Array.isArray(stateInput.energyLedger) ? stateInput.energyLedger : [];
  return new Set(ledger.map((entry) => entry.dateKey)).size;
}

export function getStageForProgress(totalEnergy: number, activeDays: number): Stage {
  return STAGES.reduce((current, stage) => {
    return totalEnergy >= stage.minEnergy && activeDays >= stage.minActiveDays ? stage : current;
  }, STAGES[0]);
}

export function getStageForEnergy(totalEnergy: number): Stage {
  return getStageForProgress(totalEnergy, Number.MAX_SAFE_INTEGER);
}

export function getNextStage(totalEnergy: number, activeDays = 0): Stage | null {
  return STAGES.find((stage) => totalEnergy < stage.minEnergy || activeDays < stage.minActiveDays) || null;
}

function collectUnlockedItems(totalEnergy: number, activeDays: number): string[] {
  return STAGES.filter((stage) => totalEnergy >= stage.minEnergy && activeDays >= stage.minActiveDays).flatMap(
    (stage) => stage.unlocks
  );
}

function syncPetProgress(state: FamilyState): FamilyState {
  const activeDays = getActiveDays(state);
  const stage = getStageForProgress(state.petProfile.totalEnergy || 0, activeDays);
  state.petProfile.stageId = stage.id;
  state.petProfile.unlockedItems = Array.from(new Set(collectUnlockedItems(state.petProfile.totalEnergy || 0, activeDays)));
  return state;
}

function isTaskEarned(task: DailyTask): boolean {
  return task.status === 'approved';
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
  const inProgress = tasks.filter((task) => task.status === 'in_progress').length;
  const open = tasks.filter((task) => task.status === 'open').length;
  return {
    total: tasks.length,
    completed,
    pending: getPendingApprovals(state).length,
    inProgress,
    open,
    todayEnergy: energyEarnedOnDate(state, dateKey(inputDate)),
    streak: calculateStreak(state, inputDate)
  };
}

export function getPetMood(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number) {
  const state = buildDailyTasks(stateInput, inputDate);
  const stats = getTaskStats(state, inputDate);
  if (!state.childProfile.onboarded) {
    return {
      id: 'new',
      label: '等待见面',
      tone: 'warm',
      message: '先选一个宠物，给它起名字，它就会住进你的房间。'
    };
  }
  if (stats.inProgress > 0) {
    return {
      id: 'focus',
      label: '陪你专注',
      tone: 'focus',
      message: '我正在旁边陪你计时，完成后我们马上收能量。'
    };
  }
  if (state.petProfile.cleanliness < 35) {
    return {
      id: 'dusty',
      label: '想洗亮亮',
      tone: 'care',
      message: '我想洗个泡泡澡，洗完会更闪亮。'
    };
  }
  if (state.petProfile.fullness < 35) {
    return {
      id: 'snack',
      label: '想吃点心',
      tone: 'care',
      message: '我有点想吃星星点心，吃完会更有精神。'
    };
  }
  if (stats.todayEnergy >= 24) {
    return {
      id: 'glowing',
      label: '闪闪发光',
      tone: 'celebrate',
      message: '今天的节奏很棒，我的小房间都亮起来了。'
    };
  }
  return {
    id: 'ready',
    label: '准备好了',
    tone: 'gentle',
    message: '先挑一个小任务，点开始，我会一起陪你。'
  };
}

export function generatePetSnapshot(stateInput: FamilyState | Partial<FamilyState>, inputDate: Date | string | number) {
  const state = buildDailyTasks(stateInput, inputDate);
  syncPetProgress(state);
  const activeDays = getActiveDays(state);
  const stage = getStageForProgress(state.petProfile.totalEnergy, activeDays);
  const nextStage = getNextStage(state.petProfile.totalEnergy, activeDays);
  const mood = getPetMood(state, inputDate);
  const stats = getTaskStats(state, inputDate);
  const energyProgress = nextStage
    ? Math.min(100, Math.round((state.petProfile.totalEnergy / nextStage.minEnergy) * 100))
    : 100;
  const dayProgress = nextStage ? Math.min(100, Math.round((activeDays / nextStage.minActiveDays) * 100)) : 100;
  const snapshot: PetSnapshot = {
    id: `snapshot_${dateKey(inputDate)}`,
    dateKey: dateKey(inputDate),
    petName: state.petProfile.name,
    species: state.petProfile.species,
    stageId: stage.id,
    stageName: stage.name,
    stageTitle: stage.title,
    moodId: mood.id,
    moodLabel: mood.label,
    message: mood.message,
    totalEnergy: state.petProfile.totalEnergy,
    energyBalance: state.petProfile.energyBalance,
    todayEnergy: stats.todayEnergy,
    activeDays,
    streak: stats.streak,
    nextStageName: nextStage ? nextStage.name : '已满级',
    nextStageEnergyRemaining: nextStage ? Math.max(0, nextStage.minEnergy - state.petProfile.totalEnergy) : 0,
    nextStageDaysRemaining: nextStage ? Math.max(0, nextStage.minActiveDays - activeDays) : 0,
    progressToNext: Math.min(100, Math.round((energyProgress + dayProgress) / 2)),
    unlockedItems: state.petProfile.unlockedItems,
    equippedOutfit: state.petProfile.equippedOutfit,
    fullness: state.petProfile.fullness,
    cleanliness: state.petProfile.cleanliness,
    joy: state.petProfile.joy
  };
  state.petSnapshots = state.petSnapshots.filter((item) => item.id !== snapshot.id);
  state.petSnapshots.push(snapshot);
  return { state, snapshot };
}

export function spendEnergy(stateInput: FamilyState | Partial<FamilyState>, cost: number): FamilyState {
  const state = normalizeState(stateInput);
  if (state.petProfile.energyBalance < cost) {
    throw new Error('能量不够，先完成一个小任务吧。');
  }
  state.petProfile.energyBalance -= cost;
  return state;
}

export function useShopItem(
  stateInput: FamilyState | Partial<FamilyState>,
  itemId: string,
  now?: Date | string | number
): FamilyState {
  let state = normalizeState(stateInput, now);
  const item = SHOP_ITEMS.find((candidate) => candidate.id === itemId);
  if (!item) {
    throw new Error('没有找到这个道具。');
  }
  const stageIndex = STAGES.findIndex((stage) => stage.id === state.petProfile.stageId);
  const requiredIndex = item.stageRequired ? STAGES.findIndex((stage) => stage.id === item.stageRequired) : 0;
  if (item.stageRequired && stageIndex < requiredIndex) {
    throw new Error(`升级到${STAGES[requiredIndex].name}后才能使用。`);
  }
  const alreadyOwned = state.petProfile.purchasedItems.includes(item.id);
  if (item.type === 'outfit' && alreadyOwned) {
    state.petProfile.equippedOutfit = state.petProfile.equippedOutfit.includes(item.id)
      ? state.petProfile.equippedOutfit.filter((id) => id !== item.id)
      : [...state.petProfile.equippedOutfit, item.id];
    logActivity(state, 'dress', `${state.petProfile.name}换上了${item.name}。`, now);
    return state;
  }
  state = spendEnergy(state, item.cost);
  if (item.type === 'food') {
    state.petProfile.fullness = clamp(state.petProfile.fullness + item.effect, 0, 100);
    state.petProfile.joy = clamp(state.petProfile.joy + Math.round(item.effect / 2), 0, 100);
    logActivity(state, 'feed', `${state.petProfile.name}吃了${item.name}，饱饱值上升。`, now);
  }
  if (item.type === 'care') {
    state.petProfile.cleanliness = clamp(state.petProfile.cleanliness + item.effect, 0, 100);
    state.petProfile.joy = clamp(state.petProfile.joy + 8, 0, 100);
    logActivity(state, 'clean', `${state.petProfile.name}洗得亮亮的。`, now);
  }
  if (item.type === 'outfit') {
    state.petProfile.purchasedItems.push(item.id);
    state.petProfile.equippedOutfit.push(item.id);
    state.petProfile.joy = clamp(state.petProfile.joy + 12, 0, 100);
    logActivity(state, 'dress', `${state.petProfile.name}获得了${item.name}。`, now);
  }
  return state;
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
    return '今天可以先从一个小任务开始。';
  }
  const names = done.slice(0, 3).map((task) => task.title).join('、');
  return `今天完成了 ${names}${done.length > 3 ? ' 等任务' : ''}，获得了可以照顾宠物的能量。`;
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
    encouragement: `${childName}，我是${petName}。${summary} 我喜欢你照顾我，也喜欢你照顾自己的节奏。`,
    story: `今晚的小故事：${petName}把${childName}攒下的能量做成一盏小灯，照亮了宠物房间的新角落。`,
    summary: `${snapshot.stageName}日报：今日能量 ${snapshot.todayEnergy}/${DAILY_ENERGY_CAP}，可用能量 ${snapshot.energyBalance}，活跃 ${snapshot.activeDays} 天。${summary}`,
    reminder: `${petName}轻轻提醒：先点开始，选一个时间，我会在旁边陪你完成。`
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
  state.petProfile.joy = clamp(state.petProfile.joy + 4, 0, 100);
  state.petProfile.lastInteractionAt = isoNow(inputDate);
  logActivity(state, 'feed', `${state.petProfile.name}开心地回应了你。`, inputDate);
  return generateAiMessage(state, 'encouragement', inputDate).state;
}

export function addTaskTemplate(stateInput: FamilyState | Partial<FamilyState>, input: Partial<TaskTemplate>): FamilyState {
  const state = normalizeState(stateInput);
  const title = String(input.title || '').trim();
  if (!title) {
    throw new Error('Task title is required');
  }
  const energyValue = Math.max(1, Math.min(24, Number(input.energyValue) || 8));
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
      energyValue: patch.energyValue ? Math.max(1, Math.min(24, Number(patch.energyValue))) : template.energyValue,
      estimatedMinutes: patch.estimatedMinutes ? Math.max(1, Number(patch.estimatedMinutes)) : template.estimatedMinutes
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
      aiMessageLogs: state.aiMessageLogs,
      activityLog: state.activityLog
    },
    null,
    2
  );
}

export function deleteFamilyData(now?: Date | string | number): FamilyState {
  return createInitialState(now);
}
