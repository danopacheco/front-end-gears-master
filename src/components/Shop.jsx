import React, { useEffect, useState } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import '../css/Shop.css';

const Shop = ({addToBasket}) => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    fetchProducts();
      }, []);

  const fetchProducts = () => {
    fetch('http://localhost:4000/getProducts')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  return (
    <Container className="mt-5 mb-5">
      <h1 className="text-center">Shop</h1>
      <Row className="product-cards">
        {products.map((product) => (
          <Col key={product.id} md={3} className="mb-4">
            <Card className="product-card">
              <Card.Img variant="top" src={product.image} className="product-image" />
              <Card.Body>
                <Card.Title>{product.productName}</Card.Title>
                <Card.Text>€{product.price}</Card.Text>
                <Button variant="primary" onClick={() => addToBasket(product)}>
                  Add
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Shop;
