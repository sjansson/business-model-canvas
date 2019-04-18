import React, { useState, Fragment } from 'react'
import './Login.css'
import logo from '../../images/addq-logo.png'
import * as Constant from '../../constants/constants'
import LoadingButton from '../loading-button/Loading-button'
import Form from 'react-bootstrap/Form'
import FormGroup from 'react-bootstrap/FormGroup'
import FormControl from 'react-bootstrap/FormControl'
import FormLabel from 'react-bootstrap/FormLabel'
import Alert from 'react-bootstrap/Alert'
import { withRouter } from 'react-router-dom'
import { Auth } from 'aws-amplify'

const Login = props => {
  const [isLoading, setIsLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const validateForm = () => {
    return email.length > 0 && password.length > 0
  }

  const handleEmailChange = event => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = event => {
    setPassword(event.target.value)
  }

  const handleSubmit = async event => {
    event.preventDefault()
    setIsLoading(true)

    try {
      await Auth.signIn(email, password)
      props.userHasAuthenticated(true)
      props.history.push('/')
    } catch (e) {
      setIsLoading(false)
      setError(true)
    }
  }

  const errorMessage = () => {
    if (error) {
      return (
        <Fragment>
          <br />
          <Alert variant="danger">{Constant.LOGIN_ERROR_MESSAGE_FAILED}</Alert>
        </Fragment>
      )
    }
  }

  return (
    <div className="login-container">
      <img src={logo} alt="" />
      <div className="login-header">{Constant.APP_NAME}</div>
      <div className="login">
        <Form onSubmit={handleSubmit}>
          <FormGroup controlId="email">
            <FormLabel>{Constant.LOGIN_EMAIL_HEADER}</FormLabel>
            <FormControl autoFocus type="email" value={email} onChange={handleEmailChange} />
          </FormGroup>
          <FormGroup controlId="password">
            <FormLabel>{Constant.LOGIN_PASSWORD_HEADER}</FormLabel>
            <FormControl value={password} onChange={handlePasswordChange} type="password" />
          </FormGroup>
          <LoadingButton
            block
            disabled={!validateForm()}
            type="submit"
            isLoading={isLoading}
            text={Constant.LOGIN_BUTTON_TEXT}
            loadingText={Constant.LOGIN_BUTTON_LOADINGTEXT}
            data-testid="loginSubmitButton"
          />
          {errorMessage()}
        </Form>
      </div>
    </div>
  )
}

export default withRouter(Login)
