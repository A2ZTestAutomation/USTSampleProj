import { test, expect } from "@playwright/test"

test('iFrame & Tooltip Test', async ({ page }) => {
    await page.goto('https://jqueryui.com/tooltip/')
    const allFrames = page.frames()
    // console.log(allFrames.length)
    // allFrames.forEach(frame => {
    //     console.log(frame.name())
    // })

    const frame1 = page.frameLocator('.demo-frame')
    const ageInp = frame1.locator('#age')
    await ageInp.hover()
    const toolTxt = await frame1.getByRole('tooltip').textContent()
    expect(toolTxt).toEqual('We ask for your age only for statistical purposes.')
})