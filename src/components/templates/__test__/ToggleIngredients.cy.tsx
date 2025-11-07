import { store } from "@/redux/store"
import { ToggleIngredients } from "../ToggleIngredients"
import { Provider as ReduxProvider } from 'react-redux'

describe("Toggle ingredients - Template component", () => {
  it("Should select personal ingredients as default", () => {
    cy.mount(
      <>
        <ReduxProvider store={store}>
          <ToggleIngredients />
        </ReduxProvider>
      </>
    )
    cy.get('[data-organisms-personal-ingredients]')
  })
  it('Should change component to shared ingredients', () => {
    cy.mount(
      <>
        <ReduxProvider store={store}>
          <ToggleIngredients />
        </ReduxProvider>
      </>
    )
    cy.get('[data-templates-toggle-ingredients-shared-button]').click()
    cy.get('[data-organisms-shared-ingredients]')
  })
  it("Should change component to personal ingredients", () => {
    cy.mount(
      <>
        <ReduxProvider store={store}>
          <ToggleIngredients />
        </ReduxProvider>
      </>
    )
    cy.get('[data-templates-toggle-ingredients-shared-button]').click()
    cy.get('[data-templates-toggle-ingredients-personals-button]').click()
    cy.get('[data-organisms-personal-ingredients]')

  })
})