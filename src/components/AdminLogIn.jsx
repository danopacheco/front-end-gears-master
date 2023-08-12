import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/CreateUserForm.css';
import { useNavigate } from 'react-router-dom';

const AdminLogin = ({setTheLoginAdmin, onClose}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(true)
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
        if (data.role === 'admin') {
          setErrorLogin(false)
          navigate('/admin-backoffices');
          //aqui pasarle data y el otro componeent solo haz una comprobacion de si es admin pasa y si no no pasa
          setTheLoginAdmin(true);
          localStorage.setItem('loggedInUser', JSON.stringify(data.name));
          onClose();
          return null;
      } else {
        setErrorLogin(false)
        navigate('/admin');
      }
      })
      .catch(error => {
        console.error(error); // Handle any errors
      });
  };
  


  return (
    <div className="form-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="create-user-form">
        <div className="close-button-container">
          <button className="close-button">
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
          {
            errorLogin === false && (
              <div className='text-danger text-alig-center'>Wrong credentials</div>
            )
          }

          <div className="text-center mt-3">
            <Button className="submit-button" variant="primary" type="submit">
              LogIn
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AdminLogin;
