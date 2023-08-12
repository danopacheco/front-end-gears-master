import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "../css/BackofficeNavBar.css";
import { Link } from 'react-router-dom';

const BackofficeNavbar = ({ userName, onLogout, handleLinkClick }) => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Navbar.Brand>Backoffice</Navbar.Brand>
      <Navbar.Toggle aria-controls="backoffice-navbar" />
      <Navbar.Collapse id="backoffice-navbar">
        <Nav className="mr-auto">
          <Nav.Item>
            <Nav.Link onClick={() => handleLinkClick('dashboard')}>Quotes</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleLinkClick('roster')}>Roster</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleLinkClick('mechanic')}>Mechanic</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={() => handleLinkClick('editproducts')}>Edit Products</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Navbar.Text className="mr-3"></Navbar.Text>
          <Link variant="outline-light" to={'/'}>Logout</Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default BackofficeNavbar;
