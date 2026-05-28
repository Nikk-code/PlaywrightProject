// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const { test, expect, request } = require('@playwright/test');
const { APIUtils } = require('../Utils/APIUtils.js');

const loginPayload = { userEmail: "johndoe123477@gmail.com", userPassword: "John@1234" }
const orderPayload = { orders: [{ country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68" }] }

let response;


test.beforeAll(async () => {
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});



test('@API Place the order', async ({ page }) => {

    await page.addInitScript(value => {
        window.localStorage.setItem('token', value);

    }, response.token)

    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (response.orderID.includes(rowOrderID)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    // await page.pause()
    expect(response.orderID.includes(orderIdDetails)).toBeTruthy();

});