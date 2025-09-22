import { expect } from '@playwright/test';
import { test } from './paramTest'
import { users } from '../testData/userData.json'

const usernames = ['standard_user', 'visual_user']
for (const username of usernames) {
    test(`Valid Login Test with ${username} `, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(username);
        await page.locator('[data-test="password"]').fill('secret_sauce');
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    });
}

test('Parameterize Project', async ({ page, username }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(username);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
})

test('Using Environment Variable', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(process.env.USERNAME);
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
})

users.forEach((user, index) => {
    test(`Valid Login - Iteration: ${index + 1}`, async ({ page }) => {
        await page.goto('https://www.saucedemo.com/');
        await page.locator('[data-test="username"]').fill(users[index].username);
        await page.locator('[data-test="password"]').fill(users[index].password);
        await page.locator('[data-test="login-button"]').click();
        await expect(page.locator('[data-test="title"]')).toBeVisible();
        await expect(page.locator('[data-test="title"]')).toContainText('Products');
    })
})


test.only('Reading data from json ', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill(users[1].username);
    await page.locator('[data-test="password"]').fill(users[1].password);
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="title"]')).toBeVisible();
    await expect(page.locator('[data-test="title"]')).toContainText('Products');
})