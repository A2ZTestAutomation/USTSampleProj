import test, { expect } from "@playwright/test"

test.describe('Handling types of alerts', () => {
    test('Simple Alert', { tag: '@Smoke' }, async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
        page.on('dialog', async (alertBox) => {
            const txt = alertBox.message()
            console.log('Simple alert TExt...', txt)
            await alertBox.accept()
        })
        await page.locator('button#alertBtn').click()
    })
    test('Confirm Alert', { tag: '@Sanity' }, async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
        page.on('dialog', async (alertBox) => {
            const txt = alertBox.message()
            console.log('Confirmation alert TExt...', txt)

            await alertBox.dismiss()

        })
        await page.locator('button#confirmBtn').click()
        const txtMsg = page.locator('p#demo')
        await expect(txtMsg).toHaveText('You pressed Cancel!')

    })

    test('Prompt Alert', async ({ page }) => {
        await page.goto('https://testautomationpractice.blogspot.com/')
        page.on('dialog', async (alertBox) => {
            const txt = alertBox.message()
            console.log('Confirmation alert TExt...', txt)
            await alertBox.accept('Hello Welcome')
        })
        await page.locator('button#promptBtn').click()
        const txtMsg = page.locator('p#demo')
        await expect(txtMsg).toContainText('Hello Welcome')

    })

})