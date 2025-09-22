import { expect } from "@playwright/test"
import test from '../support/hooks'
import * as allure from "allure-js-commons";

test.describe('Checkbox and Radiobutton Test', { tag: ['@Smoke', '@Sanity'] }, () => {
    // test.describe.configure({ mode: 'parallel' });
    test('Checkbox Test', async ({ page }) => {
        //Meta info about test
        await allure.displayName('Checkbox Validation Test')
        await allure.owner('Anandhi')
        await allure.tags('@Smoke')
        await allure.description('This test is to verify check box functions')

        //View hierarchy structure - behavior
        await allure.epic("Customer Management")
        await allure.feature('Registration')
        await allure.story('Updating user detail')

        //View heirarchy structure - suite-based 
        await allure.parentSuite("Regression Test Suite")
        await allure.suite('For release 2 features')


        // await page.goto('https://testautomationpractice.blogspot.com/')
        await page.getByRole('checkbox', { name: 'Monday' }).check()
        await page.getByRole('checkbox', { name: 'Tuesday' }).check()
        await page.getByRole('checkbox', { name: 'Friday' }).check()
        const monday = page.getByRole('checkbox', { name: 'Monday' })
        expect(monday).toBeChecked()
        await monday.uncheck()
        expect(monday).not.toBeChecked()

        const allDays = page.locator('.form-group [type="checkbox"]')
        console.log(await allDays.count())
        for (const chkbox of await allDays.all()) {
            await chkbox.check()
            expect(chkbox).toBeChecked()
        }

    })

    test('RadioButton Test', async ({ page }) => {
        // await page.goto('https://testautomationpractice.blogspot.com/')
        const radioBtn = page.getByLabel('Male', { exact: true })
        await expect(radioBtn).not.toBeChecked()
        await radioBtn.check()
        //To make fail
        expect(radioBtn).not.toBeChecked()
        await page.waitForTimeout(3000)
    })

    test('Dropdown test', async ({ page }) => {
        // await page.goto('https://testautomationpractice.blogspot.com/')
        await page.screenshot({ path: './files/fullpage.png' })
        await page.locator('#country').scrollIntoViewIfNeeded()
        await page.selectOption('#country', {
            index: 5
        }).then((dropdownValue) => {
            expect(dropdownValue).toEqual(['australia'])

        })
        const dropdown = page.locator('#animals')
        await dropdown.screenshot({ path: './files/element.png' })
        await page.selectOption('#animals', [
            { label: 'Cat' },
            { value: 'elephant' },
            { index: 8 }
        ])

    })
})