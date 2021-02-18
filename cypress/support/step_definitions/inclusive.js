/* global Given, When, Then */
const url = 'https://gocity.com/boston/en-us/products/all-inclusive';

Given('I open gocity page', () => {
    cy.visit(url, {
        onBeforeLoad: (win) => {
            win.onerror = null
          }
    });
});
When('I choose all inclusive pass and checkout', () => {
    cy.get('.lc-cart__item:nth-child(3) .lc-cart__item-amount .lc-cart__item-amount-plus').scrollIntoView()
    cy.get(".slide-in .slide-in--actions--close").click()
    cy.wait(1000)
    cy.get('.lc-cart__item:nth-child(3) .lc-cart__item-amount .lc-cart__item-amount-plus', { timeout: 10000 }).should('not.be.disabled');
    cy.get('.lc-cart__item:nth-child(3) .lc-cart__item-amount .lc-cart__item-amount-plus').click();  // Plus sign 
    cy.get('.lc-cart__purchase').click() // click purchase / add to cart
    // cy.wait(2000)
    cy.get("[readonly='readonly']").click({ multiple: true });
    cy.get("#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(7) > a").click()  // select payment date
    cy.get(".block-region-first [data-testid='continueToPayment']").click();
    cy.get("#checkout-form-email[placeholder='Email*']", { timeout: 10000 }).should('be.visible');
    cy.get("#checkout-form-email[placeholder='Email*']").type('cypresscucumber@gmail.com');
   
    cy.get("[name='braintree-hosted-field-number']").then(($element) => {
        const $body = $element.contents().find("body");
        let creditCard = cy.wrap($body);
        creditCard
            .find('#credit-card-number')
            .click()
            .type('4242424242424242');
    });
    
    cy.get("[name='braintree-hosted-field-expirationMonth']").then(($element) => {
        const $body = $element.contents().find("body");

        let expirationMonth = cy.wrap($body);
        expirationMonth
            .find('#expiration-month')
            .click()
            .type('12');
    });
    
    cy.get("[name='braintree-hosted-field-expirationYear']").then(($element) => {
        const $body = $element.contents().find("body");

        let expirationYear = cy.wrap($body);
        expirationYear
            .find('#expiration-year')
            .click()
            .type('2025');
    });
    
    cy.get("[name='braintree-hosted-field-cvv']").then(($element) => {
        const $body = $element.contents().find("body");

        let cvv = cy.wrap($body);
        cvv
            .find('#cvv')
            .click()
            .type('123');
    });

});

Then('I see the checkout page', () => {
    cy.get("#checkout-form-first-name").type('Tony');
    cy.get("#checkout-form-last-name").type('johnson');
    cy.get("#checkout-form-phone-number").type('12345756822');
    cy.get("#checkout-form-address").type('2128  Cambridge Place ');
    cy.get('#checkout-form-terms').click()
    cy.location().should((loc) => {
        expect(loc.pathname).to.eq('/boston/en-us/products/all-inclusive/checkout/payment')
    });
    cy.get(".block-region-first [data-react-component='CommerceCheckoutConfirmationSegue'] [data-testid='confirmOrderAndPay']", { timeout: 10000 }).should('be.visible');
});
// UJ-2 

When('I choose a single package and checkout', () => {
    cy.get('.lpg-attractions-card__premium-tile--content').scrollIntoView()
    cy.get(".slide-in .slide-in--actions--close").click()
    cy.visit('https://gocity.com/boston/en-us/products/all-inclusive/attractions/boston-duck-tour') 
    cy.get('.products-purchase-cta .passproduct-cta').click() // click purchase / add to cart
    cy.wait(1000)
    cy.get("[data-index='0'] .lc-products-list__item .lc-font__regular.lc-products-list__item-select").click();
    cy.wait(1000)
    cy.get(".lc-cart__loader .lc-cart__purchase").click()  
    cy.wait(2000)
    cy.get("[readonly='readonly']").click({ multiple: true });
    cy.get("#ui-datepicker-div > table > tbody > tr:nth-child(4) > td:nth-child(7) > a").click()  // select payment date
    cy.get(".block-region-first [data-testid='continueToPayment']").click();
    cy.get("#checkout-form-email[placeholder='Email*']", { timeout: 10000 }).should('be.visible');
    cy.get("#checkout-form-email[placeholder='Email*']").type('cypresscucumber@gmail.com');
    cy.get("[name='braintree-hosted-field-number']").then(($element) => {
        const $body = $element.contents().find("body");
        let creditCard = cy.wrap($body);
        creditCard
            .find('#credit-card-number')
            .click()
            .type('4242424242424242');
    });
    
    cy.get("[name='braintree-hosted-field-expirationMonth']").then(($element) => {
        const $body = $element.contents().find("body");

        let expirationMonth = cy.wrap($body);
        expirationMonth
            .find('#expiration-month')
            .click()
            .type('12');
    });
    
    cy.get("[name='braintree-hosted-field-expirationYear']").then(($element) => {
        const $body = $element.contents().find("body");

        let expirationYear = cy.wrap($body);
        expirationYear
            .find('#expiration-year')
            .click()
            .type('2025');
    });
    
    cy.get("[name='braintree-hosted-field-cvv']").then(($element) => {
        const $body = $element.contents().find("body");

        let cvv = cy.wrap($body);
        cvv
            .find('#cvv')
            .click()
            .type('123');
    });

});