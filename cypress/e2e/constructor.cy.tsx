/// <reference types="cypress" />

describe('Burger constructor', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('main page visible', () => {
    cy.contains('Соберите бургер').should('be.visible');
  });

  it('add ing', () => {
    cy.get('[data-cy=constructor]').as('constructor');
    cy.get('@constructor')
      .find('[data-cy=constructor-item]')
      .should('have.length', 0);

    cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X').as('sauceCard');
    cy.get('@sauceCard').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.get('@constructor')
      .find('[data-cy=constructor-item]')
      .should('have.length', 1);

    cy.get('@constructor').contains('Соус Spicy-X').should('be.visible');
  });
});

describe('Modal', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('additional info visible', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i').click();

    cy.get('[data-cy=modal]')
      .should('be.visible')
      .and('contain', 'Информация о начинке')
      .and('contain', 'Краторная булка N-200i');
  });

  it('close by button', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i').click();
    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('close by overlay', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i').click();
    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('[data-cy=modal-overlay]').click({ force: true });
    cy.get('[data-cy=modal]').should('not.exist');
  });

  it('close by esc', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i').click();
    cy.get('[data-cy=modal]').should('be.visible');

    cy.get('body').type('{esc}');
    cy.get('[data-cy=modal]').should('not.exist');
  });
});

describe('Make Order', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      fixture: 'order.json'
    }).as('makeOrder');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
        win.document.cookie = 'accessToken=test-access-token; path=/';
      }
    });

    cy.wait(['@getIngredients', '@getUser']);
  });

  afterEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
  });

  it('make burger and order', () => {
    cy.contains('[data-cy=ingredient-card]', 'Краторная булка N-200i').within(
      () => {
        cy.contains('Добавить').click();
      }
    );

    cy.contains('[data-cy=ingredient-card]', 'Соус Spicy-X').within(() => {
      cy.contains('button', 'Добавить').click();
    });

    cy.get('[data-cy=constructor]')
      .find('[data-cy=constructor-item]')
      .should('have.length.at.least', 1);

    cy.contains('button', 'Оформить заказ').click();

    cy.wait('@makeOrder');

    cy.get('[data-cy=modal]').should('be.visible');

    cy.fixture('order.json').then((order) => {
      cy.get('[data-cy=order-number]')
        .should('be.visible')
        .and('contain', order.order.number);
    });

    cy.get('[data-cy=modal-close]').click();
    cy.get('[data-cy=modal]').should('not.exist');

    cy.get('[data-cy=constructor]')
      .find('[data-cy=constructor-item]')
      .should('have.length', 0);

    cy.contains('Выберите булки').should('be.visible');
    cy.contains('Выберите начинку').should('be.visible');
  });
});
