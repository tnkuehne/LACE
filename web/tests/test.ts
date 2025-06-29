import { expect, test } from '@playwright/test';

test('landing page shows text', async ({ page }) => {
	await page.goto('/');
	// Check the logo
	await expect(page.locator('text=LACE')).toBeVisible();

	// Check the main heading and subheading
	await expect(page.locator('text=Learn. Apply. Comply.')).toBeVisible();
	await expect(
		page.locator('text=Continuing Education Materials on Privacy-Enhancing Technologies')
	).toBeVisible();

	// Check the Courses section
	await expect(page.locator('a:has-text("Courses")')).toBeVisible();
});
