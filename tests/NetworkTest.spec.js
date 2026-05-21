// johndoe123477@gmail.com
// john
// doe
// 4423490010
// John@1234

const {test, expect, request} = require('@playwright/test');
const{APIUtils} = require('./Utils/APIUtils.js');

const loginPayload = {userEmail: "johndoe123477@gmail.com", userPassword: "John@1234"}
const orderPayload = {orders: [{country: "Cuba", productOrderedId: "6960eac0c941646b7a8b3e68"}]}
const fakePayLoadOrders = {data:[],message:"No Orders"};

let response;


test.beforeAll( async ()=>
{
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext,loginPayload);
    response = await apiUtils.createOrder(orderPayload);
});



test('Place the order', async ({page})=>
{  
  
    await page.addInitScript(value => {
        window.localStorage.setItem('token',value);

    },response.token)
    
    await page.goto("https://rahulshettyacademy.com/client");
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/69d6292bf86ba51a655217ff",route=>
    {
        const response = page.request.fetch(route.request());
        let body = fakePayLoadOrders; 
        route.fulfill(
            {
                response,
                body,
            }
        )
        //Intercepting response - API response->{playwright fakeresponse}->browser->render data on front end
    })
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");

   

});