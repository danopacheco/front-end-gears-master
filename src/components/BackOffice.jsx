import React, { useState, useEffect } from 'react';
import { Table } from 'react-bootstrap';
import '../css/Backoffice.css';
import BackofficeNavbar from './BackofficeNavbar';
import { Modal, Button } from 'react-bootstrap';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoicePDF from './InvoicePDF';
import { AiFillDelete } from 'react-icons/ai';
import EditProductsForm from './EditProductsForm';
import MechanicProfile from './MechanicProfile';
import Rooster from './Rooster';


const OrderTable = () => {
  const [selectedHeader, setSelectedHeader] = useState('Arriving Orders');
  const [quotes, setQuotes] = useState([]);
  const [changeView, setChangeView] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showModalInvoice, setShowModalInvoice] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState(null);
  const [mechanicData, setMechanicData] = useState();
  const [selectedView, setSelectedView] = useState('dashboard'); // Set the default view

  // const [invoiceData, setInvoiceData] = useState();

  const [extraInfoData, setExtraInfoData] = useState({
    invoiceNumber: '',
    clientName: '',
  });

  const handleExtraInfoChange = (field, value) => {
    setExtraInfoData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };
  const [serviceDetails, setServiceDetails] = useState([
    {
      serviceDescription: '',
      note: '',
      amount: '',
      serviceTotal: '',
    },
  ]);
  const [partDetails, setPartDetails] = useState([
    {
      partName: '',
      quantity: '',
      unitAmount: '',
      partTotal: '',
    },
  ]);

  const handleServiceDetailChange = (index, field, value) => {
    const updatedServiceDetails = [...serviceDetails];
    updatedServiceDetails[index][field] = value;
    setServiceDetails(updatedServiceDetails);
  };

  const handlePartDetailChange = (index, field, value) => {
    const updatedPartDetails = [...partDetails];
    updatedPartDetails[index][field] = value;
    setPartDetails(updatedPartDetails);
  };


  const headers = ['Arriving Orders', 'In Progress', 'Ready'];

  useEffect(() => {
    fetchQuotes();

  }, []);

  const fetchQuotes = () => {
    fetch('http://localhost:4000/getQuotes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setQuotes(data);
      })
      .catch((error) => {
        console.error('Error fetching quotes:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const handleHeaderClick = (header) => {
    setSelectedHeader(header);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  };
  const handleInProgressButtonClick = (id) => {
    setSelectedQuoteId(id);
    setShowModal(true);
    fetchMechanicData();
  };
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedQuoteId(null);
    setMechanicData([]);
  };
  const handleCloseModalInvoice = () => {
    setShowModalInvoice(false);
  }
  const handleReadyButtonClick = (selectedQuoteId, id) => {
    // Make the API call to update the mechanic's status
    fetch(`http://localhost:4000/setStatusQuote/${selectedQuoteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_mechanic: id, sta: 'ready' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // You can update the state or perform any other necessary action
        setShowModal(false);
        setSelectedQuoteId(null);
        setMechanicData([]);
        updateStatus(selectedQuoteId, 'ready');
      })
      .catch((error) => {
        console.error('Error assigning quote:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };
  const handleDownloadPDFButtonClick = async (id) => {
    setShowModalInvoice(true);
    // try {
    //   const response = await fetch(`/getPdfInvoice?id=${id}`);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }

    //   const data = await response.json();
    //   setInvoiceData(data); // Set the retrieved data into the invoiceData array
    // } catch (error) {
    //   console.error('Error fetching PDF invoice:', error);
    // }
  };

  const updateStatus = (id, status) => {
    fetch('http://localhost:4000/changeStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, status }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Update the state or perform any other necessary action
        fetchQuotes(); // Fetch updated quotes from the server
      })
      .catch((error) => {
        console.error('Error updating status:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const fetchMechanicData = () => {
    fetch('http://localhost:4000/getMechanics')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setMechanicData(data);
      })
      .catch((error) => {
        console.error('Error fetching mechanic data:', error);
      });
  };

  const renderTableData = () => {
    // Filter quotes based on the selected header
    let filteredQuotes = quotes;
    if (selectedHeader === 'In Progress') {
      filteredQuotes = quotes.filter((quote) => quote.status === 'In Progress');
    } else if (selectedHeader === 'Ready') {
      filteredQuotes = quotes.filter((quote) => quote.status === 'ready');
    } else {
      filteredQuotes = quotes.filter((quote) => quote.status === 'created');
    }

    return filteredQuotes.map((quote) => (
      <tr key={quote.id}>
        <td>{quote.id}</td>
        <td>{quote.fullname}</td>
        <td>{quote.email}</td>
        <td>{quote.phoneNumber}</td>
        <td>{quote.modelType}</td>
        <td>{quote.serviceType}</td>
        <td>{formatDate(quote.appointmentDate)}</td>
        <td>
          {selectedHeader === 'Arriving Orders' && (
            <button onClick={() => handleInProgressButtonClick(quote.id)}>
              Assign
            </button>
          )}
          {selectedHeader === 'In Progress' && (
            <>
              <button onClick={() => handleReadyButtonClick(quote.id, quote.id_mechanic)}>Ready</button>
            </>
          )}
          {selectedHeader === 'Ready' && (
            <>
              <button className='m-2' onClick={() => handleDownloadPDFButtonClick(quote.id)}>Create Invoice</button>
              {
                (extraInfoData.invoiceNumber == quote.id) && (
                  <PDFDownloadLink
                    className="save-changes-button"
                    document={<InvoicePDF serviceDetails={serviceDetails} partDetails={partDetails} extraInfoData={extraInfoData} />}
                    fileName="invoice.pdf"
                  >
                    {({ blob, url, loading, error }) =>
                      loading ? 'Loading document...' : 'Download PDF'
                    }
                  </PDFDownloadLink>

                )
              }
            </>
          )}
        </td>
      </tr>
    ));
  };


  const handleLinkClick = (path) => {
    setSelectedView(path);

  };

  const assignQuoteToMechanic = (selectedQuoteId, id) => {
    // Make the API call to update the mechanic's status
    fetch(`http://localhost:4000/setStatusQuote/${selectedQuoteId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id_mechanic: id, status: 'In Progress' }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // You can update the state or perform any other necessary action
        setShowModal(false);
        setSelectedQuoteId(null);
        setMechanicData([]);
        updateStatus(selectedQuoteId, 'In Progress');
      })
      .catch((error) => {
        console.error('Error assigning quote:', error);
        // Handle error here, e.g., show an error message to the user
      });
  };

  const addServiceDetail = () => {
    setServiceDetails([...serviceDetails, { serviceDescription: '', note: '', amount: '', total: '' }]);
  };

  const deleteServiceDetail = (index) => {
    const updatedServiceDetails = serviceDetails.filter((_, i) => i !== index);
    setServiceDetails(updatedServiceDetails);
  };

  const addPartDetail = () => {
    setPartDetails([...partDetails, { partDescription: '', quantity: '', unitAmount: '', partTotal: '' }]);
  };

  const deletePartDetail = (index) => {
    const updatedPartDetails = partDetails.filter((_, i) => i !== index);
    setPartDetails([...updatedPartDetails]);
  };

  const handleSaveInvoice = () => {
    const newInvoiceData = {
      invoiceNumber: document.getElementById('invoiceNumber').value,
      clientName: document.getElementById('clientName').value,
      serviceDetails: serviceDetails,
      partDetails: partDetails,
    };

    // Save the invoice data in localStorage
    localStorage.setItem('invoiceGeneratedDetails', JSON.stringify(newInvoiceData));

    // Close the modal
    setShowModalInvoice(false);
  };


  return (
    <>
      <BackofficeNavbar handleLinkClick={handleLinkClick} />
      {/* Aqui vamos a gregar todas las condiconales que iremos dandole click para que se renderize cada tabla dinamicamente */}
      {selectedView === 'editproducts' && <EditProductsForm />}
      {selectedView === 'mechanic' && (<MechanicProfile />)}
      {selectedView === 'roster' && (<Rooster />)}
      {selectedView === 'dashboard' && (
        <>
          <div className="order-section mb-5">
            <h3 className="order-status">Order Status</h3>
            <div className="header-buttons">
              {headers.map((header) => (
                <button
                  key={header}
                  className={`header-button ${selectedHeader === header ? 'active' : ''
                    }`}
                  onClick={() => handleHeaderClick(header)}
                >
                  {header}
                </button>
              ))}
            </div>
            <Table striped bordered hover className="order-table">
              <thead>
                <tr>
                  <th>Invoice Number</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Model</th>
                  <th>Service</th>
                  <th>Appointment</th>
                  <th>Status</th>
                  {/* <th>Actions</th>
              <th>Delete</th> */}
                </tr>
              </thead>
              <tbody>{renderTableData()}</tbody>
            </Table>
          </div>
          <Modal className='modal-main-box' show={showModal} onHide={handleCloseModal} size="xl" >
            <Modal.Header closeButton>
              <Modal.Title>Mechanic Data</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="mechanic-list">
                {mechanicData?.map((mechanic) => (
                  <div key={mechanic.id} className="mechanic-item d-flex border p-3 mb-3">
                    <div className="flex-grow-1">
                      <p><strong>Name:</strong> {mechanic.name}</p>
                      <p><strong>Phone:</strong> {mechanic.telephone}</p>
                      <p><strong>Status:</strong> {mechanic.status}</p>
                    </div>
                    <button
                      className={`btn btn-sm ${mechanic.status === 'busy' ? 'btn-secondary disabled' : 'btn-success'}`}
                      onClick={() => assignQuoteToMechanic(selectedQuoteId, mechanic.id)}
                      disabled={mechanic.status === 'busy'} // Disable if status is "busy"
                      style={{ display: 'block', margin: '0 auto', height: '50px' }}
                    >
                      Assign Quote
                    </button>

                  </div>
                ))}
              </div>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>


          </Modal>
          <Modal className='modal-main-box' show={showModalInvoice} onHide={handleCloseModalInvoice} size="xl">
            <Modal.Header closeButton>
              <Modal.Title>Generate Invoice</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form>
                <div className="row">
                  <div className="col-md-12 d-flex">
                    <div className="form-group">
                      <label htmlFor="invoiceNumber">Invoice Number</label>
                      <input
                        type="text"
                        className="form-control"
                        id="invoiceNumber"
                        name="invoiceNumber"
                        value={extraInfoData.invoiceNumber}
                        onChange={(event) =>
                          handleExtraInfoChange('invoiceNumber', event.target.value)
                        }
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="clientName">Client Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="clientName"
                        name="clientName"
                        value={extraInfoData.clientName}
                        onChange={(event) =>
                          handleExtraInfoChange('clientName', event.target.value)
                        }
                      />
                    </div>
                  </div>
                  <div className='mt-2'>
                    <h3>Service Details <Button className="btn btn-primary" style={{ cursor: 'pointer' }} onClick={addServiceDetail}>+</Button></h3>
                  </div>
                  {serviceDetails.map((service, index) => (
                    <div key={index} className="col-md-12 d-flex">
                      <div className="form-group">
                        <label htmlFor={`serviceDescription-${index}`}>Description</label>
                        <textarea
                          className="form-control"
                          id={`serviceDescription-${index}`}
                          name={`serviceDescription-${index}`}
                          rows="1"
                          value={service.serviceDescription}
                          onChange={(event) =>
                            handleServiceDetailChange(index, 'serviceDescription', event.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor={`note-${index}`}>Note</label>
                        <textarea
                          className="form-control"
                          id={`note-${index}`}
                          name={`note-${index}`}
                          rows="1"
                          value={service.note}
                          onChange={(event) =>
                            handleServiceDetailChange(index, 'note', event.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor={`amount-${index}`}>Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`amount-${index}`}
                          name={`amount-${index}`}
                          value={service.amount}
                          onChange={(event) =>
                            handleServiceDetailChange(index, 'amount', event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`total-${index}`}>Total</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`total-${index}`}
                          name={`total-${index}`}
                          value={service.total}
                          onChange={(event) =>
                            handleServiceDetailChange(index, 'total', event.target.value)
                          }
                        />
                      </div>
                      <Button variant="danger" onClick={() => deleteServiceDetail(index)}>
                        <AiFillDelete />
                      </Button>
                    </div>
                  ))}

                </div>
                <div className="row">
                  <div className='mt-2'>
                    <h3>Part Details <Button className="btn btn-primary" style={{ cursor: 'pointer' }} onClick={addPartDetail}>+</Button></h3>
                  </div>
                  {partDetails.map((part, index) => (
                    <div key={index} className="col-md-12 d-flex">
                      <div className="form-group">
                        <label htmlFor={`partDescription-${index}`}>Part Name</label>
                        <textarea
                          className="form-control"
                          id={`partDescription-${index}`}
                          name={`partDescription-${index}`}
                          rows="1"
                          value={part.partDescription}
                          onChange={(event) =>
                            handlePartDetailChange(index, 'partDescription', event.target.value)
                          }
                        ></textarea>
                      </div>
                      <div className="form-group">
                        <label htmlFor={`quantity-${index}`}>Quantity</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`quantity-${index}`}
                          name={`quantity-${index}`}
                          value={part.quantity}
                          onChange={(event) =>
                            handlePartDetailChange(index, 'quantity', event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`unit-${index}`}>Unit Amount</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`unit-${index}`}
                          name={`unit-${index}`}
                          value={part.unitAmount}
                          onChange={(event) =>
                            handlePartDetailChange(index, 'unitAmount', event.target.value)
                          }
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor={`total-${index}`}>Total</label>
                        <input
                          type="number"
                          className="form-control"
                          id={`total-${index}`}
                          name={`total-${index}`}
                          value={part.total}
                          onChange={(event) =>
                            handlePartDetailChange(index, 'total', event.target.value)
                          }
                        />
                      </div>
                      <Button variant="danger" onClick={() => deletePartDetail(index)}>
                        <AiFillDelete />
                      </Button>
                    </div>
                  ))}
                </div>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModalInvoice}>
                Close
              </Button>
              <Button variant="primary" onClick={handleSaveInvoice}>
                Save Invoice
              </Button>
            </Modal.Footer>
          </Modal >
        </>
      )}

    </>
  );
};



export default OrderTable;
