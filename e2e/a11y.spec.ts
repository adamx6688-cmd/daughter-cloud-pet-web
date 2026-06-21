import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

test.describe('accessibility @a11y', () => {
  test('key views have no axe violations', async ({ page }, testInfo) => {
    await page.goto('/');
    const views = ['宠物房间', '家长中心', '宠物日记', '隐私'];

    for (const view of views) {
      await page.getByRole('button', { name: view }).click();
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze();
      await testInfo.attach(`axe-${view}.json`, {
        body: JSON.stringify(results, null, 2),
        contentType: 'application/json'
      });
      expect(results.violations, `${view} axe violations`).toEqual([]);
    }
  });

  test('keyboard can reach primary navigation and task action', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByText('跳到内容')).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '宠物房间' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('button', { name: '家长中心' })).toBeFocused();
  });
});
