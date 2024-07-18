import React from 'react';
import { Row, Container } from 'react-bootstrap';
import './MainScreen.css';

const MainScreen = ({ title, children }) => {
  return (
    <div className='mainBack'>
      <Container>
        <Row className='justify-content-center'>
          <div className='page'>
            {title && (
              <>
                <h1 className='heading'>{title}</h1>
                <hr className='divider' />
              </>
            )}
            {children}
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default MainScreen;
