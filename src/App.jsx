import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import MainScreen from './components/MainScreen';
import Navbar from './components/NavBar';
import SpecialOffers from './components/SpecialOffers';
import JoinOurTeam from './components/JoinOurTeam';
import Footer from './components/Footer';
import QuoteFormPage from './components/QuoteFormPage';
import BackOffice from './components/BackOffice';
import AdminLogin from './components/AdminLogIn';
import Shop from './components/Shop';
import Basket from './components/Basket';
import AboutUs from './components/AboutUs';
import UserOrderDetails from './components/UserOrderDetails';
import MechanicProfile from './components/MechanicProfile';
import Rooster from './components/Rooster';
import EditProductsForm from './components/EditProductsForm';


const App = () => {
  return (
    <Router>
      <MyComponent />
    </Router>
  );
};

const ProtectedRoute = ({ element: Element, isLogin, navigate }) => {
  // Replace this with your actual authentication logic
  //Setear y comprobar si el usuario es admin y esta guardado en la local storage como adin ingresarllo directamente.
  // isLogin = true;
  useEffect(() => {
    //Si es admin ingresa esto viene desde la local storage
    if (!isLogin) {
      // Redirect to the login page or any other route
      navigate('/');
    }
  }, [isLogin]);

  if (isLogin) {
    return <Element />;
  } else {
    return null;
  }
};

const MyComponent = () => {
  const [theLoginAdmin, setTheLoginAdmin] = useState(false);
  const [theLogin, setTheLogin] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);


  const isAdminBackoffice = currentPath.startsWith('/admin-backoffices');


  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem('basket'));
    if (storedBasket) {
      setBasket(storedBasket);
    }
  }, [])
  const addToBasket = (product) => {
    // Check if the product is already in the basket
    if (basket.some((item) => item.id === product.id)) {
      return;
    }

    // Add the product to the basket
    const updatedBasket = [...basket, product];
    setBasket(updatedBasket);

    // Update the localStorage with the new basket
    localStorage.setItem('basket', JSON.stringify(updatedBasket));

  };

  const deleteProduct = (id) => {
    // Find the index of the product with the matching id
    const indexToDelete = basket.findIndex((product) => product.id === id);

    if (indexToDelete !== -1) {
      // Remove the product from the array using splice
      basket.splice(indexToDelete, 1);

      setBasket([...basket]);
      localStorage.setItem('basket', JSON.stringify(basket));
    } else {
      console.log(`Product with id ${id} not found.`);
    }
  };

  return (
    <>
      
      <Navbar basketCount={basket} />
      <Routes>
        <Route path="/" element={<React.Fragment> {/* Wrap the children in a <React.Fragment> */}
          <MainScreen />
          <SpecialOffers />
          <JoinOurTeam />
        </React.Fragment>} />
        <Route path="/quote-form" element={<QuoteFormPage />} />
        <Route path="/admin" element={<AdminLogin setTheLoginAdmin={setTheLoginAdmin} />} />
        <Route path="/shop" element={<Shop setTheLogin={setTheLogin} addToBasket={addToBasket} />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/orderDetails" element={<UserOrderDetails />} />
        <Route path="/basket" element={<Basket setTheLogin={setTheLogin} deleteProduct={deleteProduct} basket={basket} />} />
        <Route
          path="/admin-backoffices/*"
          element={<ProtectedRoute element={BackOffice} isLogin={theLoginAdmin} navigate={navigate} />}
        />


          {/* <>
            <Route path="/editProductForm" element={<EditProductsForm />} />
            <Route path="/mechanicProfile" element={<MechanicProfile />} />
            <Route path="/roster" element={<Rooster />} />
          </> */}
      </Routes>
      <Footer />
    </>
  );
};

export default App;
