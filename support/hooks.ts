import { test } from '@playwright/test'
test.beforeEach(async ({ page }, testInfo) => {
    console.log(`Before Each test....., ${testInfo.title}`)
    await page.goto('https://testautomationpractice.blogspot.com/')
})

test.afterEach(async () => {
    console.log('After Each test......')
})

export default test