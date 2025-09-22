import { test as setup, expect } from '@playwright/test'
import { STORAGE_STATE } from '../playwright.config';

setup('Login into App', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
    await page.getByRole('link', { name: 'Log in' }).click();
    page.waitForLoadState()
    // page.waitForTimeout(5000)
    await page.fill('input#loginusername', 'Anandhi')
    await page.fill('input#loginpassword', 'Anandhi')
    const loginBtn = page.locator('button.btn.btn-primary', { hasText: 'Log in' })
    await loginBtn.click()
    await expect(page.getByRole('link', { name: 'Welcome' })).toBeVisible();
    await page.context().storageState({ path: STORAGE_STATE })

})