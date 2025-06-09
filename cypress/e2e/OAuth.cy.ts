describe("Authentication flow", () => {
  it("logs in via Keycloak and logs out successfully", () => {
    cy.visit("http://localhost:5000");
    cy.get("button").click();

    const username = Cypress.env("AUTH_USERNAME");
    const password = Cypress.env("AUTH_PASSWORD");

    cy.origin(Cypress.env("AUTH_DOMAIN"), { args: { username, password } }, ({ username, password }) => {
      cy.log(Cypress.env("AUTH_DOMAIN"))
      cy.get("input#username").type(username);
      cy.get("input#password").type(password);
      cy.get("button#kc-login").click();
    });
    
    cy.get("a#profile-link").should("be.visible");
    cy.get("button#logout-btn").click();

    cy.get("button#login-btn").should("be.visible").click();
    cy.get("img#provider-logo").should("be.visible");
  });
});


