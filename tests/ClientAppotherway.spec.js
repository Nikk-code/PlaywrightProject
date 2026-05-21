// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const {test, expect} = require('@playwright/test');
const { title, execPath } = require('process');
const { text } = require('stream/consumers');


test('Client App Login', async ({page})=>
{
    const email = "johndoe123477@gmail.com"
    const productName = 'ZARA COAT 3';
    const products = page.locator(".card-body");
    await page.goto("https://rahulshettyacademy.com/client");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("John@1234");

    await page.getByRole('button', {name: "Login"}).click();

    // await page.waitForLoadState('networkidle');  // sometimes it's flaky if it's not working we can use below step
    await page.locator(".card-body b").first().waitFor();


    await page.locator(".card-body").filter({hasText: productName}).getByRole("button", {name: " Add To Cart"}).click();
    await page.getByRole("listitem").getByRole('button', {name:"Cart"}).click();
    await page.locator("div li").first().waitFor();

    await expect(page.getByText(productName)).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();

    await page.getByText("PLACE ORDER").click();

    await expect(page.getByText(" Thankyou for the order. ")).toBeVisible();


});