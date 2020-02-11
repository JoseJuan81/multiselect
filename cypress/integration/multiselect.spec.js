const devPort = Cypress.env('devPort');

context('Multiselect', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:${devPort}/`);
	})
	it('Existen items seleccionados', () => {
		// Hacer click en el campo de selección
		cy.get('[data-cy="multiselect-container"]')
			.should('exist')
			.click();
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
		// Deseleccionar el último elemento
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.last()
			.click();
		// Verificar que 2 items esten seleccionados en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('have.length', 4);
		// Verificar hayan 2 elementos en el campo de selección
		cy.get('[data-cy="tags"]')
			.children()
			.children()
			.should('have.length', 4);
		// Presionar botón para eliminar todas las selecciones
		cy.get('[data-cy="multiselect-container"]')
			.find('[data-cy="clearable"]')
			.should('exist')
			.click();
		// Verificar no hayan items seleccionados en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('not.exist');
		// Verificar no hayan elementos en el campo de selección
		cy.get('[data-cy="tags"]')
			.children('.tag')
			.should('not.exist');
		// Cerrar menú
		cy.get('[data-cy="multiselect-container"]')
			.should('exist')
			.click();
		cy.get('[data-cy="multiselect-menu"]')
			.should('not.exist');
	})
});
