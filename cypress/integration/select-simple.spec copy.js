const devPort = Cypress.env('devPort');

context('Selector Simple con No Objetos', () => {
	beforeEach(() => {
		cy.visit(`http://localhost:${devPort}/`);
		cy.get('[data-cy="string-simple-container"]')
			.click();
	})
	it('Hacer click en 3 items pero solo el último debe estar seleccionado',  () => {
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
	it('Verificar que el item esté seleccionado tanto en menú como en campo de selección', () => {
		let selectedElementContent = null;
		// Seleccionar el último item
		cy.get('[data-cy="multiselect-menu"]')
			.should('exist')
			.children('li')
			.last()
			.then((el) => {
				[, ...selectedElementContent] = el[0].textContent;
				selectedElementContent = selectedElementContent.join('');
			})
			.click();
		// Verificar que 1 item este seleccionado en el menú
		cy.get('[data-cy="multiselect-menu"]')
			.find('.menu-item-selected')
			.should('have.length', 1);
		// Verificar haya 1 elemento en el campo de selección
		cy.get('[data-cy="tags"]')
			.children()
			.children()
			.should('have.length', 1)
			.then((el) => {
				const content = el[0].textContent;
				expect(content).to.be.equal(selectedElementContent);
			});
	})
});
