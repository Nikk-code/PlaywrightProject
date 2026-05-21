// **************Notes ******************
// const {test} = require('@playwright/test');

// test('First Playwrite test', async()=>  // this is same as test('First Playwright test', async function (){}) 

// {
//     //playwright code-
//     //step1 - open browser
//     //step2 - enter u/p 2seconds


//     //step3 - click


// });

// Method in which we use browser fixtures withoiut that also we can create
const {test, expect} = require('@playwright/test');
const { text } = require('stream/consumers');


test('Browser Context Playwrite test', async ({browser})=>
{
    //chrome - plugins/ cookies
    const context = await browser.newContext();
    const page = await context.newPage();

    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());
    //css
    await page.locator("#username").fill("rahulshetty");
    await page.locator("[type='password']").fill("Learning@830$3mK2");
    await page.locator("#signInBtn").click();
    console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText('Incorrect');
    // type - fill
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signIn.click();
    console.log(await cardTitles.first().textContent());
    console.log(await cardTitles.nth(0).textContent());
    // console.log(await page.locator(".card-body a").nth(1).textContent()); // It will return 2nd element
    console.log(await cardTitles.last().textContent());
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);


});

// second example
// Method in which we use Page fixtures without that also we can create

test('UI Controls', async ({page})=>
{
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator('#username');
    const signIn = page.locator('#signInBtn');
    const documentLink = page.locator("[href*='documents-request']");
    const dropdown = page.locator("select.form-control");
    // select dropdown
    await dropdown.selectOption("Consultant");
    // select radio button
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    console.log(await page.locator(".radiotextsty").last().isChecked());  // another assertion it will return boolean
    await expect(page.locator(".radiotextsty").last()).toBeChecked();  // assertion
    await page.locator("#terms").click();
    await expect(page.locator("#terms")).toBeChecked();
    await page.locator("#terms").uncheck();
    expect(await page.locator("#terms").isChecked()).toBeFalsy();
    await expect(documentLink).toHaveAttribute("class","blinkingText");

});


test('Child windows hadl', async ({browser})=>
{
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username');
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");    
    const documentLink = page.locator("[href*='documents-request']");
    const [newPage] = await Promise.all(
    [
    context.waitForEvent('page'), // listen for any new page  // pending,rejected,fulfilled
    documentLink.click(), // new page is opened
    ])
 
    const text = await newPage.locator(".red").textContent();
    const arrayText = text.split("@")
    const domain = arrayText[1].split(" ")[0]
    console.log(domain);
    await page.locator("#username").fill(domain);

    console.log(await page.locator("#username").textContent());
    // textContenet will return text only when it's attached to the DOM 
    //After DOM open if you want to grab that value use below method
    console.log(await page.locator("#username").inputValue());
    




})