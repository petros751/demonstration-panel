import Products from '../../src/features/products/ProductsComponent';
import { store } from '../../src/app/store';
import { Provider } from 'react-redux';
describe('<Products>', () => {
    beforeEach(() => {
        cy.viewport(1280, 720);
        cy.mount( <Provider store={store}><Products /></Provider>);
    })
    it('Products must be loaded', () => {
        cy.get('[data-cy=empty-product-list]').should('not.exist');
    })
    it('Table must be exist', () => {
        cy.get('[data-cy=table]').should('exist');
    })
    it('Check if total item component exist', () => {
        cy.get('[data-cy=total-list-items-component]').should('exist');
    })
    it('Check if pagination component exist', () => {
        cy.get('[data-cy=pagination]').should('exist');
    })
    // MODALS CLOSE FUNCTIONALITY
    it('Open/Edit/Close ADD product modal', () => {
        cy.get('[data-cy=show-add-product-modal]').click();
        cy.get('[data-cy=product-modal]').should('exist');
        cy.get('[data-cy=add-modal-title').type("Test title");
        cy.get('[data-cy=add-modal-price').type("1800");
        cy.get('[data-cy=add-modal-stock').type("10");
        cy.get('[data-cy=add-modal-brand').type("Test brand");
        cy.get('[data-cy=product-modal-close]').click();
    })
    it('Open/Close DELETE product modal', () => {
        cy.get('tr>td').eq(6).children().first().click();
        cy.get('[data-cy=delete-modal]').should('exist');
        cy.get('[data-cy=delete-modal-close]').click();
    })
    it('Open/Edit/Close EDIT product modal', () => {
        cy.get('tr>td').eq(0).children().first().click();
        cy.get('[data-cy=edit-modal]').should('exist');
        cy.get('[data-cy=edit-modal-title').clear().type("Test title");
        cy.get('[data-cy=edit-modal-price').clear().type("1800");
        cy.get('[data-cy=edit-modal-description').clear().type("Test description");
        cy.get('[data-cy=edit-modal-stock').clear().type("10");
        cy.get('[data-cy=product-modal-close]').click();
    })
    // MODALS SAVE FUNCTIONALITY
    it('Open/Edit/Save ADD product modal', () => {
        cy.get('[data-cy=show-add-product-modal]').click();
        cy.get('[data-cy=product-modal]').should('exist');
        cy.get('[data-cy=add-modal-title').type("Test title");
        cy.get('[data-cy=add-modal-price').type("1800");
        cy.get('[data-cy=add-modal-stock').type("10");
        cy.get('[data-cy=add-modal-brand').type("Test brand");
        cy.get('[data-cy=product-modal-save]').click();
    })
    it('Open/Delet DELETE product modal', () => {
        cy.get('tr>td').eq(6).children().first().click();
        cy.get('[data-cy=delete-modal]').should('exist');
        cy.get('[data-cy=delete-modal-delete]').click();
    })
    it('Open/Edit/Save EDIT product modal', () => {
        cy.get('tr>td').eq(0).children().first().click();
        cy.get('[data-cy=edit-modal]').should('exist');
        cy.get('[data-cy=edit-modal-title').clear().type("Test title");
        cy.get('[data-cy=edit-modal-price').clear().type("1800");
        cy.get('[data-cy=edit-modal-description').clear().type("Test description");
        cy.get('[data-cy=edit-modal-stock').clear().type("10");
        cy.get('[data-cy=product-modal-update]').click();
    })
})