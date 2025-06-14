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

describe('modals check', () => {
	beforeEach(() => {
		window.localStorage.clear();
		window.localStorage.setItem("accessToken", JSON.stringify("test-accessToken"));

		cy.intercept('GET', 'https://norma.nomoreparties.space/api/ingredients', {
			fixture: 'ingredients.json'
		}).as('getIngredients');

		cy.intercept('GET', 'https://norma.nomoreparties.space/api/auth/user', {
			fixture: 'user.json',
			statusCode: 200
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
			cy.get('@container').should('contain.text', firstText.trim());
		});

		cy.get('@secondItem').invoke('text').then((secondText) => {
			cy.get('@container').should('contain.text', secondText.trim());
		});
	})

	it('should open order details modal', () => {
		cy.get(SELECTORS.INGREDIENT_ITEM).first().trigger('dragstart')
		cy.get(SELECTORS.DROP_BUN).first().trigger('drop')

		cy.get(SELECTORS.INGREDIENT_ITEM).last().trigger('dragstart')
		cy.get(SELECTORS.DROP_ELEMENT).trigger('drop')

		cy.get(SELECTORS.CREATE_ORDER_BUTTON).click();
		cy.get(SELECTORS.ORDER_MODAL).as('modal').should('be.visible');
	});

	it('should close order modal when clicking close button', () => {
		cy.get(SELECTORS.CREATE_ORDER_BUTTON).click();
		cy.get(SELECTORS.CLOSE_MODAL_BUTTON).click();
		cy.get(SELECTORS.ORDER_MODAL).should('not.exist');
	});
});