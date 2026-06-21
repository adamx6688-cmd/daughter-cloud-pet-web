import { expect, test } from '@playwright/test';

test.describe('cloud pet web app', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('child completes tasks and parent confirms pending work', async ({ page }) => {
    await expect(page.getByRole('heading', { name: '星星云宠物' })).toBeVisible();
    await expect(page.getByRole('heading', { name: '今日小目标' })).toBeVisible();

    const readingCard = page.getByRole('article').filter({ hasText: '阅读 10 分钟' });
    await readingCard.getByRole('button', { name: '完成' }).click();
    await expect(readingCard.getByText('已收下')).toBeVisible();

    const weeklyCard = page.getByRole('article').filter({ hasText: '本周错题/收获复盘 1 次' });
    await weeklyCard.getByRole('button', { name: '完成' }).click();
    await expect(weeklyCard.getByText('待确认')).toBeVisible();

    await page.getByRole('button', { name: '家长中心' }).click();
    await expect(page.getByRole('heading', { name: '待家长确认' })).toBeVisible();
    await page.getByRole('article').filter({ hasText: '本周错题/收获复盘 1 次' }).getByRole('button', { name: '确认' }).click();

    await page.getByRole('button', { name: '宠物房间' }).click();
    await expect(page.getByText('已收下')).toHaveCount(2);
  });

  test('parent can update profile, add task, and generate diary', async ({ page }) => {
    await page.getByRole('button', { name: '家长中心' }).click();
    await page.getByLabel('孩子昵称').fill('小鹿');
    await page.getByLabel('宠物名字').fill('云云');
    await page.getByRole('button', { name: '保存' }).click();
    await expect(page.getByText('资料已保存。')).toBeVisible();

    await page.getByLabel('任务名称').fill('背诵古诗 8 分钟');
    await page.getByLabel('类型').selectOption('daily');
    await page.getByLabel('分类').selectOption('recite');
    await page.getByRole('spinbutton', { name: '分钟' }).fill('8');
    await page.getByRole('spinbutton', { name: '能量' }).fill('9');
    await page.getByRole('button', { name: '添加' }).click();
    await expect(page.getByText('背诵古诗 8 分钟')).toBeVisible();

    await page.getByRole('button', { name: '宠物日记' }).click();
    await page.getByRole('button', { name: '故事' }).click();
    await expect(page.getByText(/今晚的小故事/).first()).toBeVisible();
    await expect(page.getByText('安全文案日志')).toBeVisible();
  });

  test('privacy controls expose export and reset actions', async ({ page }) => {
    await page.getByRole('button', { name: '隐私' }).click();
    await expect(page.getByRole('heading', { name: '本地优先与儿童友好' })).toBeVisible();
    await expect(page.getByRole('button', { name: '导出数据' })).toBeVisible();
    await expect(page.getByRole('button', { name: '重新开始' })).toBeVisible();
  });
});
