const devPort = Cypress.env('devPort');

context('Multiselector', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:${devPort}/`);
		cy.get('[data-cy="multiselect-container"]')
			.click();
	})
	it('Seleccionar 3 items: primero, segundo y último',  () => {
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.should('have.length.gt', 1)
			.first()
			.click()
			.next()
			.click();
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.last()
			.click();
	})
	it('Verificar que los 3 items estén seleccionados tanto en menú como en campo de selección', () => {
		// Seleccionar el primero y segundo item del menú
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.should('have.length.gt', 1)
			.first()
			.click()
			.next()
			.click();
		// Seleccionar el último item
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.last()
			.click();
		// Verificar que 3 items esten seleccionados en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('have.length', 3);
		// Verificar hayan 3 elementos en el campo de selección
		cy.get('[data-cy="tags"]')
			.children()
			.children()
			.should('have.length', 3);
	})
	it('Deseleccionar todos los elementos con el botón "clearable"', () => {
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.should('have.length.gt', 1)
			.first()
			.click()
			.next()
			.click();
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.last()
			.click();
		cy.get('[data-cy="multiselect-container"]')
			.find('[data-cy="clearable"]')
			.should('exist')
			.click();
		// Verificar no hayan items seleccionados en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('not.exist');
		cy.get('[data-cy="tags"]')
			.children('.tag')
			.should('not.exist');
		cy.get('[data-cy="multiselect-container"]')
			.click();
	})
	it('Seleccionar todos los items con un click', () => {
		cy.get('[data-cy=selectAll]')
			.click();
		cy.get('[data-cy="multiselect-container"]')
			.click();
	})
	it('Deseleccionar todos los items con un click', () => {
		cy.get('[data-cy=selectAll]')
			.click();
		cy.get('[data-cy=selectAll]')
			.click();
		cy.get('[data-cy="multiselect-container"]')
			.click();
	})
	it('Eliminar tags desde su respectiva x', () => {
		cy.get('[data-cy=selectAll]')
			.click();
		cy.get('[data-cy="tags"]')
			.children()
			.first()
			.find('[data-cy=closeTag]')
			.click();
		cy.get('[data-cy="tags"]')
			.children()
			.first()
			.find('[data-cy=closeTag]')
			.click();
	})
});
