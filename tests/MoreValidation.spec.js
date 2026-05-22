const { test, expect } = require('@playwright/test')

test("Pop-up Validation", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://www.google.com/");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    // await page.pause();
    // Why it's first
    //In Playwright, you should always set up the dialog listener before triggering the action.
    await page.on('dialog', dialog => dialog.accept());
    // Handle dialog
    // await page.on('dialog',dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

    await page.locator("#mousehover").hover();
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href='lifetime-access']:visible").click(); //It will focus on visible elements
    const textCheck = await framesPage.locator(".text h2").textContent();
    console.log(textCheck.split(" ")[1]);

});

test("Screensot & Visual comparision", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator('#displayed-text')).toBeVisible();
    // It will take screenshot of locator level
    await page.locator("#displayed-text").screenshot({ path: 'Screenshot/partialScreenshot.png' })
    await page.locator("#hide-textbox").click();
    // It will take screenshot page level
    await page.screenshot({ path: 'Screenshot/partialScreenshot.png' });
    await expect(page.locator("#displayed-text")).toBeHidden();

});

// Below test will fail because it's changing so if we use google it will not 
// visuals will check pixels by pixels 
test.only("visual", async ({ page }) => {
    await page.goto("https://www.flightaware.com/live/");
    expect(await page.screenshot()).toMatchSnapshot('landing.png');

})