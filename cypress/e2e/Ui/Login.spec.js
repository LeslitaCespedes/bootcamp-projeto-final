/// <reference types="cypress" />
let user
describe('US0001 - Funcionalidade Login', () => {
    before(() => {
        cy.fixture('usuarios').then((usr) => {
           user = usr
        })
    });
    beforeEach(() => {
        cy.visit('minha-conta')       
    })

    it('Deve fazer login com sucesso', () => {
        
        cy.login(user[0].usuario, user[0].senha)
        cy.get('.page-title').should('be.visible')    
        
    });
    it('Deve validar mensagem de erro com senha inválida', () => {
        cy.login(user[1].usuario, user[1].senha)
        cy.get('.woocommerce-error > li').should('contain','Erro: A senha fornecida para o e-mail aluno_ebac@teste.com está incorreta. Perdeu a senha?')
    });
    it('Deve validar mensagem de erro com usuario inválido', () => {
        cy.login(user[2].usuario, user[2].senha)
        cy.get('.woocommerce-error > li').should('contain','Endereço de e-mail desconhecido. Verifique novamente ou tente seu nome de usuário.')
    });
})