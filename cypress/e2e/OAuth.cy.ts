import { TestLogin } from "../common/TestLogin";

describe("Authentication flow", () => {
  it("logs in via Keycloak and logs out successfully", () => {
    cy.visit("http://localhost:5100");
    TestLogin()
    cy.get("a#profile-link").should("be.visible");
    cy.get("button#logout-btn").click();

    cy.get("button#login-btn").should("be.visible").click();
    cy.get("img#provider-logo").should("be.visible");
  });
});


