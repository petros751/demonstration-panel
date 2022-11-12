describe('Products api testing', () => {
    let todoItem;
    it('fetches Products items - GET', () => {
        cy.request('/products/').as('productsRequest');
        cy.get('@productsRequest').then(todos => {
            expect(products.status).to.eq(200);
            assert.isArray(products.body, 'Products Response is an array')
        });
    });
 });