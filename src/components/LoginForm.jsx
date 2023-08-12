import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/CreateUserForm.css';
import { useLocation, useNavigate } from 'react-router-dom';

const LoginForm = ({onLogin,onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState('');
  const location = useLocation();
  const currentPath = location.pathname;

  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  
    const loginData = {
      email: email,
      password: password
    };
  
    fetch('http://localhost:4000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginData)
    })
      .then(response => response.json())
      .then(data => {
        setToken(data.token); // Store the token in state

        localStorage.setItem('loggedInUser', JSON.stringify(data)); 
        // setLoggedInUser(data);
        onLogin(data);
        navigate(`/`);
        onClose();
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
  };
  

  useEffect(() => {
    // Call the protected route when the token is set
    if (token) {
      fetch('http://localhost:4000/protected', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
        })
        .catch(error => {
          console.error(error); // Handle any errors
        });
    }
  }, [token]);
  

  return (
    <div className="form-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="create-user-form">
        <div className="close-button-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <h2 className="text-center mb-4">Login</h2>
        <Form onSubmit={handleSubmit}>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </Form.Group>

          <div className="text-center mt-3">
            <Button className="submit-button" variant="primary" type="submit">
              Sign in
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default LoginForm;
