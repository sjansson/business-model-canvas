import React from 'react'
import './navigation-bar.css'
import { Link } from 'react-router-dom'
import { Nav, Navbar, NavItem } from 'react-bootstrap'

const NavigationBar = () => {
  return (
    <Navbar fluid collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Business Model Canvas</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav pullRight>
          <NavItem href="/signup">Signup</NavItem>
          <NavItem href="/login">Login</NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

export default NavigationBar
