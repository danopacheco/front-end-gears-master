import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Row, Col, Button } from 'react-bootstrap';
import '../css/Basket.css';
import { FaTrash } from 'react-icons/fa';
import { Navigate } from 'react-router-dom';

const Basket = ({ deleteProduct, basket }) => {
  // Retrieve the products from localStorage
  const [user, setUser] = useState();
  const [hasUser, setHasUser] = useState(false);
  const [paymentProceed, setPaymentProceed] = useState()
  const [storedProducts, setStoredProducts] = useState()
  const totalPrice = storedProducts
    ? storedProducts.reduce((sum, product) => sum + parseFloat(product.price), 0)
    : 0;
  // Calculate the total price
  useEffect(() => {
    setStoredProducts(basket);
    const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));
    setUser(storedUser);
    if (storedUser) {
      setHasUser(true);
    }
  }, [basket])
  

  const handleSendShoppingBasket = () => {
    // Perform form submission logic here
    // const storeBasket = [...storedProducts, user_id: user.Id];
    fetch(`http://localhost:4000/sendBasket/${user.Id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storedProducts),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Clear the basket after successful submission
        setPaymentProceed(true)
        localStorage.removeItem('basket');
        Navigate("/orderDetails")
      })
      .catch((error) => {
        console.error('Error sending the basket:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const Basket = () => {
    return (
      <Col sm={5}>
        <Card>
          <Card.Header as="h2">Basket Details</Card.Header>
          <Card.Body>
            {storedProducts && storedProducts.length > 0 ? (
              <ListGroup variant="flush">
                {storedProducts?.map((product) => (
                  <ListGroup.Item key={product.id} className="basket-info">
                    <div>{product.productName}</div>
                    <div className="price">€ {product.price}.00</div>
                    <Button className="bg-danger border-0" onClick={() => deleteProduct(product.id)}>
                      <FaTrash /> {/* Use the FaTrash icon from react-icons */}
                    </Button>                  
                  </ListGroup.Item>
                ))}
              </ListGroup>
            ) : (
              <p>Your basket is empty.</p>
            )}
          </Card.Body>
          {storedProducts && storedProducts.length > 0 && (
            <>
              <Card.Footer className="total-price">
                Total: €{totalPrice.toFixed(2)}
              </Card.Footer>
              {
                hasUser
                  ?
                  <Button variant="warning" className="ml-3" onClick={handleSendShoppingBasket}>
                    Pay in Shop
                  </Button>
                  :
                  <>
                    <Button variant="black" className="ml-3" disabled>
                      Pay in Shop
                      <span className="ml-3 text-danger"> - Login first</span>
                    </Button>
                  </>
              }
            </>
          )}
        </Card>
      </Col>
    )
  }
  return (
    <div className="basket-container mt-5 mb-5">
      {
        paymentProceed ? 
        <div style={{ height: '300px' }}>
          Thanks for the purchase
        </div>

        :
          <Row>
            {
              user ?
                <>
                  <Col sm={7}>
                    <Card>
                      <Card.Header as="h2">Information</Card.Header>
                      <Card.Body>
                        <ListGroup variant="flush">
                          <ListGroup.Item>
                            <strong>Name:</strong> {user?.name}
                          </ListGroup.Item>
                          <ListGroup.Item>
                            <strong>Last Name:</strong> {user?.surname}
                          </ListGroup.Item>
                          {/* <ListGroup.Item>
                            <strong>Phone:</strong> 123-456-7890
                          </ListGroup.Item> */}
                        </ListGroup>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Basket />
                </>
                :
                <div className='basket-center'>
                <Basket />
                </div>
            }
          </Row>
      }
    </div>
  );
};

export default Basket;
