import test, { expect } from "@playwright/test"
test.describe('Window Handle Test', () => {

    test('New Tab Window Test', async ({ page }) => {
        await page.goto('https://demoqa.com/browser-windows')
        const popupPromise = page.waitForEvent('popup')
        await page.locator('#tabButton').click()
        const popup = await popupPromise
        expect(popup.url()).toContain('sample')
        const pageHeading = popup.locator('#sampleHeading')
        await expect(pageHeading).toContainText('sample page')
        await popup.close()
        await page.waitForTimeout(3000)

    })
    test('New  Window Test', async ({ page }) => {
        await page.goto('https://demoqa.com/browser-windows')
        const popupWinPromise = page.waitForEvent('popup')
        await page.locator('#windowButton').click()
        const newWindow = await popupWinPromise
        const pages = newWindow.context().pages()
        console.log("No of Window....", pages.length)
        pages.forEach(newPage => {
            console.log(newPage.url())
        })



    })


})
