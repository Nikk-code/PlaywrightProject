Feature: Ecommerce2 validation
    @Validation
    @foo
    Scenario Outline: Placing the order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is dispalyed
        Examples:
            | username    | password          |
            | rahulshetty | Learning@830$3mK2 |
            | hello@123   | himay567          |

