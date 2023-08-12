import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import '../css/CreateUserForm.css';
import LoginForm from './LoginForm';

const CreateUserForm = ({ onLogin ,onClose, onUserCreated }) => {
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    password: '',
    confirmPassword: '',
    role:'user'
  });

  const [showLoginForm, setShowLoginForm] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Send the form data to the server
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        // Handle the error if the request was not successful
        throw new Error('Failed to create user');
      }
  
      const responseData = await response.json(); // Parse the JSON response
  
      // Extract the ID from the response data
      const createdUserId = responseData.id;
  
      // Reset the form
      setFormData({
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: 'user',
      });
  
      // Close the modal
      onClose();
  
      // Set the logged-in user
      localStorage.setItem('loggedInUser', JSON.stringify({...formData, id: createdUserId}));
  
      // Invoke the onUserCreated callback to indicate that a new user was created
      onUserCreated();
  
      // Update the state variable to indicate that the user is now registered
  
      // Handle the successful response, including the ID
    } catch (error) {
      console.error(error);
      // Handle the error here, show an error message, etc.
    }
  };
  
  const handleToggleLoginForm = () => {
    setShowLoginForm(!showLoginForm);
  };
  return (
    <div className="form-container d-flex align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
      <div className="create-user-form">
        <div className="close-button-container">
          <button className="close-button" onClick={onClose}>
            &times;
          </button>
        </div>
        <h2 className="text-center mb-4">Create User</h2>

        {/* Conditionally render the Login component if the user is already registered */}
        {showLoginForm ? (
          <LoginForm  onClose={onClose} onLogin={onLogin}/>
        ) : (
          <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>name:</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="surname">
            <Form.Label>surname:</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="email">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="password">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword">
            <Form.Label>Confirm Password:</Form.Label>
            <Form.Control
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>

            <div className="text-center mt-3">
              <Button className="submit-button" variant="primary" type="submit">
                Create
              </Button>
            </div>
            <div className='login-button' onClick={handleToggleLoginForm}> Already a user? Log in here</div>
          </Form>
        )}
      </div>
    </div>
  );
};

export default CreateUserForm;
