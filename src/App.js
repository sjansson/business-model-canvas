import Routes from './Routes'
import React, { Component } from 'react'
import './App.css'
import './components/navigation-bar/navigation-bar.css'
import { Link, withRouter } from 'react-router-dom'
import { ButtonGroup, Button } from 'react-bootstrap'
import NavigationBar from './components/navigation-bar/navigation-bar'
import { Auth } from 'aws-amplify'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isAuthenticated: false,
      isAuthenticating: true,
    }
  }

  async componentDidMount() {
    try {
      await Auth.currentSession()
      this.userHasAuthenticated(true)
    } catch (e) {
      if (e !== 'No current user') {
        alert(e)
      }
    }

    this.setState({ isAuthenticating: false })
  }

  userHasAuthenticated = authenticated => {
    this.setState({ isAuthenticated: authenticated })
  }

  handleLogout = async () => {
    await Auth.signOut()
    this.userHasAuthenticated(false)
    this.props.history.push('/login')
  }

  render() {
    const childProps = {
      isAuthenticated: this.state.isAuthenticated,
      userHasAuthenticated: this.userHasAuthenticated,
      handleLogout: this.handleLogout,
    }
    return (
      !this.state.isAuthenticating && (
        <div className="App">
          <NavigationBar props={childProps} />
          <div className="View">
            <ButtonGroup>
              <Link to="/item/create">
                <Button variant="outline-secondary" size="sm">
                  Create item
                </Button>
              </Link>
              <Link to="/canvas">
                <Button variant="outline-secondary" size="sm">
                  Canvas
                </Button>
              </Link>
              <Link to="/horizontal">
                <Button variant="outline-secondary" size="sm">
                  Horizontal
                </Button>
              </Link>
            </ButtonGroup>
          </div>
          <Routes props={childProps} />
        </div>
      )
    )
  }
}

export default withRouter(App)
