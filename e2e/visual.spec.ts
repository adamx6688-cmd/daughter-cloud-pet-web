import { expect, test } from '@playwright/test';

test.describe('visual smoke @visual', () => {
  test('desktop and mobile layouts render without horizontal overflow', async ({ page }, testInfo) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: '今日小目标' })).toBeVisible();

    const desktop = await page.screenshot({
      path: testInfo.outputPath('cloud-pet-desktop.png'),
      fullPage: true
    });
    expect(desktop.byteLength).toBeGreaterThan(50_000);

    const desktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(desktopOverflow).toBe(false);

    await page.setViewportSize({ width: 390, height: 844 });
    await expect(page.getByRole('heading', { name: '今日小目标' })).toBeVisible();
    const mobile = await page.screenshot({
      path: testInfo.outputPath('cloud-pet-mobile.png'),
      fullPage: true
    });
    expect(mobile.byteLength).toBeGreaterThan(40_000);

    const mobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    expect(mobileOverflow).toBe(false);
  });
});
