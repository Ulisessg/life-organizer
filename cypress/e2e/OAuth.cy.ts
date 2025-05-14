describe("template spec", () => {
  it("passes", () => {
    // Go to home page without session
    cy.visit("http://localhost:5000");
    // Do click on signin keycloak
    cy.get("button").click();
    // In Keycloak login form
    console.log(Cypress.env("AUTH_DOMAIN"));
    cy.origin(Cypress.env("AUTH_DOMAIN"), () => {
      // Write credentials
      cy.get("input#username").type(Cypress.env("AUTH_USERNAME"));
      cy.get("input#password").type(Cypress.env("AUTH_PASSWORD"));
      cy.get("button#kc-login").click();
    });
    // Check HTML elements present when logged in and logout
    cy.get("a#profile-link");
    cy.get("button#logout-btn").click();
    // Verify you already logged out
    cy.get("button#login-btn").click();
    cy.get("img#provider-logo");
  });
});
