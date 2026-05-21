//Login UI --> .json

//test browser --> .json, cart-,order, orderdetails,orderhistory


const {test, expect} = require('@playwright/test');


let webContext;
test.beforeAll(async({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("johndoe123477@gmail.com");
    await page.locator("#userPassword").fill("John@1234");
    await page.locator("[value='Login']").click();
    // await page.waitForLoadState('networkidle');  // sometimes it's flaky if it's not working we can use below step
    await page.locator(".card-body b").first().waitFor();
    await context.storageState({path: 'state.json'});
    // Invoke Browser by passing json file
    webContext = await browser.newContext({storageState: 'state.json'});

})


test('Client App Login', async ()=>
{
    const email = "johndoe123477@gmail.com";
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
    const count = await products.count();
    for(let i = 0; i < count; ++i){

        if(await products.nth(i).locator("b").textContent() === productName)
        {   
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
    for(let i=0; i<optionsCount; ++i){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    await expect(page.locator(".user__name [type='text']").first()).toHaveText(email);
    await page.locator(".action__submit").click();
    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderID = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderID);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

    for(let i = 0; i<await rows.count(); ++i){
        const rowOrderID = await rows.nth(i).locator("th").textContent();
        if (orderID.includes(rowOrderID)){
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
const orderIdDetails = await page.locator(".col-text").textContent();
expect(orderID.includes(orderIdDetails)).toBeTruthy();

});

test('Test case 2', async ()=>
{
    const email = "johndoe123477@gmail.com";
    const productName = 'ZARA COAT 3';
    const page = await webContext.newPage();
    await page.goto("https://rahulshettyacademy.com/client");
    const products = page.locator(".card-body");
    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);
})