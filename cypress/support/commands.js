// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })

 import HomePage from "../integration/2-advanced-examples/pageObjects/HomePage";
let Home
beforeEach(()=>{
   cy.fixture('example.json').then(function(){
       Home = new HomePage()
    })
});

Cypress.Commands.add("selectSearchBar", (search) => {
    cy.get("#search_query_top").click().type(search)
    cy.get("#search_query_top").type(`{enter}`);
})

Cypress.Commands.add("getBackToMainPage", () => {
    cy.visit("http://automationpractice.com/index.php?id_category=5&controller=category")
    cy.log("-------Main Page Loaded-------")
})

Cypress.Commands.add("pressWomenButton", () => {
    cy.get(".sf-menu > :nth-child(1) > [href=\"http://automationpractice.com/index.php?id_category=3&controller=category\"]").click()
    cy.log("-------Women page clicked-------")
})

Cypress.Commands.add("pressDressesButton", () => {
    cy.get(".sf-menu > :nth-child(2) > .sf-with-ul").click()
    cy.log("-------Dresses page clicked-------")
})

Cypress.Commands.add("pressShirtsButton", () => {
    cy.get(".sf-menu > :nth-child(3) > a").click()
    cy.log("-------T-Shirts clicked-------")
})

Cypress.Commands.add("pressContactUsButton", () => {
    Home.contactUsButton().click()
    cy.log("-------Contact button clicked-------")
})

// ----------------------------------------------------------------------------------------------------------------

Cypress.Commands.add("searchType", (search) => {
    Home.searchBar().click().type(search)
    Home.searchBar().type(`{enter}`);
})















//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
