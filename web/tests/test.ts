import { expect, test } from '@playwright/test';

test.use({
	ignoreHTTPSErrors: true
});

test('landing page shows text', async ({ page }) => {
	await page.goto('https://localhost');
	// Check the logo
	await expect(page.locator('text=LACE')).toBeVisible();

	// Check the main heading and subheading
	await expect(page.locator('text=Learn. Apply. Comply.')).toBeVisible();
	await expect(
		page.locator('text=Continuing Education Materials on Privacy-Enhancing Technologies')
	).toBeVisible();

	// Check the Courses section
	await expect(page.locator('text=Courses')).toBeVisible();
});
