const { defineConfig } = require('@playwright/test');
const { createAzurePlaywrightConfig, ServiceOS } = require('@azure/playwright');
const { DefaultAzureCredential } = require('@azure/identity');
const config = require('./playwright.config');

/* Learn more about service configuration at https://aka.ms/pww/docs/config */
module.exports = defineConfig(
  config,
  createAzurePlaywrightConfig(config, {
    exposeNetwork: '<loopback>',
    connectTimeout: 3 * 60 * 1000, // 3 minutes
    retries: 2, // Add retries for CI environment
    timeout: 30000, // Increase from default 30s
    os: ServiceOS.LINUX,
    credential: new DefaultAzureCredential(),
  }),
  {
    /*
    Enable Playwright Workspaces Reporter:
    Uncomment the reporter section below to upload test results and reports to Playwright Workspaces.

    Note: The HTML reporter must be included before Playwright Workspaces Reporter.
    This configuration will replace any existing reporter settings from your base config.
    If you're already using other reporters, add them to this array.
    */
    reporter: [
      ["html", { open: "never" }],
      ["@azure/playwright/reporter"],
    ],
  }
);
