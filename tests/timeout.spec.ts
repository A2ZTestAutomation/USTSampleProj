import { test, expect } from '@playwright/test'

test.describe('Timeout Sample', () => {
    // test.setTimeout(10000)

    test('Timeout Test', async ({ page }) => {
        // test.setTimeout(25000)
        await page.goto('http://uitestingplayground.com/ajax')
        await page.locator('button#ajaxButton').click({ timeout: 10000 })
        const txtElem = page.locator('p.bg-success')
        await txtElem.waitFor({ state: 'visible' })
        // page.waitForTimeout(10000)
        // await expect(txtElem).toContainText('Data loaded with AJAX get request.', { timeout: 18000 })
        await expect(txtElem).toContainText('Data loaded with AJAX get request.')
    })

    test('Newtwork timeout Test', async ({ page }) => {

        await page.goto('http://uitestingplayground.com/ajax')
        await page.locator('button#ajaxButton').click()
        const txtElem = page.locator('p.bg-success')
        await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

        //To wait for all network calls to complete - not recommended
        // await page.waitForLoadState('networkidle')

        await expect(txtElem).toContainText('Data loaded with AJAX get request.')
        // const txt = await txtElem.textContent()
        // expect(txt).toContain('Data loaded with AJAX get request.')

    })
})

//1. To get response - DB or API
//2. Business logic validation may take time, frontend validation
//3. Network 