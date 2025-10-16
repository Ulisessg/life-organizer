import { TestLogin } from "../common/TestLogin"

describe('Add personal ingredient to database', () => {
  it('Opens modal and create ingredient', () => {
    cy.visit("http://localhost:5000")
    TestLogin()
    cy.get('button[id="personal-ingredients-open-modal"]').click()
    const randomIngredient = Math.random() * 1000
    cy.get('input[data-input-create-ingredient]').type(`${randomIngredient}`)
    cy.get('button[data-button-create-ingredient]').click()
    cy.get('button[data-button-close-modal]').click()
    cy.contains(`${randomIngredient}`)
  })
})