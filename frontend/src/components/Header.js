import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { logout } from '../actions/userActions'
import SearchBox from './SearchBox'
import { Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Header = () => {
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const navigate = useNavigate()

  const logoutHandler = () => {
    dispatch(logout())
    navigate('/')
  }
  return (
    <header className='sticky-top'>
      <Navbar bg='dark' variant='dark' collapseOnSelect expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand href='/' className='fs-1'>
              PETSHOP
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <SearchBox />
            <Nav className='ms-auto'>
              {userInfo ? (
                <NavDropdown
                  title={userInfo.name}
                  id='username'
                  className='fs-4'
                >
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    {' '}
                    <i className='fas fa-user'></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title='admin' id='adminmenue' className='fs-4'>
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/petlist'>
                    <NavDropdown.Item>Pets</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
