import React from 'react'
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux'
import{ LinkContainer} from 'react-router-bootstrap';
import { logout } from '../actions/userActions';
import SearchBox from './SearchBox';
import { Routes,Route } from 'react-router-dom';

const Header = () => {
    const userLogin = useSelector(state => state.userLogin);
    const {userInfo} = userLogin;
    const userDetails = useSelector(state => state.userDetails);
    const {user} = userDetails;
    const dispatch = useDispatch();
    const logoutHandler = () => {
      dispatch(logout());
    }
    return (
        <header>
            <Navbar bg="dark" expand="lg" variant="dark" collapseOnSelect>
                <Container>
                  <LinkContainer to = '/'>
                    <Navbar.Brand>AtomShop</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                     <SearchBox></SearchBox>
                    <Nav className="ms-auto">
                    <LinkContainer to = '/cart'>
                        <Nav.Link ><i className="fas fa-shopping-cart"></i>CART</Nav.Link>
                    </LinkContainer>
                    {user && userInfo ? (
                      <NavDropdown title={userInfo.name || user.name} id='username'>
                          <LinkContainer to='/profile'>
                              <NavDropdown.Item>Profile</NavDropdown.Item> 
                          </LinkContainer>
                          <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                      </NavDropdown>
                    ) : 
                        <LinkContainer to= '/login'>
                        <Nav.Link><i className="fas fa-user"></i>SIGN IN</Nav.Link>
                        </LinkContainer>
                    }
                     {userInfo && userInfo.isAdmin && (
                         <NavDropdown title= 'Admin' id='adminmenue'>
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
                    
                    </Nav>
                    </Navbar.Collapse>
                </Container>
          </Navbar>
        </header>
    )
}

export default Header



