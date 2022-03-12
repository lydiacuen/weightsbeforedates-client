import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import { Link, NavLink } from 'react-router-dom'
// import '../img/gymbackground.jpeg'

const authenticatedOptions = ({ user }) => {
  if (user.profile) {
    return (
      <Fragment>
        <NavLink to='/buffposts' className='nav-link'>
          Buff Posts
        </NavLink>
        <NavLink to='/buffposts/create' className='nav-link'>
          Post a Buff Post
        </NavLink>
        <NavLink to='/change-password' className='nav-link'>
          Change Password
        </NavLink>
        <NavLink to='/sign-out' className='nav-link'>
          Sign Out
        </NavLink>
        <NavLink to='/profiles' className='nav-link'>
          Profiles
        </NavLink>
      </Fragment>
    )
  } else {
    return (
      <Fragment>
        <NavLink to='/change-password' className='nav-link'>
          Change Password
        </NavLink>
        <NavLink to='/profiles/create' className='nav-link'>
          Create Buff Profile
        </NavLink>
        <NavLink to='/buffposts/create' className='nav-link'>
          Post a Buff Post
        </NavLink>
        <NavLink to='/sign-out' className='nav-link'>
          Sign Out
        </NavLink>
      </Fragment>
    )
  }
}

const unauthenticatedOptions = (
  <>
    <NavLink to='/sign-up' className='nav-link'>
      Sign Up
    </NavLink>
    <NavLink to='/sign-in' className='nav-link'>
      Sign In
    </NavLink>
  </>
)

const alwaysOptions = (
  <Fragment>
    <NavLink to='/' className='nav-link'>
      Home
    </NavLink>
    <NavLink to='/rules' className='nav-link'>
      Buff Rules
    </NavLink>
    <NavLink to='/buffposts' className='nav-link'>
          Buff Posts
    </NavLink>
    <NavLink to='/profiles/' className='nav-link'>
          Buff Profiles
    </NavLink>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg='primary' variant='dark' expand='md'>
    <Container>
      <Navbar.Brand>
        <Link to='/' style={{ color: '#FFF', textDecoration: 'none' }}>
          Weights Before Dates
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='basic-navbar-nav' />
      <Navbar.Collapse id='basic-navbar-nav'>
        <Nav className='ms-auto'>
          {user && (
            <span className='navbar-text me-2'>Welcome, {user.email}</span>
          )}
          {alwaysOptions}
          {user ? authenticatedOptions({ user }) : unauthenticatedOptions}
        </Nav>
      </Navbar.Collapse>
    </Container>
  </Navbar>
)

export default Header
