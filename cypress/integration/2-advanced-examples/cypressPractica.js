/// <reference types="cypress" />
import HomePage from "./pageObjects/HomePage";
let testdata; // variable global
let Home; // variable global

describe('Practica1', () => {
    beforeEach(()=>{
        cy.fixture('example.json').then(function(dataJson){
            testdata = dataJson
            Home = new HomePage()
        })
    });

    it('Add printed summer dress to cart y checkout', () => {
        cy.visit("http://automationpractice.com/index.php?id_category=5&controller=category")
        cy.get(".sf-menu").find(".sf-with-ul:visible").contains("Dresses").click()
        cy.get(".product_list").find(".last-in-line").contains("More").click()
        cy.get(".pb-right-column").contains("Add to cart").click()
        cy.get(".button-container").find(".continue > span").contains("Continue shopping").click()
        cy.get(".cart_block").invoke("show").find("#button_order_cart").click()
    })

    it('Assert text and visibility of image', () => {
        cy.visit("http://automationpractice.com/index.php?id_category=3&controller=category")
        cy.get(".logo").should("be.visible")
        cy.get("#search_query_top").type("remera{enter}")
        cy.get(".alert").contains('No results were found for your search \"remera\"')
    })

    // Como puedo hacer para que al chequear un checkbox, cypress espere a que cargue la pagina y luego lo deschequee?
    it('Checkboxes, static dropdown', () => {
        // Checkboxes
        cy.visit("http://automationpractice.com/index.php?id_category=3&controller=category")
        cy.get("#layered_id_attribute_group_1").check().uncheck()
        cy.get("#layered_id_attribute_group_2").check().should("be.checked").and("have.value","2_1")
        cy.get("#layered_id_attribute_group_3").check().should("be.checked").and("have.value","3_1").uncheck()
        cy.get("input[type='checkbox']").check(["5_5","11_6","17_7"])   // trae todos los checkboxes y chequea los seleccionados por value
        // Static dropdown
        cy.get("#selectProductSort").select('price:desc')
    })


    it('Dynamic dropdown, each', () => {
        //dynamic dropdown y each
        cy.visit("https://www.google.com/")
        cy.get("#L2AGLb > .QS5gu").click()
        cy.get(".gLFyf").type("hola")
        cy.get(".erkvQe").each(($el, index, $list) =>{
         if ($el.text() === "holanda"){
             $el.click()                 // si la busqueda relacionada coincide con "pisos", clickear ese valor
          }
        })
    })

    it('Traer data de un Json', function() {
        cy.visit("https://www.google.com/")
        cy.get("#L2AGLb > .QS5gu").click()
        console.log(testdata.name)
        cy.get(".gLFyf").type(testdata.name)
    })


    it('Custom commands, pageobject, env variables', function() {
        cy.visit(Cypress.env("url")).then(()=>{
            Home.searchBar().type("Prueba{enter}").log("-------Search made-------")
            Home.contactUsButton().click().log("-------Contact us Clicked-------")
            Home.homeIcon().click().log("-------Home icon Clicked-------")
        })
        cy.go("back")
        cy.selectSearchBar(testdata.name)
        cy.getBackToMainPage()
        cy.pressWomenButton()
        cy.pressDressesButton()
        cy.pressShirtsButton()
        cy.getBackToMainPage()
    })

    it.only('Custom command y PageObj 2', function() {
        cy.visit(Cypress.env("url"))
        cy.searchType("MENSAJE")
    })

})

