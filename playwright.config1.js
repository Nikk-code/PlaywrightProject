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
  retries: 1,
  workers: 3,  // It will run 3 test files paralally
  // This will run test in serial and parallel mode
  /*Maximum time one test can run for */
  timeout: 30 * 1000, // This is for overall test timeout if it stucks somewhere will wait till this time  // By default it's 30 sec /* Run tests in files in parallel */
  expect: {
    timeout: 5000,   //it will wait till max 5 seconds 
  },
  reporter: 'html',
  use: {

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */

    browserName: 'webkit',
    headless: true,
    screenshot: 'on',
    trace: 'on'


  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'safari',
      use: {
        browserName: 'webkit',
        headless: false,
        screenshot: 'off',
        trace: 'on', //off,on
        ...devices['iphone 11'],
      }
    },

    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        screenshot: 'on',
        ignoreHttpsErrors: true,
        permissions: ['geolocation'],
        trace: 'on', //off,on
        // video: 'retain-on-failure',
        video: 'on'
        // viewport: { width: 720, height: 720 }
      }
    }
  ],


});

module.exports = config

// to execute this file we have to give it in command line 
// npx playwright test tests / ClientAppPo.spec.js --config playwright.config1.js --project=safari