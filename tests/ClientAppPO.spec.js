// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const { test, expect } = require('@playwright/test');
const { title, execPath } = require('process');
const { text } = require('stream/consumers');
const { POManager } = require('../pageobjects/POManager');


test('Client App Login', async ({ page }) => {
    //js file-Login.js, DashboardPage
    const poManager = new POManager(page);

    const username = "johndoe123477@gmail.com";
    const password = "John@1234";
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");

    const loginPage = poManager.getLoginPage(page);

    await loginPage.goTo();
    await loginPage.validLogin(username, password);

    const dashboardPage = poManager.getDashboardPage(page);

    await dashboardPage.searchProducAddCart(productName);
    await dashboardPage.navigateToCart();

    // await page.waitForLoadState('networkidle');  // sometimes it's flaky if it's not working we can use below step
    const cartPage = poManager.getCartPage(page);

    const bool = await cartPage.verifyProductIsDisplayed(productName);
    expect(bool).toBeTruthy();
    await cartPage.Checkout();




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