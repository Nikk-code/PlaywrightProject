// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const { test, expect } = require('@playwright/test');





test('Security test request intercept', async ({ page }) => {

    // login and reach orders page
    const email = "johndoe123477@gmail.com"
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("John@1234");
    await page.locator("[value='Login']").click();
    await page.locator(".card-body b").first().waitFor();
    await page.locator("button[routerlink*='myorders']").click();

    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*", route => route.continue({ url: 'https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a0f12d817ee3e78ba8ec2ab' }));

    await page.locator("button:has-text('view')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");
    await page.pause()




});