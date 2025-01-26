const GROUP_SELECTOR = '[data-testid="ingredient-group"]';
const MODAL_SELECTOR = '[data-testid="modal"]';
const MODAL_CLOSE_SELECTOR = '[data-testid="modal-close"]';
const CONSTRUCTOR_DROP_TARGET_SELECTOR = '[data-testid="constructor-drop-target"]';
const ORDER_NUMBER_SELECTOR = '[data-testid=order-number]';

beforeEach(() => {
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as('checkUserAuth');
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');

  window.localStorage.setItem('refreshToken', JSON.stringify('test-refreshToken'));
  window.localStorage.setItem('accessToken', JSON.stringify('test-accessToken'));

  cy.visit('/');
});

afterEach(() => {
  window.localStorage.removeItem('refreshToken');
  window.localStorage.removeItem('accessToken');
});

describe('сведения об ингредиентах в модальном окне', () => {
  beforeEach(() => {
    cy.get(GROUP_SELECTOR).as('group');
  });

  it('модальное окно должно открываться и закрываться правильно', () => {
    cy.get('@group').contains('Краторная булка N-200i').should('exist').click();
    cy.get(MODAL_SELECTOR).should('exist');
    cy.get(MODAL_CLOSE_SELECTOR).should('exist').click();
    cy.get(MODAL_SELECTOR).should('not.exist');
  });

  it('URL и содержимое модального окна должны быть правильными', () => {
    cy.get('@group').contains('Краторная булка N-200i').should('exist').click();
    cy.url().should('contain', 'ingredients/643d69a5c3f7b9001cfa093c');
    cy.get(MODAL_SELECTOR).should('contain.text', 'Детали ингредиента').and('contain.text', 'Краторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53');
  });
});

describe('добавление ингредиента в конструктор', () => {
  it('добавление ингредиента работает правильно', () => {
    cy.addIngredient('Соус Spicy-X');

    cy.get(CONSTRUCTOR_DROP_TARGET_SELECTOR)
      .contains('Соус Spicy-X')
      .should('exist');
  });
});

describe('создание заказа', () => {
  before(() => {
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('sendOrder');
  });

  it('создание заказа работает корректно', () => {
    cy.addIngredient('Краторная булка N-200i');
    cy.addIngredient('Соус традиционный галактический');
    cy.addIngredient('Мясо бессмертных моллюсков Protostomia');
    cy.addIngredient('Плоды Фалленианского дерева');
    cy.addIngredient('Хрустящие минеральные кольца');
    cy.addIngredient('Хрустящие минеральные кольца');
    cy.addIngredient('Хрустящие минеральные кольца');

    cy.get('button').contains('Оформить заказ').click();
    cy.get(ORDER_NUMBER_SELECTOR).contains('34536').should('exist');
  });
});
