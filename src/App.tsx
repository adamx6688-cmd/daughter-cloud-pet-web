import {
  Bath,
  BookOpen,
  Check,
  Clock3,
  Download,
  Gift,
  HeartHandshake,
  Milk,
  RotateCcw,
  Shirt,
  Sparkles,
  Star,
  Timer,
  Trash2
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { PetIllustration } from './components/PetIllustration';
import {
  DAILY_ENERGY_CAP,
  PET_CHOICES,
  SHOP_ITEMS,
  buildDailyTasks,
  completeTask,
  createInitialState,
  deleteFamilyData,
  exportFamilyData,
  generateAiMessage,
  generatePetSnapshot,
  getTaskStats,
  getTasksForDate,
  interactWithPet,
  setupPet,
  startTask,
  useShopItem,
  type DailyTask,
  type FamilyState,
  type PetSpecies,
  type ShopItem
} from './lib/domain';
import { clearStoredState, loadState, saveState } from './lib/storage';
import './styles.css';

const TODAY = new Date();

function initialiseState() {
  if (typeof window === 'undefined') {
    return { state: buildDailyTasks(createInitialState(TODAY), TODAY), error: null };
  }
  const result = loadState(TODAY);
  return { state: buildDailyTasks(result.state, TODAY), error: result.error };
}

function itemIcon(item: ShopItem) {
  if (item.type === 'food') {
    return <Milk size={18} aria-hidden="true" />;
  }
  if (item.type === 'care') {
    return <Bath size={18} aria-hidden="true" />;
  }
  return <Shirt size={18} aria-hidden="true" />;
}

function careLabel(value: number) {
  if (value >= 75) {
    return '很好';
  }
  if (value >= 45) {
    return '还不错';
  }
  return '需要照顾';
}

export default function App() {
  const initial = useMemo(initialiseState, []);
  const [state, setState] = useState<FamilyState>(initial.state);
  const [storageError, setStorageError] = useState<string | null>(initial.error);
  const [toast, setToast] = useState<string>('');
  const [rewardText, setRewardText] = useState<string>('');
  const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies>(initial.state.petProfile.species);
  const [onboardingDraft, setOnboardingDraft] = useState({
    child: initial.state.childProfile.nickname,
    pet: initial.state.petProfile.name
  });
  const [targetDrafts, setTargetDrafts] = useState<Record<string, number>>({});
  const [elapsedDrafts, setElapsedDrafts] = useState<Record<string, number>>({});

  const snapshot = useMemo(() => generatePetSnapshot(state, TODAY).snapshot, [state]);
  const tasks = useMemo(() => getTasksForDate(state, TODAY), [state]);
  const stats = useMemo(() => getTaskStats(state, TODAY), [state]);
  const foodItems = SHOP_ITEMS.filter((item) => item.type === 'food');
  const careItems = SHOP_ITEMS.filter((item) => item.type === 'care');
  const outfitItems = SHOP_ITEMS.filter((item) => item.type === 'outfit');
  const latestLog = state.activityLog.slice(0, 5);

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

  function showReward(text: string) {
    setRewardText(text);
    window.setTimeout(() => setRewardText(''), 3600);
  }

  function handleSetup() {
    const next = setupPet(state, {
      childNickname: onboardingDraft.child,
      petName: onboardingDraft.pet,
      species: selectedSpecies,
      now: new Date()
    });
    commit(next, '宠物搬进来了。');
    showReward('欢迎礼：你有 18 点能量，可以先试着喂养或清洁。');
  }

  function handleStartTask(task: DailyTask) {
    const targetMinutes = targetDrafts[task.id] || task.estimatedMinutes || 10;
    commit(startTask(state, task.id, { targetMinutes, startedAt: new Date() }), '开始计时。');
    setElapsedDrafts((current) => ({ ...current, [task.id]: targetMinutes }));
  }

  function handleFinishTask(task: DailyTask) {
    const before = state.petProfile.energyBalance;
    const elapsedMinutes = elapsedDrafts[task.id] || task.targetMinutes || task.estimatedMinutes;
    const next = completeTask(state, task.id, { completedAt: new Date(), elapsedMinutes });
    const earned = Math.max(0, next.petProfile.energyBalance - before);
    commit(next, `获得 ${earned} 能量。`);
    showReward(`${task.title}完成！获得 ${earned} 能量，可以拿去照顾或装扮宠物。`);
  }

  function handleUseItem(item: ShopItem) {
    try {
      const next = useShopItem(state, item.id, new Date());
      commit(next, `${item.name} 使用成功。`);
      showReward(`${state.petProfile.name}喜欢${item.name}。`);
    } catch (error) {
      setToast(error instanceof Error ? error.message : '这个道具暂时不能使用。');
    }
  }

  function handleInteract() {
    commit(interactWithPet(state, new Date()), `${state.petProfile.name}回应了你。`);
  }

  function handleStory() {
    const result = generateAiMessage(state, 'story', new Date());
    commit(result.state, '生成了一条宠物日记。');
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
    setOnboardingDraft({ child: fresh.childProfile.nickname, pet: fresh.petProfile.name });
    setSelectedSpecies(fresh.petProfile.species);
    commit(fresh, '已重新开始。');
  }

  if (!state.childProfile.onboarded) {
    return (
      <div className="app-shell child-shell">
        <a className="skip-link" href="#main">
          跳到内容
        </a>
        <main className="onboarding-page" id="main">
          <section className="onboarding-panel" aria-labelledby="onboarding-title">
            <div className="brand-block">
              <div className="brand-mark" aria-hidden="true">
                <Sparkles size={22} />
              </div>
              <div>
                <p className="eyebrow">第一步</p>
                <h1 id="onboarding-title">选一个宠物伙伴</h1>
              </div>
            </div>
            <p className="onboarding-copy">给它取个名字，完成小任务获得能量，再用能量喂养、清洁、装扮它。</p>

            <div className="pet-choice-grid" role="radiogroup" aria-label="选择宠物">
              {PET_CHOICES.map((choice) => (
                <button
                  className={choice.id === selectedSpecies ? 'pet-choice pet-choice-active' : 'pet-choice'}
                  key={choice.id}
                  type="button"
                  role="radio"
                  aria-checked={choice.id === selectedSpecies}
                  onClick={() => {
                    setSelectedSpecies(choice.id);
                    setOnboardingDraft((current) => ({ ...current, pet: choice.name }));
                  }}
                >
                  <span className={`choice-avatar choice-${choice.id}`} aria-hidden="true" />
                  <strong>{choice.name}</strong>
                  <span>{choice.tagline}</span>
                </button>
              ))}
            </div>

            <div className="onboarding-form">
              <label>
                你的昵称
                <input
                  value={onboardingDraft.child}
                  onChange={(event) => setOnboardingDraft({ ...onboardingDraft, child: event.target.value })}
                />
              </label>
              <label>
                宠物名字
                <input
                  value={onboardingDraft.pet}
                  onChange={(event) => setOnboardingDraft({ ...onboardingDraft, pet: event.target.value })}
                />
              </label>
            </div>

            <button className="primary-action big-action" type="button" onClick={handleSetup}>
              <Star size={20} aria-hidden="true" />
              开始养宠物
            </button>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="app-shell child-shell">
      <a className="skip-link" href="#main">
        跳到内容
      </a>
      <header className="topbar child-topbar">
        <div className="brand-block">
          <div className="brand-mark" aria-hidden="true">
            <Sparkles size={20} />
          </div>
          <div>
            <p className="eyebrow">宠物首页</p>
            <h1>星星云宠物</h1>
          </div>
        </div>
        <div className="energy-wallet" aria-label="可用能量">
          <span>可用能量</span>
          <strong>{snapshot.energyBalance}</strong>
        </div>
      </header>

      <main id="main" className="child-home">
        {storageError && (
          <section className="alert" role="alert">
            本机保存不可用：{storageError}
          </section>
        )}

        {rewardText && (
          <section className="reward-banner" role="status" aria-live="polite">
            <Gift size={20} aria-hidden="true" />
            {rewardText}
          </section>
        )}

        <section className="home-hero" aria-labelledby="pet-room-title">
          <div className="pet-panel child-pet-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">我的宠物</p>
                <h2 id="pet-room-title">{snapshot.petName}</h2>
              </div>
              <button className="icon-command" type="button" onClick={handleInteract} aria-label="摸摸宠物">
                <HeartHandshake size={20} />
              </button>
            </div>
            <PetIllustration snapshot={snapshot} />
            <div className="speech" aria-live="polite">
              {snapshot.message}
            </div>
            <div className="care-grid" aria-label="宠物状态">
              <CareMeter label="饱饱值" value={snapshot.fullness} />
              <CareMeter label="清洁值" value={snapshot.cleanliness} />
              <CareMeter label="开心值" value={snapshot.joy} />
            </div>
          </div>

          <div className="panel level-panel">
            <div className="section-heading">
              <div>
                <p className="eyebrow">升级</p>
                <h2>{snapshot.stageName}</h2>
              </div>
              <span className="metric-pill">{snapshot.progressToNext}%</span>
            </div>
            <div className="progress-wrap" aria-label={`升级进度 ${snapshot.progressToNext}%`}>
              <div className="progress-meta">
                <span>累计能量 {snapshot.totalEnergy}</span>
                <span>活跃 {snapshot.activeDays} 天</span>
              </div>
              <div className="progress-track">
                <span style={{ width: `${snapshot.progressToNext}%` }} />
              </div>
            </div>
            <div className="upgrade-hint">
              <p>下一形态：{snapshot.nextStageName}</p>
              <p>还需要 {snapshot.nextStageEnergyRemaining} 能量 · {snapshot.nextStageDaysRemaining} 天</p>
            </div>
          </div>
        </section>

        <section className="panel task-panel child-task-panel" aria-labelledby="task-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">做任务赚能量</p>
              <h2 id="task-title">今日小目标</h2>
            </div>
            <span className="metric-pill">
              {stats.completed}/{stats.total}
            </span>
          </div>
          <div className="task-list child-task-list">
            {tasks.map((task) => (
              <article className={`task-card child-task-card task-${task.status}`} key={task.id}>
                <div className="task-main">
                  <div className="task-kicker">
                    <span>{task.categoryLabel}</span>
                    <span>{task.energyValue} 基础能量</span>
                  </div>
                  <h3>{task.title}</h3>
                  {task.status === 'open' && (
                    <label className="inline-number">
                      目标时间
                      <input
                        type="number"
                        min="1"
                        max="180"
                        value={targetDrafts[task.id] || task.estimatedMinutes}
                        onChange={(event) =>
                          setTargetDrafts((current) => ({ ...current, [task.id]: Number(event.target.value) }))
                        }
                      />
                      分钟
                    </label>
                  )}
                  {task.status === 'in_progress' && (
                    <label className="inline-number">
                      实际用时
                      <input
                        type="number"
                        min="1"
                        max="180"
                        value={elapsedDrafts[task.id] || task.targetMinutes}
                        onChange={(event) =>
                          setElapsedDrafts((current) => ({ ...current, [task.id]: Number(event.target.value) }))
                        }
                      />
                      分钟
                    </label>
                  )}
                  {task.status === 'approved' && (
                    <p className="earned-line">
                      获得 {task.earnedEnergy} 能量 · {task.bonusReason}
                    </p>
                  )}
                </div>
                <div className="task-actions">
                  {task.status === 'open' && (
                    <button className="primary-action" type="button" onClick={() => handleStartTask(task)}>
                      <Timer size={18} aria-hidden="true" />
                      开始
                    </button>
                  )}
                  {task.status === 'in_progress' && (
                    <button className="primary-action finish-action" type="button" onClick={() => handleFinishTask(task)}>
                      <Check size={18} aria-hidden="true" />
                      完成
                    </button>
                  )}
                  {task.status === 'approved' && <span className="state-chip done-chip">已收下</span>}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="care-shop-grid">
          <ShopSection title="喂养" subtitle="用能量换点心" items={foodItems} onUse={handleUseItem} />
          <ShopSection title="清洁" subtitle="让宠物亮起来" items={careItems} onUse={handleUseItem} />
          <ShopSection title="装扮" subtitle="攒能量换衣服" items={outfitItems} onUse={handleUseItem} />
        </section>

        <section className="panel activity-panel" aria-labelledby="activity-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">反馈</p>
              <h2 id="activity-title">刚刚发生了什么</h2>
            </div>
            <button className="secondary-action compact" type="button" onClick={handleStory}>
              <BookOpen size={17} aria-hidden="true" />
              小故事
            </button>
          </div>
          <div className="activity-list">
            {latestLog.length === 0 && <p className="muted">开始一个任务，或者喂养宠物，这里会马上记录。</p>}
            {latestLog.map((entry) => (
              <article className="activity-entry" key={entry.id}>
                <Clock3 size={16} aria-hidden="true" />
                <span>{entry.text}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="panel guardian-tools">
          <div>
            <p className="eyebrow">家长小工具</p>
            <p className="muted">先藏在首页底部，不打断孩子养宠物。</p>
          </div>
          <div className="data-actions">
            <button className="secondary-action compact" type="button" onClick={handleExport}>
              <Download size={17} aria-hidden="true" />
              导出
            </button>
            <button className="danger-action compact" type="button" onClick={handleReset}>
              <Trash2 size={17} aria-hidden="true" />
              重置
            </button>
          </div>
        </section>
      </main>

      <div className="toast" role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

function CareMeter({ label, value }: { label: string; value: number }) {
  return (
    <div className="care-meter">
      <div className="care-meter-label">
        <span>{label}</span>
        <strong>{careLabel(value)}</strong>
      </div>
      <div className="mini-track">
        <span style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function ShopSection({
  title,
  subtitle,
  items,
  onUse
}: {
  title: string;
  subtitle: string;
  items: ShopItem[];
  onUse: (item: ShopItem) => void;
}) {
  return (
    <section className="panel shop-section" aria-labelledby={`shop-${title}`}>
      <div className="section-heading">
        <div>
          <p className="eyebrow">{subtitle}</p>
          <h2 id={`shop-${title}`}>{title}</h2>
        </div>
      </div>
      <div className="shop-list">
        {items.map((item) => (
          <article className="shop-item" key={item.id}>
            <div className="shop-icon">{itemIcon(item)}</div>
            <div>
              <strong>{item.name}</strong>
              <p>{item.description}</p>
              <span>{item.cost} 能量</span>
            </div>
            <button className="secondary-action compact" type="button" onClick={() => onUse(item)}>
              使用
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}
