import '../css/MainScreen.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { GiTyre } from 'react-icons/gi';
import { FaOilCan } from 'react-icons/fa';
import { FaCarSide } from 'react-icons/fa';
import { FaTools } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const cardData = [
  {
    priceFrom: 150,
    priceTo: 350, 
    image: <FaTools />,
    title: 'Annual Service',
    description: `• All services carried out at manufacturer's recommended intervals.
    • Using only manufacturer approved parts we continue your warranty`,
    serviceType: 'annual-service', // Add serviceType to each card data
  },
  {
    priceFrom: 100,
    priceTo: 200, 
    image: <FaOilCan />,
    title: 'Major Service',
    description: '• Regular servicing delivers added safety and better fuel efficiency.',
    serviceType: 'major-service', // Add serviceType to each card data
  },
  {
    priceFrom: 300,
    priceTo: 600, 
    image: <FaCarSide />,
    title: 'Repair/Fault',
    description: `• Over half of cars tested fail first time because they haven’t been checked.
    • If you fail after our NCT First Time Pass service, we’ll pay for the retest.*`,
    serviceType: 'repair-fault', // Add serviceType to each card data
  },
  {
    priceFrom: 999,
    priceTo: 3000, 
    image: <GiTyre />,
    title: 'Major Repair',
    description: `• We stock a huge range of tyres from all leading tyre manufacturers.
    • We have tyre options for all cars to suit all budgets.`,
    serviceType: 'major-repair', // Add serviceType to each card data
  },
  // Add more card data objects as needed
];

const MainScreen = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleCardClick = () => {
    navigate(`/quote-form`);
  };

  return (
    <>
    <div className="container-fluid main-screen align-items-center justify-content-center">
      <div className="main-text">
        <h1>You drive, we care</h1>
      </div>
    </div>
      <Container className="mt-5">
        <Row className="justify-content-center">
          {cardData.map((card, index) => (
            <Col key={index} md={3} className="mb-4">
              <div className="card card-transparent fixed-card">
                <div className="card-image">{card.image}</div>
                <div className="card-overlay">
                  <div className="card-body">
                    <h5 className="card-title">{card.title}</h5>
                    <p className="card-text">{card.description}</p>
                    <p className="card-text text-danger">${card.priceFrom}.00 - ${card.priceTo}.00</p>
                    <button
                      className="btn btn-warning button-fixed"
                      onClick={() => handleCardClick()} // Call handleCardClick with serviceType
                    >
                      Get a Quote
                    </button>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
      </>
  );
};

export default MainScreen;
