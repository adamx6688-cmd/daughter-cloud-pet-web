import AxeBuilder from '@axe-core/playwright';
import { expect, test, type Page } from '@playwright/test';

async function finishOnboarding(page: Page) {
  await page.goto('./');
  await page.getByRole('radio', { name: /星尾狐/ }).click();
  await page.getByLabel('你的昵称').fill('小鹿');
  await page.getByLabel('宠物名字').fill('火火');
  await page.getByRole('button', { name: '开始养宠物' }).click();
  await expect(page.getByRole('heading', { name: '火火' })).toBeVisible();
}

test.describe('accessibility @a11y', () => {
  test('onboarding has no axe violations', async ({ page }, testInfo) => {
    await page.goto('./');
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    await testInfo.attach('axe-onboarding.json', {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json'
    });
    expect(results.violations).toEqual([]);
  });

  test('pet home has no axe violations', async ({ page }, testInfo) => {
    await finishOnboarding(page);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag22aa']).analyze();
    await testInfo.attach('axe-home.json', {
      body: JSON.stringify(results, null, 2),
      contentType: 'application/json'
    });
    expect(results.violations).toEqual([]);
  });

  test('keyboard can reach onboarding and task action', async ({ page }) => {
    await page.goto('./');
    await page.keyboard.press('Tab');
    await expect(page.getByText('跳到内容')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('radio', { name: /星云团/ })).toBeFocused();
  });
});
