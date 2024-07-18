import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './landingPage.css';
import { useSelector } from 'react-redux';

export default function LandingPage() {
  const navigate = useNavigate();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const handleLoginClick = () => {
    if (userInfo) {
      alert('You are already logged in');
    } else {
      navigate('/login');
    }
  };

  const handleRegClick = () => {
    if (userInfo) {
      alert('You are already logged in');
    } else {
      navigate('/register');
    }
  };

  return (
    <div className="main">
      <Container>
        <Row>
          <div className='intro-text'>
            <div>
              <h1 className='title'>Welcome to CoffeeScribe: Unleash your creativity, one note at a time</h1>
            </div>
            <div className='button'>
              <button className='landingButton' onClick={handleLoginClick}>Login</button>
              <button className='landingButton' onClick={handleRegClick}>Signup</button>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}
