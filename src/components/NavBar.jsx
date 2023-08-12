import React, { useState, useEffect } from 'react';
import '../css/NavBar.css';
import CreateUserForm from './CreateUserForm';
import { Button, Badge } from 'react-bootstrap';
import { FaShoppingCart } from 'react-icons/fa';
import { Link, useNavigate, useLocation } from 'react-router-dom';


const Navbar = ({basketCount}) => {
  // const [basket, setBasket] = useState([]);
   const [basketCounter, setBasketCounter] = useState(0);

  const [showForm, setShowForm] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState();
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const handleToggleForm = () => {
    setShowForm(true);
  };
  const handleCloseForm = () => {
    setShowForm(false);
  };
  const handleLogout = () => {
    // Clear the logged-in user from localStorage
    localStorage.removeItem('loggedInUser');
    // Clear the logged-in user state in the component
    setLoggedInUser('');
    navigate(`/`);
  };
  const handleUserCreated = () => {
    // Reload the Navbar to reflect the new user information
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setLoggedInUser(storedUser.name);
  };

  useEffect(() => {
    //Check if the user is already logged in
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (storedUser) {
      setLoggedInUser(storedUser);
    }
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if (storedBasket?.length > basketCounter ) {
      setBasketCounter(basketCounter + 1);
      // setBasket(storedBasket);
    }
  }, []);

  const handleLogin = (user) => {
    setLoggedInUser(user);
  };

  return (
    <>
      {
        !(currentPath === "/admin" || currentPath === "/admin-backoffices") && (
          <nav className={`navbar navbar-expand-lg`}>
            <div className="container">
              <a className="navbar-brand" href="/">
                <img src="logo.png" alt="Logo" className="navbar-logo" />
              </a>
              <button
                className="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse justify-content-end text-white" id="navbarNav">
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/shop">
                      Shop
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/">
                      Home
                    </a>  
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/about">
                      About
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link text-white" href="/quote-form">
                      Get Quote
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link login" href="#" onClick={loggedInUser?.name ? handleLogout : handleToggleForm}>
                      {loggedInUser?.name ? (
                        <div>Logout</div>
                      ) : (
                        <span>Sign In</span>
                      )}
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link basket-icon" href="/basket">
                      <FaShoppingCart />
                      <Badge pill bg="warning" className="basket-badge text-black">
                        {basketCount.length}
                      </Badge>
                    </a>
                  </li>
                  <li>
                    {loggedInUser?.name && (
                      <Link className='text-decoration-none' to={"/orderDetails"}>
                      <div className='user-initial'>
                        {loggedInUser?.name}
                      </div>
                      </Link>
                    )
                    } 
                  </li>
                </ul>
              </div>
            </div>
            {showForm && (
              <div className="form-container">
                <CreateUserForm onClose={handleCloseForm} onLogin={handleLogin} onLogout={handleLogout} onUserCreated={handleUserCreated} />
              </div>
            )}
          </nav>
      )}
    </>
  );
};

export default Navbar;
