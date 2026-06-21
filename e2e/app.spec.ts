import { expect, test, type Page } from '@playwright/test';

async function finishOnboarding(page: Page) {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: '选一个宠物伙伴' })).toBeVisible();
  await page.getByRole('radio', { name: /月光兔/ }).click();
  await page.getByLabel('你的昵称').fill('小鹿');
  await page.getByLabel('宠物名字').fill('月月');
  await page.getByRole('button', { name: '开始养宠物' }).click();
  await expect(page.getByRole('heading', { name: '月月' })).toBeVisible();
}

test.describe('child-first cloud pet home', () => {
  test('first-time child chooses and names a pet', async ({ page }) => {
    await finishOnboarding(page);
    await expect(page.getByText('可用能量')).toBeVisible();
    await expect(page.getByText('欢迎礼')).toBeVisible();
    await expect(page.getByText('饱饱值', { exact: true })).toBeVisible();
    await expect(page.getByRole('heading', { name: '今日小目标' })).toBeVisible();
  });

  test('child starts a timed task, enters elapsed time, and gets immediate energy feedback', async ({ page }) => {
    await finishOnboarding(page);
    const readingCard = page.getByRole('article').filter({ hasText: '阅读 10 分钟' });
    await readingCard.getByRole('spinbutton', { name: '目标时间' }).fill('15');
    await readingCard.getByRole('button', { name: '开始' }).click();
    await expect(page.getByText('开始计时。')).toBeVisible();

    await readingCard.getByRole('spinbutton', { name: '实际用时' }).fill('8');
    await readingCard.getByRole('button', { name: '完成' }).click();
    await expect(page.getByText(/获得 \d+ 能量/).first()).toBeVisible();
    await expect(readingCard.getByText('已收下')).toBeVisible();
  });

  test('child spends energy to feed and clean the pet', async ({ page }) => {
    await finishOnboarding(page);
    const foodCard = page.getByRole('article').filter({ hasText: '星星饼干' });
    await foodCard.getByRole('button', { name: '使用' }).click();
    await expect(page.getByText('星星饼干 使用成功。')).toBeVisible();
    await expect(page.getByText('饱饱值', { exact: true })).toBeVisible();

    const cleanCard = page.getByRole('article').filter({ hasText: '泡泡刷' });
    await cleanCard.getByRole('button', { name: '使用' }).click();
    await expect(page.getByText('泡泡刷 使用成功。')).toBeVisible();
    await expect(page.getByText('刚刚发生了什么')).toBeVisible();
  });

  test('parent tools remain available but secondary', async ({ page }) => {
    await finishOnboarding(page);
    await expect(page.getByText('家长小工具')).toBeVisible();
    await expect(page.getByRole('button', { name: '导出' })).toBeVisible();
    await expect(page.getByRole('button', { name: '重置' })).toBeVisible();
  });
});
