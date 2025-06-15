import "./commands";

declare global {
    namespace Cypress {
        interface Chainable {
            mockOrderResponse(): void,
			mockAuthAndIngredientResponse():void,
			closeModal(): void;
        }
    }
}