import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
    await page.goto('https://www.demoblaze.com/')
})

test('Search Item ', async ({ page }) => {
    await page.getByRole('link', { name: 'Samsung galaxy s6' }).click()
})