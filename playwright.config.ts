import { defineConfig, devices } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */

export const STORAGE_STATE = 'auth/user.json'
export default defineConfig({
  testDir: './tests',
  timeout: 20000,
  expect: {
    timeout: 5000,
  },

  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html'], ['allure-playwright']],
  // reporter: [['html'], ['json', { outputFile: 'results.json' }]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    //Used for API Testing
    // baseURL: 'https://restful-booker.herokuapp.com',
    baseURL: 'https://apollo-fullstack-tutorial.herokuapp.com/graphql',
    // baseURL: 'https://apollo-fullstack-tutorial.herokuapp.com',



    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retry-with-video',

    headless: false,


    // viewport: { width: 1000, height: 800 }
  },

  // grep: [new RegExp("@Smoke|@Sanity")], 
  // grepInvert: [new RegExp("@Smoke|@Sanity")],
  /* Configure projects for major browsers */
  projects: [

    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      }
    },
    //Configured for storagestate authentication
    // {
    //   name: 'setup',
    //   testMatch: '**/*.setup.ts'
    // },
    // {
    //   name: 'Reg-Login',
    //   testMatch: '**/*loggedin.spec.ts',
    //   dependencies: ['setup'],
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   }
    // },
    // {
    //   name: 'Search Item',
    //   testMatch: ['**/*searchItem.spec.ts'],
    //   dependencies: ['Reg-Login'],
    //   teardown: 'Reg-Logout',
    //   use: {
    //     ...devices['Desktop Chrome'],
    //     storageState: STORAGE_STATE
    //   }
    // },
    // {
    //   name: 'Reg-Logout',
    //   testMatch: '**/*demoBlaze_logout.spec.ts',
    //   use: {
    //     storageState: STORAGE_STATE
    //   }
    // }

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
