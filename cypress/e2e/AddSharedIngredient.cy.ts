import { TestLogin } from "../common/TestLogin"

describe("Add shared ingredient to database", () => {
  it("Login, select shared ingredients and add a new one", () => {
    cy.visit("http://localhost:5100")
    TestLogin()
    cy.get('button[data-select-shared-ingredients]').click()
    cy.get('button[data-open-shared-ingredients-modal]').click()
    const randomIngredient = Math.random() * 1000
    cy.get('input[data-input-create-ingredient]').type(`${randomIngredient}`)
    cy.get('button[data-button-create-ingredient]').click()
    cy.get('button[data-close-shared-ingredients-modal]').click()
    cy.contains(`${randomIngredient}`)
  })
})