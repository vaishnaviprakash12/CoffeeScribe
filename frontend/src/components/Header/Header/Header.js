import React from 'react';
import { Navbar, Container, Nav, NavDropdown, Form, Button } from 'react-bootstrap';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../../actions/userActions';
import { useNavigate } from 'react-router-dom';
import './Header.css';

function Header({ setSearch }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = (e) => {
    e.preventDefault();
    dispatch(logout());
    navigate("/");
  };

  return (
    <Navbar expand="lg" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/" className="text-decoration-none text-light">coffeeScribe</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          
            <Form className="d-flex ms-auto mb-2 mb-lg-0">
              {location.pathname === '/myNotes' && (<Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => setSearch(e.target.value)}
              />)}
              {location.pathname === '/myNotes' && (
              <Button variant="outline-success">Search</Button> )}
            </Form> 
        
          <Nav className="my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
            {userInfo && (
              <>
                {location.pathname === '/myNotes' && (
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                )}
                <Nav.Link as={Link} to="/myNotes">My Notes</Nav.Link>
              </>
            )}
            <NavDropdown title={userInfo ? userInfo.name : 'User'} id="navbarScrollingDropdown">
              {userInfo ? (
                <>
                  <NavDropdown.Item href="#action3">My Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </>
              ) : (
                <NavDropdown.Item as={Link} to="/login">Login</NavDropdown.Item>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header; 