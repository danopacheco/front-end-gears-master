import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/Footer.css"
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const currentPath = location.pathname;
  return (
    <>
    {
      currentPath === "/admin" || currentPath === "/admin-backoffices" 
      ?
      <div></div>
      :<footer className="footer text-light py-3">
        <div className="container text-center">
          <p>&copy; 2023 Your Company. All rights reserved.</p>
          <p>Address: 123 Main Street, City, Country</p>
          <p>Email: info@yourcompany.com</p>
          <p>Phone: +1 123-456-7890</p>
        </div>
      </footer>

    }
    </>
  );
};

export default Footer;
