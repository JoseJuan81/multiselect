
context('Multiselect', () => {
	beforeEach(() => {
		cy.visit('http://localhost:8081/');
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
		// Verificar que dos items esten seleccionados en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('have.length', 2);
		// Verificar hayan 2 elementos en el campo de selección
		cy.get('[data-cy="tags"]')
			.children()
			.children()
			.should('have.length', 2);
		// Presionar botón para eliminar todas las selecciones
		cy.get('[data-cy="clearable"]')
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
