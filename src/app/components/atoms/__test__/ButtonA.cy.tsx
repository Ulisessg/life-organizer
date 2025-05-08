import React from 'react'
import { ButtonA } from '@/app/components/atoms/ButtonA'

describe('<ButtonA />', () => {
  it('renders', () => {
    cy.mount(<ButtonA>Hello from testing!</ButtonA>)
  })
})