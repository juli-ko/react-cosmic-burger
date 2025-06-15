/// <reference types="cypress" />
import type {} from "./cypress";

Cypress.Commands.add('closeModal', () => {
	cy.get('[data-testid="modal-close-button"]').click();
});

Cypress.Commands.add('mockOrderResponse', () => {
	cy.intercept('POST', 'api/orders', {
		statusCode: 200,
		body: { success: true, name: 'Order 123', order: { number: 12345 } },
	}).as('getOrder');
	cy.wait('@getOrder', { timeout: 20000 });
});

Cypress.Commands.add('mockAuthAndIngredientResponse', () => {
	window.localStorage.clear();
	window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));

	cy.intercept('GET', 'api/ingredients', {
		fixture: 'ingredients.json'
	}).as('getIngredients');

	cy.intercept('GET', 'api/auth/user', {
		fixture: 'user.json',
	}).as('getUser');

	cy.visit('/');
	cy.wait('@getUser')
	cy.wait('@getIngredients');
});