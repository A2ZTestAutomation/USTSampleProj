import test, { expect } from "@playwright/test"
test.describe('File upload and download Test', () => {
    const filepath = './files/fullpage.png'
    test('File Upload Test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/upload')
        // const fileChooserPromise = page.waitForEvent('filechooser')
        // await page.locator('#file-upload').click()
        // const filechooser = await fileChooserPromise
        // await filechooser.setFiles(filepath)
        // // page.setInputFiles()
        // await page.waitForTimeout(2000)
        // await page.locator('#file-submit').click()
        // await page.waitForTimeout(2000)

        //Method 2
        await page.locator('#file-upload').setInputFiles(filepath)

    })

    test('File download Test', async ({ page }) => {
        await page.goto('https://the-internet.herokuapp.com/download')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            await page.getByRole('link', { name: 'test2.txt' }).click()
        ])
        await download.saveAs('./downloadFiles/textFile.txt')
    })

})
