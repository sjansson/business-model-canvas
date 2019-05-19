describe('Integrationtest of creating items', function() {
  before(() => {
    cy.login()
  })

  it('testing the request data and response data', function() {
    const inputHeader = 'CreateItem Header'
    const inputText = 'CreateItem Text'
    const expectedResultBody = {
      Team: 'Team Continuous',
      Block: 'Value Propositions',
      ItemHeader: inputHeader,
      ItemText: inputText,
    }
    cy.server()
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')
    cy.visit('/details/value-propositions')

    cy.wait('@getUpdatedCanvasData')

    cy.getByText('Add Item').click()

    cy.getByTestId('details-updateform-header')
      .type(inputHeader)
      .should('have.value', inputHeader)
    cy.getByTestId('details-updateform-text')
      .type(inputText)
      .should('have.value', inputText)

    cy.server()
    cy.route('POST', '**/prod/bmc-items/create').as('createItemRequest')

    cy.getByText('Create').click()

    cy.wait('@createItemRequest').then(http => {
      // request data
      expect(http.method).to.eq('POST')
      expect(http.request.body.Item.ItemHeader).to.eq(inputHeader)
      expect(http.request.body.Item.ItemText).to.eq(inputText)

      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.Team).to.eq(expectedResultBody.Team)
      expect(http.response.body.Block).to.eq(expectedResultBody.Block)
      expect(http.response.body.ItemHeader).to.eq(expectedResultBody.ItemHeader)
      expect(http.response.body.ItemText).to.eq(expectedResultBody.ItemText)
    })

    // clean up
    cy.visit('/details/value-propositions')

    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()

    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
