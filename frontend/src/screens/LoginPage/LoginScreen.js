import React from 'react';
import { useState } from 'react'
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import MainScreen from '../../components/MainScreen';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './LoginScreen.css'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/Erroressage';
import { useDispatch ,useSelector} from 'react-redux';
import { login } from '../../actions/userActions';
import { useNavigate } from 'react-router-dom';

function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const userLogin=useSelector((state)=>state.userLogin);
const {loading,error,userInfo} =userLogin;
useEffect(() => {
  if (userInfo) {
   navigate("/myNotes")
  }
}, [navigate, userInfo]);

const submitHandler = async(e) => {
   e.preventDefault();
   dispatch(login(email,password))
    }
  return (
    <div>
      <MainScreen title="Login">
      {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
      {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email
            "
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New user ? <Link to="/register">Register now..</Link>
          </Col>
        </Row>
      </MainScreen>
    </div>
  )
}

export default LoginScreen;
