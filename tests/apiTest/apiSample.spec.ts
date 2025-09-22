import { test, expect } from '@playwright/test'
import booking from '../../testData/booking.json'

test.describe('API Testing - Basic CRUD', () => {
    let token: string
    test('Get List of bookings', async ({ request }) => {
        const response = await request.get('/booking')

        expect(response.status()).toBe(200)
        //status, header, body
        const headers = response.headers()
        expect(headers['content-type']).toBe('application/json; charset=utf-8')
        console.log(await response.json())

    })
    test('Get booking details', async ({ request }) => {
        const response = await request.get('/booking/787')
        console.log(response.status())
        console.log(response.statusText())
        expect(response.status()).toBe(200)
        console.log(await response.json())
        const respBody = await response.json()
        expect(respBody.firstname).toBe('John')
    })

    test('Create a new booking', async ({ request }) => {
        const response = await request.post('/booking', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: booking
        })
        console.log(response.status(), ' with Status Text', response.statusText())
        const resBody = await response.json()
        console.log('JSON Body....', resBody)
        expect(response.status()).toBe(200)
        expect(resBody.booking).toHaveProperty('firstname', 'Anandhi')
        expect(resBody.booking.bookingdates).toHaveProperty('checkin', '2025-01-01')
    })
    test('Generate Token', async ({ request }) => {
        const response = await request.post('/auth', {
            headers: {
                'Content-Type': 'application/json'
            },
            data: {
                "username": "admin",
                "password": "password123"
            }
        })
        const resBody = await response.json()
        token = resBody.token
        console.log(token)
    })

    test('To update booking', async ({ request }) => {
        const response = await request.put('/booking/787', {
            headers: {
                'Content-Type': 'application/json',
                'Cookie': '2efdcb0bc152872'
            },
            data: booking
        })
        console.log(response.status(), ' with Status Text', response.statusText())
        const resBody = await response.json()
        console.log('JSON Body....', resBody)
        expect(response.status()).toBe(200)
        expect(resBody.booking).toHaveProperty('firstname', 'Anandhi')

    })
    test('To delete an user', async ({ request }) => {
        const response = await request.delete('https://reqres.in/api/user/2', {
            headers: {
                'x-api-key': 'reqres-free-v1'
            }
        })
        expect(response.status()).toBe(204)

    })

    test('Mock API', async ({ page }) => {
        await page.route('https://conduit-realworld-example-app.fly.dev/api/tags', async route => {
            const json = {
                'tags': ["Playwright Mock"]
            }
            await route.fulfill({ json })
        })
        await page.goto('https://conduit-realworld-example-app.fly.dev/')
        await expect(page.getByRole('button', { name: 'Playwright Mock' })).toBeVisible({ timeout: 20000 })
        await page.waitForTimeout(5000)
    })
    test.only('Mock API by appending', async ({ page }) => {
        await page.route('https://conduit-realworld-example-app.fly.dev/api/tags', async route => {
            const response = await route.fetch()
            const json = await response.json()
            console.log(json)
            json.tags.unshift("Playwright Mock")
            await route.fulfill({ response, json })
        })
        await page.goto('https://conduit-realworld-example-app.fly.dev/')
        await expect(page.getByRole('button', { name: 'Playwright Mock' })).toBeVisible({ timeout: 20000 })
        await page.waitForTimeout(5000)
    })
})