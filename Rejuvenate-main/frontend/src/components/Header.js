import React from 'react';
import { Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// react Router Bootstrap used for wrapping react boot element in
// <linkcontainer> to make it behave like react Router <link>
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import { userActions_logout } from '../actions/userActions';
import SearchBox from './SearchBox';

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(userActions_logout());
    window.location.assign('/');
  };

  return (
    <>
      <header className='mb-0'>
        <Navbar
          style={{ backgroundColor: 'black' }}
          variant='dark'
          expand='lg'
          collapseOnSelect
        >
          <Container>
            <LinkContainer to='/'>
              <Navbar.Brand className='mx-2'>Rejuvenate</Navbar.Brand>
            </LinkContainer>
            <Nav className='mx-2 navbar-nav text-center d-flex flex-row flex-grow-1 justify-content-end justify-content-md-start justify-content-lg-start'>
              {userInfo ? (
                <>
                  <PersonOutlineOutlinedIcon
                    style={{ marginTop: '1.1rem' }}
                    className=' mx-1'
                  />
                  <NavDropdown
                    style={{ marginRight: '0.8rem', marginTop: '0.8rem' }}
                    className='mt-2'
                    title={userInfo.name.split(' ')[0]}
                    id='username'
                  >
                    <LinkContainer to='/profile'>
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <PersonOutlineOutlinedIcon
                      style={{ marginTop: '0.35rem', fontSize: '1.7rem' }}
                    />
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <ShoppingCartOutlinedIcon
                    style={{ marginTop: '0.4rem' }}
                    className=' mx-2'
                  />
                </Nav.Link>
              </LinkContainer>
            </Nav>
            <Navbar.Toggle aria-controls='basic-navbar-nav' />
            <Navbar.Collapse
              id='basic-navbar-nav'
              className='collapse navbar-collapse justify-content-end'
            >
              <Nav classNameName='ms-auto'>
                {userInfo && userInfo.isAdmin && (
                  <NavDropdown title='Admin' id='adminmenu'>
                    <LinkContainer to='/admin/userlist'>
                      <NavDropdown.Item>Users</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/productlist'>
                      <NavDropdown.Item>Products</NavDropdown.Item>
                    </LinkContainer>
                    <LinkContainer to='/admin/orderlist'>
                      <NavDropdown.Item>Orders</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown>
                )}
                {/* <Nav.Link>
                  <LinkContainer to={`/about`}>About</LinkContainer>
                </Nav.Link> */}
                <Route
                  render={({ history }) => <SearchBox history={history} />}
                />
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Header;
