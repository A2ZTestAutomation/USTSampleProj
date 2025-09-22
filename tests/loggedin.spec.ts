import { test, expect } from '@playwright/test'

test.describe('User Login', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.demoblaze.com/')
    })
    test('Valid Login Test', async ({ page }) => {
        await page.waitForTimeout(5000)
        expect(page.getByRole('link', { name: 'Welcome' })).toBeVisible()
    })
})