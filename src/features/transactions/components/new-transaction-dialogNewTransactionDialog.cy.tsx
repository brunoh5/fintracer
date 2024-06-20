import React from 'react'
import { NewTransactionDialog } from './new-transaction-dialog'

describe('<NewTransactionDialog />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<NewTransactionDialog />)
  })
})