import 'cypress-testing-library/add-commands'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../../src/aws-exports'
import { createItem } from '../../src/api/createItem'
import { deleteItem } from '../../src/api/deleteItem'
Amplify.configure(aws_exports)

Cypress.Commands.add('login', () => {
  return Auth.signIn('stefan.franzen@addq.se', 'ADDQbmc123!').catch(err =>
    console.log('An error occured when authenticating using AWS Amplify: ', err)
  )
})

Cypress.Commands.add('createItem', input => {
  return createItem({
    team: input.team,
    header: input.header,
    text: input.text,
    block: input.block,
  })
})

Cypress.Commands.add('deleteItem', blockUuid => {
  return deleteItem(blockUuid)
})
