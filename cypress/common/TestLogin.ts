export function TestLogin() {
  cy.get("button").click();

  const username = Cypress.env("AUTH_USERNAME");
  const password = Cypress.env("AUTH_PASSWORD");

  cy.origin(Cypress.env("AUTH_DOMAIN"), { args: { username, password } }, ({ username, password }) => {
    cy.log(Cypress.env("AUTH_DOMAIN"))
    cy.get("input#username").type(username);
    cy.get("input#password").type(password);
    cy.get("button#kc-login").click();
  });
}