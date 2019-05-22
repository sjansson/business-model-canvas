describe('Integrationtest of deleting items', function() {
  const inputHeader = 'Int.test delete item - header'
  const inputText = 'Int.test delete item - text'
  beforeEach(() => {
    cy.login()
    cy.createItem({
      team: 'Team Continuous',
      header: inputHeader,
      block: 'Value Propositions',
      text: inputText,
    }).as('createditem')
  })

  it('testing the request data and response data', function() {
    cy.get('@createdItem').then(response => {
      cy.visit(`/details/value-propositions/${response.BlockUuid}`)
    })

    cy.getByText(inputHeader).click()
    cy.getByText('Edit').click()

    cy.server()
    cy.route('DELETE', '**/prod/bmc-items/delete**').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(http => {
      // request data
      expect(http.method).to.eq('DELETE')
      expect(http.request.body.TableName).to.eq('BusinessModelCanvas')
      cy.get('@createdItem').then(response => {
        expect(http.url).to.contain(response.BlockUuid)
      })
      // response data
      expect(http.status).to.eq(200)
      expect(http.response.body.status).to.eq(true)
    })
  })
})
