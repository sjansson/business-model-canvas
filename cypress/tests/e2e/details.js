describe('Testing the details', function() {
  it('renders details-page', function() {
    cy.visit('/')
    cy.login()
    cy.visit('/details/key-partners')
    cy.contains('Key Partners')
  })

  it('can visit details through navbar', function() {
    cy.getByTestId('navbarDropdownSplitButton').click()
    cy.getByText('Key Resources').click()

    cy.contains('Key Resources')
  })

  it('switch between read and write-mode', function() {
    cy.visit('/')
    cy.login()
    cy.visit('/canvas', { timeout: 15000 })

    cy.getByText('Channels').click()

    cy.getByTestId('details-readmode')

    cy.getByText('Edit').click()
    cy.getByTestId('details-writemode')

    cy.getByText('Cancel').click()
    cy.getByTestId('details-readmode')
  })

  it.only('can update text on an item', function() {
    cy.visit('/')
    cy.login()
    cy.visit('/details/channels')

    // change to a new text
    cy.wait(3000)
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-text')
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
      .type('New value')
      .should('have.value', 'New value')

    cy.server()
    cy.route('PUT', '**/prod/bmc-items/update**').as('updateCanvasData')
    cy.route('GET', '**/prod/bmc-items/list**').as('getUpdatedCanvasData')

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')
    cy.wait('@getUpdatedCanvasData')

    cy.getByTestId('details-readform-text').should('have.text', 'New value')

    // change to a old text
    cy.getByText('Edit').click()

    cy.getByTestId('details-updateform-text')
      .type(
        '{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}'
      )
      .type('Old value')
      .should('have.value', 'Old value')

    cy.getByText('Update').click()

    cy.wait('@updateCanvasData')
    cy.wait('@getUpdatedCanvasData')

    cy.getByTestId('details-readform-text').should('have.text', 'Old value')
  })

  it('can delete an item', function() {
    cy.visit('/')
    cy.login()
    cy.visit('/item/create')

    const inputText = 'A new item'
    cy.getByTestId('createItemInputForm')
      .type(inputText)
      .should('have.value', inputText)

    cy.server()
    cy.route('POST', '**/prod/bmc-items/create*').as('createRequest')
    cy.getByText('Create').click()

    cy.wait('@createRequest')

    cy.visit('/details/value-propositions')

    cy.route('GET', '**prod/bmc-items/list*').as('getUpdatedCanvasData')
    cy.getByText('Edit').click()

    cy.wait('@getUpdatedCanvasData')

    cy.route('DELETE', '**/prod/bmc-items/delete*').as('deleteRequest')
    cy.getByText('Delete').click()

    cy.wait('@deleteRequest').then(response => {
      expect(response.status).to.eq(200)
    })
  })
})
