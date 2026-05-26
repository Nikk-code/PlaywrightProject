const base = require('@playwright/test');

exports.customtest = base.test.extend({
    testDataForOrder: {
        username: "johndoe123477@gmail.com",
        password: "John@1234",
        productName: "ZARA COAT 3"
    }
})