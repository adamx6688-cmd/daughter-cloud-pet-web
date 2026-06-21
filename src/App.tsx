import {
  Archive,
  BarChart3,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Download,
  HeartHandshake,
  Home,
  Lock,
  MessageCircleHeart,
  MoonStar,
  Plus,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  Trash2,
  Undo2
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PetIllustration } from './components/PetIllustration';
import {
  DAILY_ENERGY_CAP,
  TASK_TYPE_LABELS,
  addTaskTemplate,
  approveTask,
  archiveTaskTemplate,
  buildDailyTasks,
  completeTask,
  createInitialState,
  deleteFamilyData,
  exportFamilyData,
  generateAiMessage,
  generatePetSnapshot,
  getPendingApprovals,
  getTaskStats,
  getTasksForDate,
  getTrend,
  interactWithPet,
  moveTaskTemplate,
  undoTask,
  updateProfiles,
  updateTaskTemplate,
  type FamilyState,
  type MessageType,
  type TaskCategory,
  type TaskTemplate,
  type TaskType
} from './lib/domain';
import { clearStoredState, loadState, saveState } from './lib/storage';
import './styles.css';

type ViewKey = 'room' | 'parent' | 'diary' | 'privacy';

const TODAY = new Date();
const MESSAGE_LABELS: Record<MessageType, string> = {
  encouragement: '鼓励',
  story: '故事',
  summary: '总结',
  reminder: '提醒'
};

const CATEGORY_OPTIONS: Array<{ value: TaskCategory; label: string }> = [
  { value: 'reading', label: '阅读' },
  { value: 'homework', label: '作业' },
  { value: 'recite', label: '背诵' },
  { value: 'tidy', label: '整理' },
  { value: 'review', label: '复盘' },
  { value: 'wellbeing', label: '身心' }
];

const TYPE_OPTIONS: Array<{ value: TaskType; label: string }> = [
  { value: 'daily', label: '每日' },
  { value: 'weekly', label: '本周' },
  { value: 'once', label: '一次' }
];

const DEFAULT_NEW_TASK = {
  title: '',
  type: 'daily' as TaskType,
  category: 'reading' as TaskCategory,
  estimatedMinutes: 10,
  energyValue: 8,
  requiresParentApproval: false
};

function initialiseState() {
  if (typeof window === 'undefined') {
    return { state: buildDailyTasks(createInitialState(TODAY), TODAY), error: null };
  }
  const result = loadState(TODAY);
  return { state: buildDailyTasks(result.state, TODAY), error: result.error };
}

export default function App() {
  const initial = useMemo(initialiseState, []);
  const [state, setState] = useState<FamilyState>(initial.state);
  const [activeView, setActiveView] = useState<ViewKey>('room');
  const [storageError, setStorageError] = useState<string | null>(initial.error);
  const [profileDraft, setProfileDraft] = useState({
    child: initial.state.childProfile.nickname,
    pet: initial.state.petProfile.name
  });
  const [taskDraft, setTaskDraft] = useState(DEFAULT_NEW_TASK);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [toast, setToast] = useState<string>('');

  const snapshot = useMemo(() => generatePetSnapshot(state, TODAY).snapshot, [state]);
  const tasks = useMemo(() => getTasksForDate(state, TODAY), [state]);
  const pending = useMemo(() => getPendingApprovals(state), [state]);
  const stats = useMemo(() => getTaskStats(state, TODAY), [state]);
  const trend = useMemo(() => getTrend(state, 7, TODAY), [state]);
  const enabledTemplates = state.taskTemplates.filter((template) => template.enabled);
  const latestDiary = state.aiMessageLogs[0]?.content || snapshot.message;

  useEffect(() => {
    const result = saveState(state);
    setStorageError(result.error);
  }, [state]);

  function commit(nextState: FamilyState, message?: string) {
    const hydrated = generatePetSnapshot(buildDailyTasks(nextState, new Date()), new Date()).state;
    setState(hydrated);
    if (message) {
      setToast(message);
      window.setTimeout(() => setToast(''), 2200);
    }
  }

  function handleComplete(taskId: string) {
    const task = state.dailyTasks[taskId];
    const message = task?.requiresParentApproval ? '已记录，等待家长确认。' : '能量收下啦。';
    commit(completeTask(state, taskId, { completedAt: new Date() }), message);
  }

  function handleApprove(taskId: string) {
    commit(approveTask(state, taskId, { approvedAt: new Date() }), '家长确认完成。');
  }

  function handleUndo(taskId: string) {
    commit(undoTask(state, taskId), '已撤回这次记录。');
  }

  function handleInteract() {
    commit(interactWithPet(state, new Date()), `${state.petProfile.name}回应了你。`);
  }

  function handleMessage(type: MessageType) {
    const result = generateAiMessage(state, type, new Date());
    commit(result.state, `已生成${MESSAGE_LABELS[type]}。`);
  }

  function handleProfileSave() {
    commit(updateProfiles(state, profileDraft.child, profileDraft.pet), '资料已保存。');
  }

  function handleAddTask() {
    try {
      commit(addTaskTemplate(state, taskDraft), '任务已添加。');
      setTaskDraft(DEFAULT_NEW_TASK);
    } catch (error) {
      setToast(error instanceof Error ? error.message : '任务没有保存成功。');
    }
  }

  function handleTemplatePatch(template: TaskTemplate, patch: Partial<TaskTemplate>) {
    commit(updateTaskTemplate(state, template.id, patch), '任务已更新。');
  }

  function handleExport() {
    const blob = new Blob([exportFamilyData(state)], { type: 'application/json;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `xingxing-cloud-pet-${new Date().toISOString().slice(0, 10)}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setToast('数据已导出。');
  }

  function handleReset() {
    const confirmed = window.confirm('确认清空本机数据并重新开始？');
    if (!confirmed) {
      return;
    }
    clearStoredState();
    const fresh = buildDailyTasks(deleteFamilyData(new Date()), new Date());
    setProfileDraft({ child: fresh.childProfile.nickname, pet: fresh.petProfile.name });
    commit(fresh, '已重新开始。');
  }

  const navItems: Array<{ id: ViewKey; label: string; icon: typeof Home }> = [
    { id: 'room', label: '宠物房间', icon: Home },
    { id: 'parent', label: '家长中心', icon: ShieldCheck },
    { id: 'diary', label: '宠物日记', icon: BookOpen },
    { id: 'privacy', label: '隐私', icon: Lock }
  ];

  return (
    <div className="app-shell">
      <a className="skip-link" href="#main">
        跳到内容
      </a>
      <header className="topbar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="eyebrow">家庭学习伙伴</p>
            <h1>星星云宠物</h1>
          </div>
        </div>
        <div className="status-strip" aria-label="今日状态">
          <span>{snapshot.moodLabel}</span>
          <strong>
            {stats.todayEnergy}/{DAILY_ENERGY_CAP}
          </strong>
        </div>
      </header>

      <nav className="tabbar" aria-label="主导航">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              className={activeView === item.id ? 'nav-button nav-button-active' : 'nav-button'}
              key={item.id}
              type="button"
              onClick={() => setActiveView(item.id)}
            >
              <Icon size={18} aria-hidden="true" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <main id="main" className="main-grid">
        {storageError && (
          <section className="alert" role="alert">
            本机保存不可用：{storageError}
          </section>
        )}

        {activeView === 'room' && (
          <section className="view-grid room-view" aria-labelledby="room-title">
            <div className="pet-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">今天</p>
                  <h2 id="room-title">{snapshot.stageTitle}</h2>
                </div>
                <button className="icon-command" type="button" onClick={handleInteract} aria-label="和宠物互动">
                  <HeartHandshake size={20} />
                </button>
              </div>
              <PetIllustration snapshot={snapshot} companion={state.petProfile.companion} />
              <div className="speech" aria-live="polite">
                {snapshot.message}
              </div>
              <div className="progress-wrap" aria-label={`成长进度 ${snapshot.progressToNext}%`}>
                <div className="progress-meta">
                  <span>成长能量 {snapshot.totalEnergy}</span>
                  <span>下一阶段：{snapshot.nextStageName}</span>
                </div>
                <div className="progress-track">
                  <span style={{ width: `${snapshot.progressToNext}%` }} />
                </div>
              </div>
            </div>

            <div className="task-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">任务</p>
                  <h2>今日小目标</h2>
                </div>
                <span className="metric-pill">{stats.completed}/{stats.total}</span>
              </div>
              <div className="task-list">
                {tasks.map((task) => (
                  <article className={`task-card task-${task.status}`} key={task.id}>
                    <div>
                      <div className="task-kicker">
                        <span>{task.categoryLabel}</span>
                        <span>{task.dueLabel}</span>
                      </div>
                      <h3>{task.title}</h3>
                      <p>
                        {task.estimatedMinutes} 分钟 · {task.energyValue} 能量 · {task.difficultyLabel}
                      </p>
                    </div>
                    <div className="task-actions">
                      {task.status === 'open' && (
                        <button className="primary-action" type="button" onClick={() => handleComplete(task.id)}>
                          <Check size={18} aria-hidden="true" />
                          完成
                        </button>
                      )}
                      {task.status === 'pending_parent' && <span className="state-chip waiting-chip">待确认</span>}
                      {(task.status === 'completed' || task.status === 'approved') && (
                        <span className="state-chip done-chip">已收下</span>
                      )}
                      {task.status !== 'open' && (
                        <button className="icon-command quiet" type="button" onClick={() => handleUndo(task.id)} aria-label={`撤回 ${task.title}`}>
                          <Undo2 size={18} />
                        </button>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'parent' && (
          <section className="view-grid parent-view" aria-labelledby="parent-title">
            <div className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">家长</p>
                  <h2 id="parent-title">家庭设置</h2>
                </div>
                <button className="primary-action compact" type="button" onClick={handleProfileSave}>
                  <Check size={17} aria-hidden="true" />
                  保存
                </button>
              </div>
              <div className="form-grid">
                <label>
                  孩子昵称
                  <input value={profileDraft.child} onChange={(event) => setProfileDraft({ ...profileDraft, child: event.target.value })} />
                </label>
                <label>
                  宠物名字
                  <input value={profileDraft.pet} onChange={(event) => setProfileDraft({ ...profileDraft, pet: event.target.value })} />
                </label>
              </div>
            </div>

            <div className="panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">确认</p>
                  <h2>待家长确认</h2>
                </div>
                <span className="metric-pill">{pending.length}</span>
              </div>
              <div className="approval-list">
                {pending.length === 0 && <p className="muted">现在没有待确认任务。</p>}
                {pending.map((task) => (
                  <article className="approval-row" key={task.id}>
                    <div>
                      <strong>{task.title}</strong>
                      <span>{task.categoryLabel} · {task.energyValue} 能量</span>
                    </div>
                    <button className="primary-action compact" type="button" onClick={() => handleApprove(task.id)}>
                      <Check size={17} aria-hidden="true" />
                      确认
                    </button>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel wide-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">趋势</p>
                  <h2>最近 7 天</h2>
                </div>
                <BarChart3 size={22} aria-hidden="true" />
              </div>
              <div className="trend-chart" aria-label="最近 7 天成长能量趋势">
                {trend.map((row) => (
                  <div className="trend-bar" key={row.dateKey}>
                    <span className="bar" style={{ height: `${Math.max(8, (row.energy / DAILY_ENERGY_CAP) * 100)}%` }} />
                    <small>{row.dateKey.slice(5)}</small>
                  </div>
                ))}
              </div>
            </div>

            <div className="panel wide-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">任务库</p>
                  <h2>学习习惯任务</h2>
                </div>
                <button className="primary-action compact" type="button" onClick={handleAddTask}>
                  <Plus size={17} aria-hidden="true" />
                  添加
                </button>
              </div>
              <div className="task-editor">
                <label className="span-2">
                  任务名称
                  <input
                    value={taskDraft.title}
                    onChange={(event) => setTaskDraft({ ...taskDraft, title: event.target.value })}
                    placeholder="例如：背诵古诗 8 分钟"
                  />
                </label>
                <label>
                  类型
                  <select value={taskDraft.type} onChange={(event) => setTaskDraft({ ...taskDraft, type: event.target.value as TaskType })}>
                    {TYPE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  分类
                  <select
                    value={taskDraft.category}
                    onChange={(event) => setTaskDraft({ ...taskDraft, category: event.target.value as TaskCategory })}
                  >
                    {CATEGORY_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </label>
                <label>
                  分钟
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={taskDraft.estimatedMinutes}
                    onChange={(event) => setTaskDraft({ ...taskDraft, estimatedMinutes: Number(event.target.value) })}
                  />
                </label>
                <label>
                  能量
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={taskDraft.energyValue}
                    onChange={(event) => setTaskDraft({ ...taskDraft, energyValue: Number(event.target.value) })}
                  />
                </label>
                <label className="toggle-row">
                  <input
                    type="checkbox"
                    checked={taskDraft.requiresParentApproval}
                    onChange={(event) => setTaskDraft({ ...taskDraft, requiresParentApproval: event.target.checked })}
                  />
                  需要家长确认
                </label>
              </div>

              <div className="template-list">
                {enabledTemplates.map((template, index) => (
                  <article className="template-row" key={template.id}>
                    <div className="template-main">
                      {editingTaskId === template.id ? (
                        <input
                          aria-label={`${template.title} 名称`}
                          value={template.title}
                          onChange={(event) => handleTemplatePatch(template, { title: event.target.value })}
                          onBlur={() => setEditingTaskId(null)}
                        />
                      ) : (
                        <button className="text-button" type="button" onClick={() => setEditingTaskId(template.id)}>
                          {template.title}
                        </button>
                      )}
                      <span>
                        {TASK_TYPE_LABELS[template.type]} · {template.estimatedMinutes} 分钟 · {template.energyValue} 能量
                      </span>
                    </div>
                    <div className="row-actions">
                      <button
                        className="icon-command quiet"
                        type="button"
                        onClick={() => commit(moveTaskTemplate(state, template.id, -1))}
                        disabled={index === 0}
                        aria-label={`上移 ${template.title}`}
                      >
                        <ChevronUp size={17} />
                      </button>
                      <button
                        className="icon-command quiet"
                        type="button"
                        onClick={() => commit(moveTaskTemplate(state, template.id, 1))}
                        disabled={index === enabledTemplates.length - 1}
                        aria-label={`下移 ${template.title}`}
                      >
                        <ChevronDown size={17} />
                      </button>
                      <button
                        className="icon-command danger"
                        type="button"
                        onClick={() => commit(archiveTaskTemplate(state, template.id), '任务已停用。')}
                        aria-label={`停用 ${template.title}`}
                      >
                        <Archive size={17} />
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div className="panel wide-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">数据</p>
                  <h2>导出与重置</h2>
                </div>
              </div>
              <div className="data-actions">
                <button className="secondary-action" type="button" onClick={handleExport}>
                  <Download size={18} aria-hidden="true" />
                  导出 JSON
                </button>
                <button className="danger-action" type="button" onClick={handleReset}>
                  <Trash2 size={18} aria-hidden="true" />
                  清空本机数据
                </button>
              </div>
            </div>
          </section>
        )}

        {activeView === 'diary' && (
          <section className="view-grid diary-view" aria-labelledby="diary-title">
            <div className="panel diary-hero">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">日记</p>
                  <h2 id="diary-title">今天的小记录</h2>
                </div>
                <MoonStar size={22} aria-hidden="true" />
              </div>
              <p className="diary-current">{latestDiary}</p>
              <div className="message-actions">
                {(Object.keys(MESSAGE_LABELS) as MessageType[]).map((type) => (
                  <button className="secondary-action compact" type="button" key={type} onClick={() => handleMessage(type)}>
                    <MessageCircleHeart size={17} aria-hidden="true" />
                    {MESSAGE_LABELS[type]}
                  </button>
                ))}
              </div>
            </div>

            <div className="panel wide-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">记录</p>
                  <h2>安全文案日志</h2>
                </div>
                <span className="metric-pill">{state.aiMessageLogs.length}</span>
              </div>
              <div className="diary-list">
                {state.aiMessageLogs.length === 0 && <p className="muted">还没有日记，和宠物互动后会出现第一条。</p>}
                {state.aiMessageLogs.map((entry) => (
                  <article className="diary-entry" key={entry.id}>
                    <span>{MESSAGE_LABELS[entry.type]} · {new Date(entry.createdAt).toLocaleString('zh-CN')}</span>
                    <p>{entry.content}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {activeView === 'privacy' && (
          <section className="view-grid privacy-view" aria-labelledby="privacy-title">
            <div className="panel wide-panel">
              <div className="section-heading">
                <div>
                  <p className="eyebrow">安全</p>
                  <h2 id="privacy-title">本地优先与儿童友好</h2>
                </div>
                <ShieldCheck size={23} aria-hidden="true" />
              </div>
              <div className="privacy-grid">
                <article>
                  <strong>本机保存</strong>
                  <p>昵称、任务、能量、日记默认只保存在当前浏览器。</p>
                </article>
                <article>
                  <strong>不采集</strong>
                  <p>不请求学校、位置、通讯录、照片、语音、摄像头。</p>
                </article>
                <article>
                  <strong>可控制</strong>
                  <p>家长可以随时导出 JSON，也可以清空本机数据。</p>
                </article>
                <article>
                  <strong>可审计</strong>
                  <p>宠物文案来自规则模板，日记记录对家长可见。</p>
                </article>
              </div>
              <div className="data-actions">
                <button className="secondary-action" type="button" onClick={handleExport}>
                  <Download size={18} aria-hidden="true" />
                  导出数据
                </button>
                <button className="danger-action" type="button" onClick={handleReset}>
                  <RotateCcw size={18} aria-hidden="true" />
                  重新开始
                </button>
              </div>
            </div>
          </section>
        )}
      </main>

      <div className="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}
