import test, { expect } from "@playwright/test"

test('Shadow DOM Test', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    const shadowElem = page.locator('span#shadow_content')
    await expect(shadowElem).toContainText('Mobiles')
    const nestedDOM = page.locator('div#nested_shadow_content')
    await expect(nestedDOM).toContainText('Laptops')

})

