import React, { Fragment } from 'react'
import './Navigation-bar.css'
import QLogo from '../../images/q-logo.png'
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ViewToggle from '../view-toggle/View-toggle'

const renderLeftDropdown = props => {
  if (props.isAuthenticated) {
    return (
      <Dropdown as={ButtonGroup}>
        <Button variant="black" data-testid="navbarDropdownSplitButton">
          <Link to="/canvas">Team Continuous</Link>
        </Button>
        <Dropdown.Toggle
          split
          variant="black"
          className="navbar-dropdown-arrow"
          data-testid="navbarDropdownSubmenuToggle"
        />
        <Dropdown.Menu data-testid="navbarDropdownSubmenu">
          <LinkContainer to="/canvas" className="navbar-dropdown-submenu">
            <Dropdown.Item>Team Continuous</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/canvas-frontend" className="navbar-dropdown-submenu">
            <Dropdown.Item>Team Frontend Auto</Dropdown.Item>
          </LinkContainer>
          <LinkContainer to="/canvas-mobile" className="navbar-dropdown-submenu">
            <Dropdown.Item>Team Mobile</Dropdown.Item>
          </LinkContainer>
        </Dropdown.Menu>
      </Dropdown>
    )
  }
}

const renderRightComponents = props => {
  if (props.isAuthenticated) {
    return (
      <Nav>
        <Fragment>
          <Nav.Item className="navbar-react-router-link">
            <Link to="/item/create">
              <i className="fa fa-plus" /> Create item
            </Link>
          </Nav.Item>
          <Nav.Item className="canvas-view-button navbar-react-router-link">
            <ViewToggle />
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link canvas-view-button navbar-separator">
            {' '}
            |
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link" onClick={props.handleLogout}>
            <Link to="/logout" data-testid="navbarLogoutButton">
              <i className="fa fa-sign-out" /> Logout
            </Link>
          </Nav.Item>
        </Fragment>
      </Nav>
    )
  } else {
    return (
      <Nav>
        <Fragment>
          <Nav.Item className="navbar-react-router-link">
            <Link to="/signup">
              <i className="fa fa-user" /> Signup
            </Link>
          </Nav.Item>
          <Nav.Item className="navbar-react-router-link">
            <Link to="/login">
              <i className="fa fa-sign-in" /> Login
            </Link>
          </Nav.Item>
        </Fragment>
      </Nav>
    )
  }
}

const renderRightComponents = props => {
  if (props.isAuthenticated) {
    return (
      <Nav>
        <Fragment>
          <Nav.Link>
            <Link to="/item/create" className="navbar-link">
              <i className="fa fa-plus" /> Create item
            </Link>
          </Nav.Link>
          <Nav.Link className="canvas-view-button">
            <ViewToggle />
          </Nav.Link>
          <Nav.Link className="canvas-view-button">|</Nav.Link>
          <Nav.Link onClick={props.handleLogout}>
            <Link to="/logout" className="navbar-link" data-testid="navbarLogoutButton">
              <i className="fa fa-sign-out" /> Logout
            </Link>
          </Nav.Link>
        </Fragment>
      </Nav>
    )
  } else {
    return (
      <Nav>
        <Fragment>
          <Nav.Link>
            <Link to="/signup" className="navbar-link">
              <i className="fa fa-user" /> Signup
            </Link>
          </Nav.Link>
          <Nav.Link>
            <Link to="/login" className="navbar-link">
              <i className="fa fa-sign-in" /> Login
            </Link>
          </Nav.Link>
        </Fragment>
      </Nav>
    )
  }
}

const NavigationBar = ({ props }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-custom rounded" collapseOnSelect>
      <Navbar.Brand>
        <img alt="" src={QLogo} className="navbar-logo-image" />
        <Link to="/" className="navbar-header">
          Business Model Canvas
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>{renderLeftDropdown(props)}</Navbar.Collapse>
      <Navbar.Collapse className="justify-content-end">
        {renderRightComponents(props)}
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
