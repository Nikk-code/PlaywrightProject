const { POManager } = require('../../pageobjects/POManager');
const playwright = require('@playwright/test');
const { Before, After, BeforeStep, AfterStep, Status } = require('@cucumber/cucumber')

Before(async function () {
    this.browser = await playwright.chromium.launch({ headless: false });
    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
    this.poManager = new POManager(this.page);
});


BeforeStep(function () {
    // This hook will be executed before all steps in a scenario with tag @foo
});


AfterStep(async function ({ result }) {
    // This hook will be executed before all steps in a scenario with tag @foo
    if (result.status === Status.FAILED) {
        await this.page.screenshot({ path: 'screenshot1.png' });
    }
});


After(async function () {
    if (this.browser) {
        await this.browser.close();
    }
    console.log("I am last to Execute")
});