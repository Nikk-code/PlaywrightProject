class CartPage {

    constructor(page) {

        this.page = page;
        this.cartProducts = page.locator("div li");
        this.productText = page.locator("h3:has-text('ZARA COAT 3')");
        this.checkoutButton = page.locator("text=Checkout");
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
    }

    async verifyProductIsDisplayed(productName) {

        await this.cartProducts.first().waitFor();
        const bool = await this.page.locator(`h3:has-text('${productName}')`).isVisible();
        return bool;
    }

    async Checkout() {

        await this.checkoutButton.click();
        await this.country.pressSequentially("ind");
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for (let i = 0; i < optionsCount; ++i) {
            const text = await this.dropdown.locator("button").nth(i).textContent();
            if (text === " India") {
                await this.dropdown.locator("button").nth(i).click();
                break;
            }
        }
    }
}

module.exports = { CartPage };