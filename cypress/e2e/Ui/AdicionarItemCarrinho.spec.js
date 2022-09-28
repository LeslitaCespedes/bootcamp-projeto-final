/// <reference types="cypress" />

describe('US-0002 Adicionar item ao carrinho ', () => {
    let desc10 = "nomecupomsdfa"
    let desc15 = "4v1g6gw15"

    beforeEach(() => {
        cy.fixture('usuarios').then((usr) => {
            cy.login(usr[0].usuario, usr[0].senha)
        })

        cy.visit('produtos/page/2/')
    });
    
    it('Deve permitir inserir 9 itens de um mesmo produto ao carrinho com sucesso ', () => {
        cy.addProduto("Bruno Compete Hoodie", "L", "Black", 9)
        cy.get('[class="woocommerce-message"]').should('contain', '9 × “Bruno Compete Hoodie” foram adicionados no seu carrinho')
        
        cy.wait(1000)
        cy.get('.woocommerce-message > .button').click()
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });

    it('Deve validar não é permitido 10 itens de um mesmo produto ao carrinho ', () => {
        cy.addProd10("Cassia Funnel Sweatshirt", "M", "White", 10)
        cy.get('.single_add_to_cart_button').should('be.visible')
    });

    it('Valores menores a 200 não tem desconto do 10%', () => {
        cy.addProduto("Bruno Compete Hoodie", "L", "Black", 1)
        cy.get('.woocommerce-message > .button').click()
        cy.get('#coupon_code').type('desc10')
        cy.get('.coupon > .btn').click()
        cy.get('[data-title="Cupom: nomecupomsdfa"]').should('not.exist')
        cy.wait(1000)
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });

    it('Valida desconto de 10% para valores entre R$ 200 e R$ 600  ', () => {
        cy.addProduto("Bruno Compete Hoodie", "L", "Black", 4)
        cy.get('.woocommerce-message > .button').click()
        cy.get('#coupon_code').type(desc10.toString())
        cy.get('.coupon > .btn').click()
        cy.get('[data-title="Cupom: nomecupomsdfa"]').should('be.visible')
        cy.wait(1000)
        cy.get('.woocommerce-remove-coupon').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
    });
    it('Valida desconto de 15% para valores acima de R$ 600 ', () => {
        cy.addProduto("Bruno Compete Hoodie", "L", "Black",8)
        cy.visit('produtos/page/2/')
        cy.addProduto("Cassia Funnel Sweatshirt", "M", "White", 1)
        cy.get('.woocommerce-message > .button').click()
        cy.get('#coupon_code').type(desc15.toString())
        cy.get('.coupon > .btn').click()
        cy.get('[data-title="Cupom: 4v1g6gw15"]').should('be.visible')
        cy.wait(1000)
        cy.get('.woocommerce-remove-coupon').click()
        cy.wait(1000)
        cy.get(':nth-child(1) > .product-remove > .remove > .fa').click()
        cy.wait(1000)
        cy.get('.cart_item > .product-remove').click({ multiple: true })
    });
});