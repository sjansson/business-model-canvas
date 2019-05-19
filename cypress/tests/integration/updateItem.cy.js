describe('Integrationtest of updating items', function() {
  const inputHeader = 'Int.test update item - header'
  const inputText = 'Int.test update item - text'
  beforeEach(() => {
    cy.login()
    cy.createItem({
      team: 'Team Continuous',
      header: inputHeader,
      block: 'Value Propositions',
      text: inputText,
    }).as('createditem')
  })

  afterEach(() => {
    cy.get('@createditem').then(data => {
      cy.deleteItem({ team: 'Team Continuous', blockUuid: data.BlockUuid })
    })
  })

  it('testing the request data and response data', function() {
    cy.visit('Team-Continuous/details/value-propositions')
    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()
    cy.getByTestId('details-updateform-header')
      .clear()
      .type(`${inputHeader} updated`)
      .should('have.value', `${inputHeader} updated`)
    cy.getByTestId('details-updateform-text')
      .clear()
      .type(`${inputText} updated`)
      .should('have.value', `${inputText} updated`)

    cy.server()
    cy.route('PUT', '**/prod/bmc-items/update**').as('updateRequest')
    cy.getByText('Update').click()
    cy.wait('@updateRequest').then(http => {
      // request data
      expect(http.method).to.eq('PUT')
      expect(http.request.body.ItemHeader).to.eq(`${inputHeader} updated`)
      expect(http.request.body.ItemText).to.eq(`${inputText} updated`)
      expect(http.request.body.TableName).to.eq('BusinessModelCanvas')
      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.status).to.eq(true)
    })
  })
})
