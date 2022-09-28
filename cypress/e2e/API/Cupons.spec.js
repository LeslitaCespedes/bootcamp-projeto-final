/// <reference types="cypress" />
import cupons from '../../fixtures/cupons.json'
import auth from '../../fixtures/auth.json'
import cuponApp from '../../fixtures/cuponsApp.json'

describe('[US-0003] – API de cupons', () => {

    it('[POST] Criar um Cupom', () => {
        cy.request({
            method: "POST",
            url: 'http://lojaebac.ebaconline.art.br/wp-json/wc/v3/coupons',

            headers: {
                Username: auth.usuario,
                Password: auth.senha,
                Authorization: auth.uthorization
            },
            body: cupons[1]

        }).then((response) => {
            expect(response.status).to.eq(201)
        })
    });

    it('[POST] Nome do cupom não pode ser repetido', () => {
        cy.request({
            method: "POST",
            url: 'wp-json/wc/v3/coupons',
            failOnStatusCode: false,
            headers: {
                Username: auth.usuario,
                Password: auth.senha,
                Authorization: auth.uthorization
            },
            body: cupons[1]

        }).then((response) => {
            expect(response.status).to.eq(400)
        })
    });

    it('[GET] Deve Modificar um  os Cupons cadastrados', () => {
        cy.request({
            method: "GET",
            url: 'wp-json/wc/v3/coupons',
            headers: {
                Username: auth.usuario,
                Password: auth.senha,
                Authorization: auth.uthorization
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })

    });


    it('[GET] Deve listar buscando por ID do cupom', () => {
        let idCupom = cuponApp[0].id
        cy.request({
            method: "GET",
            url: `wp-json/wc/v3/coupons/${idCupom}`,
            headers: {
                Username: auth.usuario,
                Password: auth.senha,
                Authorization: auth.uthorization
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });


    it('[PUT] Deve Modificar o codigo e descripcao de um Cupom pelo ID', () => {
        let idCupom = cuponApp[0].id
        cy.request({
            method: "PUT",
            url: `wp-json/wc/v3/coupons/${idCupom}`,
            headers: {
                Username: auth.usuario,
                Password: auth.senha,
                Authorization: auth.uthorization
            },
            body: {
                "code": "descsBootVia",
                "description": "Cupom de desconto de teste modificado descsBootVia"
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    });

});

