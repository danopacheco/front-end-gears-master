import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Col } from 'react-bootstrap';

const SpecialOffers = () => {
  return (
    <section className="special-offers mt-5">
      <h2 className="text-center">Special Offers</h2>
      <div className="container mt-5">
        <Row className="justify-content-center">
          <Col sm={12} lg={4}>
            <Card>
              <Card.Img variant="top" src="https://bestdrive.ie/wp-content/uploads/2023/06/great_value_for_bestdrive_customers_.jpg" />
              <Card.Body>
                <Card.Title> BestDrive offer a super car insurance discount* to our customers with 123.ie!</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} lg={4}>
            <Card>
              <Card.Img variant="top" src="https://bestdrive.ie/wp-content/uploads/2023/04/BestDrive-Q2-Voucher-Promo-972x207-P1.jpg" />
              <Card.Body>
                <Card.Title>Get a FULL car service with BestDrive and we will reward you with a Continental Tyre Voucher worth €40*!</Card.Title>
              </Card.Body>
            </Card>
          </Col>
          <Col sm={12} lg={4} >
            <Card>
              <Card.Img variant="top" src="https://bestdrive.ie/wp-content/uploads/2023/04/BestDrive-General-Tire-Promo-972x207-P2-1.jpg" />
              <Card.Body>
                <Card.Title>General Tire – Great value on General 4×4 tyres this month with a chance to win a €500* voucher!</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default SpecialOffers;
