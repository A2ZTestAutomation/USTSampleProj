import { test, expect } from '@playwright/test'


test('Autocomplete Test', async ({ page }) => {
    const inputTxt = 'as'
    const expTxt = 'JavaScript'
    await page.goto('https://jqueryui.com/autocomplete/')

    const frame1 = page.frameLocator('.demo-frame')
    const inpAge = frame1.locator('#tags')
    await inpAge.press("ArrowDown")
    await inpAge.fill(inputTxt)

    // await page.waitForTimeout(1000)
    // await frame1.locator('ul#ui-id-1').waitFor({ state: 'visible', timeout: 1000 })

    const items = await frame1.locator('ul#ui-id-1 li').all()
    await page.pause()
    // expect(items).toHaveLength(4)
    console.log(items.length)
    for (let item of items) {
        const itemTxt = await item.textContent()
        console.log(itemTxt)
        if (itemTxt == expTxt) {
            await item.click()
            break
        }

    }
    const selectedValue = await inpAge.inputValue();
    console.log("Selected Value: " + selectedValue);
    expect(selectedValue).toEqual(expTxt);

})
