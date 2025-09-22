import test, { expect } from "@playwright/test";

test('Sample First Test', async ({ page }) => {
    await page.goto('https://www.example.com/')
    await expect(page).toHaveTitle('Example Domain')

})

test('Sample Locator Test', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')

    await page.getByRole('link', { name: 'PlaywrightPractice' }).click({ force: true })
    // await page.locator('#username').fill('Test User')
    // await page.getByLabel('Username:').fill('Test User')
    // await page.getByLabel('Username:').fill('Peter')

    await page.getByLabel('Username:').pressSequentially('Test User', { delay: 500 })
    await page.getByLabel('Username:').pressSequentially('Peter')

    await page.getByLabel('Username:').press('PageDown')
    await page.getByLabel('Username:').clear()


    // const inputTxt = await page.locator('#username').textContent()
    // const inputTxt = await page.locator('#username').inputValue()
    // expect(inputTxt).toEqual('Test User')

    // await page.getByRole('button', { name: 'START' }).click()
    // await page.getByText('START').click()

    // // const btnTxt = await page.locator('button.stop').textContent()
    // const btnTxt = await page.locator('button.stop').innerText()
    // expect(btnTxt).toEqual('STOP')

    // await expect(page.locator('button.stop')).toHaveText('STOP')

    // await page.getByPlaceholder('Enter your full name').fill('Name is Test User')
})

test('Locators using filters', async ({ page }) => {
    await page.goto('https://testautomationpractice.blogspot.com/')
    const listItems = page.locator('div#PageList2 ul li')
    console.log('Getting text of all LIs', await listItems.allTextContents())
    console.log('Getting text of all LIs', await listItems.allInnerTexts())
    const numOfItems = await listItems.count()
    expect(listItems).toHaveCount(5)
    //Method 1 - to get all text and select a particular value
    for (let i = 0; i < numOfItems; i++) {
        const itemTxt = await listItems.nth(i).textContent()
        console.log("Each Item's text", itemTxt)
        if (itemTxt?.includes("Blog")) {
            await listItems.nth(i).click()
            expect(page).toHaveTitle(/Blog/)
            break
        }
    }
    //Method2 - to get all text
    const newLists = await page.locator('div#PageList1 ul li')
    const texts = await newLists.evaluateAll(list =>
        list.map(element => element.textContent));
    console.log('All Text contents from Map: ', texts)

    //Method3  - Using navigation methods
    await listItems.last().click()
    await listItems.first().click()
    // await listItems.nth(2).click()

    //Method4 - Using filter to select an element
    await listItems.filter({ hasText: 'Blog' }).click()

})


