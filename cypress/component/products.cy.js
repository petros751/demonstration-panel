import Products from '../../src/features/products/ProductsComponent';

describe('<Products>', () => {
    before(() => {
        cy.viewport(1600, 900);
        cy.visit(`${Cypress.env('localUrl')}login`);
        // cy.get('[data-cy=email]').type(Cypress.env('username'));
        // cy.get('[data-cy=password]').type(`${Cypress.env('password')}{Enter}`);
        // cy.get('[data-cy=close-whats-new]', { timeout: 10 * 1000 }).click();
        // cy.get('[data-cy=loading-spinner]', { timeout: 60 * 1000 }).should('not.exist');
    });
    beforeEach(() => {
        cy.mount(<Products />);
    })
    it('Check no products', () => {
        cy.get('[data-cy=empty]').contains('No products');
    })
})

// describe('<Movielist>', () => {
//     beforeEach(() => {
//       cy.mount(<Movielist />);
//       cy.get('[data-cy=empty]').contains('No movies here');
//       const formInput = cy.get('form input');
//       formInput.should('have.value', '');
//       formInput.type('Monster Inc.')
//         .should('have.value', 'Monster Inc.');
//       cy.get('form button').click();
//       formInput.clear();
//       formInput.type('Circle of eight')
//         .should('have.value', 'Circle of eight');
//       cy.get('form button').click();
//       cy.get('[data-cy=movie-list]').children().should('have.length', 2);
//     });
//     it('The Listof movies appends', () => {
//       cy.get('form input')
//         .type('Monster Inc.')
//         .should('have.value', 'Monster Inc.')
//       cy.get('form button').click();
//       cy.get('[data-cy=movie-list]').children().should('have.length', 3);
//     })
  
//     it('uncheck movie', () => {
//       const lastListitem = cy.get('[data-cy=movie-list]:nth-child(1) li:last-child');
//       lastListitem.click();
//       lastListitem.should('have.class', 'strike');
//       cy.get('[data-cy=clear-movie]').click();
//       cy.get('[data-cy=movie-list]').children().should('have.length', 1);
//       cy.get('[data-cy=clear-movie]').click();
//       cy.get('[data-cy=movie-list]').children().should('have.length', 1);
//     })
//   })