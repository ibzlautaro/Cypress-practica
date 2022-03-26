class HomePage{

    searchBar(){
       return cy.get("#search_query_top")
    }

    contactUsButton(){
        return cy.get("#contact-link > a")
    }

    homeIcon(){
        return cy.get(".icon-home")
    }

}

export default HomePage;