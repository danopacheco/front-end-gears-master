import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Button } from 'react-bootstrap';

const JoinOurTeam = () => {
  return (
    <section className="join-our-team">
      <Container>
        <Row className="justify-content-center align-items-center mt-5 mb-5">
          <Col md={6}>
            <img src="https://bestdrive.ie/wp-content/themes/advance/images/join-our-team.jpg" alt="Join Our Team" className="img-fluid" />
          </Col>
          <Col md={6}>
            <div className="text-center text-md-start">
              <h2>Join Our Team</h2>
              <p>We are always looking for talented individuals to join our team.</p>
              <p>Benefits of joining:</p>
              <ul>
                <li>Competitive salary</li>
                <li>Flexible working hours</li>
                <li>Opportunities for growth and development</li>
              </ul>
              {/* <Button variant="primary">Apply Now</Button> */}
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default JoinOurTeam;
