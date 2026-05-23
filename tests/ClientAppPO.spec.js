// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const { test, expect } = require('@playwright/test');
const { title, execPath } = require('process');
const { text } = require('stream/consumers');
const { LoginPage } = require('../pageobjects/LoginPage');

test('Client App Login', async ({ page }) => {
    //js file-Login.js, DashboardPage
    const username = "johndoe123477@gmail.com";
    const password = "John@1234";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    const loginPage = new LoginPage(page);
    loginPage.goTo();
    loginPage.validLogin(username, password);



    // await page.waitForLoadState('networkidle');  // sometimes it's flaky if it's not working we can use below step
    await page.locator(".card-body b").first().waitFor();
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for (let i = 0; i < count; ++i) {

        if (await products.nth(i).locator("b").textContent() === productName) {
            // add to cart
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }
    await page.locator("[routerlink*='cart']").click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('Zara Coat 3')").isVisible()
    expect(bool).toBeTruthy();
    await page.locator("text=Checkout").click();
    await page.locator("[placeholder*='Country']").pressSequentially("ind");
    const dropdown = page.locator(".ta-results");
    await dropdown.waitFor();

    const optionsCount = await dropdown.locator("button").count();
    for (let i = 0; i < optionsCount; ++i) {
        const text = await dropdown.locator("button").nth(i).textContent();
        if (text === " India") {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(username);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderID.includes(orderIdDetails)).toBeTruthy();





});