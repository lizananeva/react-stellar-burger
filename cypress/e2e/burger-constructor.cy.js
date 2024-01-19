const testUrl = 'http://localhost:3000/';
const ingredientsContainer ='[class^=burger-ingredients_container]';
const constructorContainer = '[class^=ingredients-list_container]';
const ingredients = '[class^=cards-group_list]';
const ingredient = '[class^=card_card]';
const loginForm = '[class^=login_content]';
const modal = '[class^=modal_modal]';
const close = '[class^=modal_close]';
const orderDetails = '[class^=order-details_content]';

describe('Burger constructor test', () => {
  it('Test functional of burger-constructor page', () => {
    cy.visit(testUrl);
    cy.reload(true);

    cy.get('button').contains('Оформить заказ').as('orderButton').should('exist');
    cy.get('@orderButton').should('be.disabled');

    cy.get(ingredientsContainer).should('exist');
    cy.get(constructorContainer).should('exist').as('constructor');
    cy.get(ingredients).should('exist');
    cy.get(ingredient).should('exist');

    cy.contains('булка').should('exist').as('bun').find(ingredient).should('exist');
    cy.contains('Соус ').should('exist').as('sauce').find(ingredient).should('exist');
    cy.contains('Биокотлета').should('exist').as('main').find(ingredient).should('exist');

    cy.get('@bun').trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').contains('булка').should('exist');

    cy.get('@sauce').scrollIntoView().trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').contains('Соус ').should('exist');

    cy.get('@main').scrollIntoView().trigger('dragstart');
    cy.get('@constructor').trigger('drop');
    cy.get('@constructor').contains('Биокотлета').should('exist');

    cy.get('@orderButton').should('be.enabled');
    cy.get('@orderButton').click();
    cy.location().should(location => expect(location.pathname).to.eq('/login'));

    cy.get(loginForm).should('exist');
    cy.get('input').first().should('exist').type('test-mail@some-name.com');
    cy.get('input').last().should('exist').type('qazqaz');
    cy.get('button').contains('Войти').as('loginButton').should('exist');
    cy.get('@loginButton').click();
    cy.location().should(location => expect(location.pathname).to.eq('/'));

    cy.get('@orderButton').should('exist');
    cy.get('@orderButton').click();

    cy.wait(20000);
    cy.get(modal).should('exist');
    cy.get(close).should('exist');
    cy.get(orderDetails).should('exist');
    cy.get(close).click();
    cy.get(orderDetails).should('not.exist');

    cy.get('button').contains('Оформить заказ').as('orderButton').should('exist');
    cy.get('@orderButton').should('be.disabled');
  })
})

describe('Modal test', () => {
  it('Test functional of ingredient details modal', () => {
    cy.visit(testUrl);
    cy.reload(true);
    cy.get(ingredientsContainer).should('exist');
    cy.get(ingredients).should('exist');
    cy.get(ingredient).contains('Краторная булка N-200i').as('bun').should('exist');
    cy.get('@bun').click();
    cy.get(modal).should('exist');
    cy.get('h2').contains('Детали ингредиента').should('exist');
    cy.get('h3').contains('Краторная булка N-200i').should('exist');
    cy.get(close).should('exist');
    cy.get(close).click();
    cy.get(modal).should('not.exist');
  })
})
