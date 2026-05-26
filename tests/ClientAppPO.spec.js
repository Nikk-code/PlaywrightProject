// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const { test, expect } = require('@playwright/test');
const { title, execPath } = require('process');
const { text } = require('stream/consumers');
const { POManager } = require('../pageobjects/POManager');
//Json->string-> js object
const dataset = JSON.parse(JSON.stringify(require("./utils/placeorderTestData.json")));

for (const data of dataset) {
    test(`Client App Login for ${data.productName}`, async ({ page }) => {
        //js file-Login.js, DashboardPage
        const poManager = new POManager(page);

        const products = page.locator(".card-body");

        const loginPage = poManager.getLoginPage(page);

        await loginPage.goTo();
        await loginPage.validLogin(data.username, data.password);

        const dashboardPage = poManager.getDashboardPage(page);

        await dashboardPage.searchProducAddCart(data.productName);
        await dashboardPage.navigateToCart();

        // await page.waitForLoadState('networkidle');  // sometimes it's flaky if it's not working we can use below step
        const cartPage = poManager.getCartPage(page);

        await cartPage.VerifyProductIsDisplayed(data.productName);
        await cartPage.Checkout();

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await ordersReviewPage.searchCountryAndSelect("ind", "India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();

    });
}