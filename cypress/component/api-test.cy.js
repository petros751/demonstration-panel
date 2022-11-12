describe('API testing for Products', () => {
    it('Fetches Products items - GET', () => {
        cy.request('https://dummyjson.com/products?limit=8&skip=0').as('productsRequest');
        cy.get('@productsRequest').then(products => {
            expect(products.status).to.eq(200);
            assert.isObject(products.body, 'Products Response is an onbject')
        });
    });
    it('DELETE Product item - DELETE', () => {
        cy.request('https://dummyjson.com/products/1').as('productsRequest');
        cy.get('@productsRequest').then(products => {
            expect(products.status).to.eq(200);
            assert.isObject(products.body, 'Products Response is an onbject')
        });
    });
    it('ADD Product item - POST', () => {
        cy.request('POST', 'https://dummyjson.com/products/add', {title: 'product test'}).as('productsRequest');
        cy.get('@productsRequest').then(products => {
            expect(products.status).to.eq(200);
            assert.isObject(products.body, 'Products Response is an onbject')
            cy.wrap(products.body).should('deep.include', {
                title: 'product test'
            });
        });
    });
    it('EDIT Product item - PUT', () => {
        cy.request('PUT', 'https://dummyjson.com/products/1', {title: 'edit title'}).as('productsRequest');
        cy.get('@productsRequest').then(products => {
            expect(products.status).to.eq(200);
            assert.isObject(products.body, 'Products Response is an onbject')
            cy.wrap(products.body).should('deep.include', {
                title: 'edit title'
            });
        });
    });
 });