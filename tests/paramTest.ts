import { test as base } from '@playwright/test'

export type TestOptions = {
    username: string
}

export const test = base.extend<TestOptions>({
    username: ['standard_user', { option: true }]
})