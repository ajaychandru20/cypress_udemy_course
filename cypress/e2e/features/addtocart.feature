Feature: Add the Products into Cart

    # @Cart
    # Scenario: As a customer need to add the products into the cart
    #     Given visit the electronics portal
    #     Then add the products in the cart
    #     Then assert the products that we added

    @Cart
    Scenario: As a customer need to add the ECOM products into the cart using API Token
        Given visit the ecom portal
        Then add the product to the Cart
        Then assert the products that we added in the cart