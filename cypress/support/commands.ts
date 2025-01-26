
/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

Cypress.Commands.add('addIngredient', (name: string) => {
  const dataTransfer = new DataTransfer();

  cy.wait(1000);

  // Поиск и вывод перетаскиваемого элемента
  cy.get('[data-testid="ingredient-item"]')
    .contains(name)
    .then((ingredient) => {
      console.log('Ингредиент, который будет перетащен:', ingredient[0]);
    })
    .trigger('dragstart', { dataTransfer });

  cy.wait(1000);

  // Показ целевого элемента перед помещением
  cy.get('[data-testid="constructor-drop-target"]').then((target) => {
    console.log('Целевой элемент перед помещением ингредиента:', target[0]);
  });

  cy.get('[data-testid="constructor-drop-target"]')
    .trigger('drop', { dataTransfer });

  cy.wait(1000);

  // Вызов dragend после завершения
  cy.get('[data-testid="constructor-drop-target"]')
    .trigger('dragend')
    .then((target) => {
      console.log('Целевой элемент после помещения ингредиента:', target[0]);
    });
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }
