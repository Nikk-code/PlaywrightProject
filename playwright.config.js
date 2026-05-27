// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { trace } from 'console';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  retries: 2,
  timeout: 30 * 1000, // This is for overall test timeout if it stucks somewhere will wait till this time  // By default it's 30 sec /* Run tests in files in parallel */
  expect: {
    timeout: 5000,   //it will wait till max 5 seconds 
  },
  reporter: 'html',
  use: {

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    browserName: 'chromium',
    headless: true,
    screenshot: 'on',
    trace: 'on'

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ]
});

module.exports = config

