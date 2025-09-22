import test from '@playwright/test'

test('Web Table test', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/tables')
    const allRows = await page.locator('#table1 tbody tr').all()
    console.log('Total Rows ....', allRows.length)
    allRows.forEach(async (rows) => {
        console.log('Column Count...', await rows.locator('td').count())
    })

    //To get text from a particular row
    const table = page.locator('#table1 tbody')
    const rowTxt = await table.locator('tr').nth(2).locator(':scope').allTextContents()
    rowTxt.forEach((txt) => {
        console.log(txt)
    })

    //To get the details for an emp
    const rowData = table.getByRole('row', { name: 'Frank' })
    const texts = await rowData.evaluateAll(cols => {
        cols.map(element => element.textContent)
    })
    console.log('All column texts...', texts)

})