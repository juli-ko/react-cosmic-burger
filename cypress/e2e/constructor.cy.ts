/// <reference types="cypress" />

const SELECTORS = {
  INGREDIENT_ITEM: '[data-testid="ingredient-item"]',
  INGREDIENT_MODAL: '[data-testid="ingredient-modal"]',
  ORDER_MODAL: '[data-testid="order-modal"]',
  CLOSE_MODAL_BUTTON: '[data-testid="modal-close-button"]',
  CREATE_ORDER_BUTTON: '[data-testid="create-order-button"]',
  DROP_ELEMENT: '[data-testid="drop-element"]',
  DROP_BUN: '[data-testid="drop-bun"]'
};

describe('constructor tests', () => {
	beforeEach(() => {
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

	it('should open ingredient modal when clicking on an ingredient', () => {
		cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
		cy.get(SELECTORS.INGREDIENT_MODAL).as('modal').should('be.visible');
		cy.get('@modal').within(() => {
			cy.contains('Калории').should('exist');
			cy.contains('Белки').should('exist');
			cy.contains('Жиры').should('exist');
			cy.contains('Углеводы').should('exist');
		});
	});

	it('should close ingredient modal when clicking close button', () => {
		cy.get(SELECTORS.INGREDIENT_ITEM).first().click();
		cy.get(SELECTORS.CLOSE_MODAL_BUTTON).click();
		cy.get(SELECTORS.INGREDIENT_MODAL).should('not.exist');
	});

	it('should move elements to constructor', () => {
		cy.get(SELECTORS.DROP_ELEMENT).as('container')

		cy.get(SELECTORS.INGREDIENT_ITEM).first().as('bun').trigger('dragstart')
		cy.get(SELECTORS.DROP_BUN).first().trigger('drop')

		cy.get(SELECTORS.INGREDIENT_ITEM).eq(2).as('firstItem').trigger('dragstart');
		cy.get("@container").trigger('drop');

		cy.get(SELECTORS.INGREDIENT_ITEM).eq(3).as('secondItem').trigger('dragstart');
		cy.get('@container').trigger('drop');

		cy.get('@bun').invoke('text').then((bunText) => {
			cy.get('@bun').should('contain.text', bunText.trim());
		});

		cy.get('@firstItem').invoke('text').then((firstText) => {
			const nameOnly = firstText.split(/\d+/)[0].trim();
			cy.get('@container').should('contain.text', nameOnly)})

		cy.get('@secondItem').invoke('text').then((secondText) => {
			const nameOnly = secondText.split(/\d+/)[0].trim();
			cy.get('@container').should('contain.text', nameOnly);
		});
	})

	it('should open order details modal with order data', () => {
		cy.get(SELECTORS.INGREDIENT_ITEM).first().trigger('dragstart')
		cy.get(SELECTORS.DROP_BUN).first().trigger('drop')

		cy.get(SELECTORS.INGREDIENT_ITEM).last().trigger('dragstart')
		cy.get(SELECTORS.DROP_ELEMENT).trigger('drop')

		cy.get(SELECTORS.CREATE_ORDER_BUTTON).click();
		cy.get(SELECTORS.ORDER_MODAL).as('modal').should('be.visible');

		cy.intercept('POST', 'api/orders', {
			statusCode: 200,
			body: { success: true, name: 'Order 123', order: { number: 12345 } },
		}).as('getOrder');
		cy.wait('@getOrder', { timeout: 20000 });

		cy.get('@modal').should('contain.text', '12345')
	});

	it('should close order modal when clicking close button', () => {
		cy.get(SELECTORS.CREATE_ORDER_BUTTON).click();
		cy.get(SELECTORS.CLOSE_MODAL_BUTTON).click();
		cy.get(SELECTORS.ORDER_MODAL).should('not.exist');
	});
});