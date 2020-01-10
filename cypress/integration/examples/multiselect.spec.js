import { isIterable } from "core-js";

context('Multiselect', () => {
	it('checking', () => {
		cy.get('[data-cy="multiselect-container"]')
			.should('exist');
	})
});
