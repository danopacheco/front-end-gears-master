import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import "../css/QuoteForm.css"
const QuoteFormPage = () => {
  const [modelTypes, setModelTypes] = useState([]);
  const [serviceType, setServiceType] = useState([]);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formSubmittedLoggin, setFormSubmittedLoggin] = useState(true);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    plateNumber: '',
    modelType: '',
    serviceType: '',
    engineType: '',
    appointmentDate: null,
    description:"",
    status: 'created',
  });
  const engineType = [    
    {engineType: "Gas"},
    {engineType : "Hybrid"},
    {engineType: "Electric"}
  ]
  const dataUser = JSON.parse(localStorage.getItem("loggedInUser"));
  const handleChange = (name, value) => {
    if (name === 'appointmentDate') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  useEffect(() => {
    if(dataUser?.name) {
      setFormData({
        fullName: dataUser.name,
        email: dataUser.email,
      });
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(dataUser?.name){
      const introducingKeyData = { ...formData, user_key: dataUser.id };
      fetch('http://localhost:4000/submitQuoteForm', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(introducingKeyData),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          } 
          return response.json();
        })
        .then((data) => {
          // Clear the form after successful submission
          setFormData({
            fullName: '',
            email: '',
            phoneNumber: '',
            plateNumber: '',
            modelType: '',
            serviceType: '',
            engineType: '',
            appointmentDate: null,
            description:"",
            status: "created",
          });
          setFormSubmitted(true);
        })
        .catch((error) => {
          console.error('Error submitting form data:', error);
        });
    }else{
      setFormSubmittedLoggin(false);
    };
    }
  const currentDate = new Date();

  const disableSundays = (date) => {
    return date.getDay() !== 0; // Return false for Sundays (0), true otherwise
  };

  useEffect(() => {
    fetch('http://localhost:4000/getCarbrand')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched model types const [formSubmitted, setFormSubmitted] = useState(false);
        setModelTypes(data);

      })
      .catch((error) => {
        console.error('Error fetching model types:', error);
      });

    fetch('http://localhost:4000/getServiceType')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the state with the fetched service types
        setServiceType(data);
      })
      .catch((error) => {
        console.error('Error fetching service types:', error);
      });
  }, []);

  return (
    <Container className="mb-5 p-5">
      {
        formSubmitted ? ( // Mostrar el mensaje de agradecimiento si el formulario se ha enviado
          <div className="text-center">
            <h2>¡Thankyou por your quote!</h2>
            
          </div>
        ) : (
          <>
            <h1 className="text-center">Get a Quote</h1>
            <Form onSubmit={handleSubmit} className='mainForm'>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="fullName">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleChange('fullName', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="email"
                      value={formData.email}
                      onChange={(e) => handleChange('email', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="plateNumber">
                    <Form.Label>Plate Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="plateNumber"
                      value={formData.plateNumber}
                      onChange={(e) => handleChange('plateNumber', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="modelType">
                    <Form.Label>Model Type</Form.Label>
                    {/* Replace Form.Control with Form.Select */}
                    <Form.Select
                      name="modelType"
                      value={formData.modelType}
                      onChange={(e) => handleChange('modelType', e.target.value)}
                      required
                    >
                      <option value="">Select Model Type</option>
                      {modelTypes.map((type, index) => (
                        <option key={index} value={type?.brand}>
                          {type?.brand} - {type?.model}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="serviceType">
                    <Form.Label>Service Type</Form.Label>
                    <Form.Select
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={(e) => handleChange('serviceType', e.target.value)}
                      required
                    >
                      <option value="">Select Service Type</option>
                      {serviceType.map((type, index) => (
                        <option key={index} value={type?.serviceType}>
                          {type?.serviceType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="engineType">
                    <Form.Label>Engine Type</Form.Label>
                    <Form.Select
                      name="engineType"
                      value={formData.engineType}
                      onChange={(e) => handleChange('engineType', e.target.value)}
                      required
                    >
                      <option value="">Select Service Type</option>
                      {engineType.map((type, index) => (
                        <option key={index} value={type.engineType}>
                          {type.engineType}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <Row>
                <Col md={6}>
                  <Form.Group controlId="appointmentDate">
                    <Form.Label>Appointment Date</Form.Label>
                    <br />
                    <DatePicker
                      selected={formData.appointmentDate}
                      onChange={(date) => handleChange('appointmentDate', date)}
                      dateFormat="dd/MM/yyyy"
                      minDate={currentDate} // Set the minimum selectable date to the current date
                      filterDate={disableSundays} // Apply the custom filter to disable Sundays
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="phoneNumber">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={(e) => handleChange('phoneNumber', e.target.value)}
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Col md={12}>
                  <Form.Group controlId="description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      value={formData.description}
                      onChange={(e) => handleChange('description', e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className="text-center mt-4">
                <Button variant="warning" type="submit">
                  Submit
                </Button>
                {
                  !formSubmittedLoggin && <div className='text-danger'>You have to login first</div>
                }
              </div>
            </Form>
          </>
        )}
    </Container>
  );
};

export default QuoteFormPage;
