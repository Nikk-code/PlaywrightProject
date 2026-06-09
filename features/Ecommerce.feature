Feature: Ecommerce validation
    @Regression
    Scenario: Placing the order
        Given a login to Ecommerce application with "johndoe123477@gmail.com" and "John@1234"
        When Add "ZARA COAT 3" to cart
        Then Verify "ZARA COAT 3" is displayed in the cart
        When Enter valid details and Place the Order
        Then Verify order in present in the OrderHistory

    @Validation
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is dispalyed
        Examples:
            | username    | password          |
            | rahulshetty | Learning@830$3mK2 |
            | hello@123   | himay567          |