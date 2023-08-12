import React, { useEffect, useState } from 'react';
import { Container, Table } from 'react-bootstrap';

const UserOrderDetails = () => {
  const [orders, setOrders] = useState();
  const [rowDataFromDataBase, setRowDataFromDataBase] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('loggedInUser'));
    setOrders(data);
    fetch(`http://localhost:4000/invoice/${data.Id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // Handle the data here

        // Create an array to store all the fetch requests for invoice details
        const fetchPromises = data.map((invoice) =>
          fetch(`http://localhost:4000/invoice-details/${invoice.id}`)
            .then((response) => {
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              return response.json();
            })
        );

        // Use Promise.all() to wait for all fetch requests to complete
        Promise.all(fetchPromises)
          .then((detailsDataArray) => {
            // Handle the array of invoice details data here
            setRowDataFromDataBase(detailsDataArray);
            // Now you have an array of invoice details for each invoice in data
            // You can use this detailsDataArray to work with the invoice details
          })
          .catch((error) => {
            console.error('Error fetching invoice details:', error);
          });
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the JSON data from the response
      })
      .then((detailsData) => {
        // Handle the data from the second fetch (invoice details)
        setRowDataFromDataBase(detailsData);
      })
      .catch((error) => {
        console.error('Error fetching invoices:', error);
      });


  }, []);
  return (
    <Container>
      <h2 className='text-center m-5'>Order Details</h2>
      {
        <>
          <h3>Quotes Requested</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th className="bg-danger text-white">Order ID</th>
                <th className="bg-danger text-white">Service Type</th>
                <th className="bg-danger text-white">Plate Number</th>
                <th className="bg-danger text-white">Model Type</th>
                <th className="bg-danger text-white">Status</th>
                <th className="bg-danger text-white">Appointment Date</th>
              </tr>
            </thead>
            <tbody>
              {
                orders?.quoteforms?.map(e => {
                  return (
                    <tr key={e?.id}>
                      <td>{e?.id}</td>
                      <td>{e?.serviceType}</td>
                      <td>{e?.plateNumber}</td>
                      <td>{e?.modelType}</td>
                      <td>{e?.status}</td>
                      <td>{e ? new Date(e.appointmentDate).toLocaleDateString() : 'No appointment date available'}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </Table>
          <h3>Baskets</h3>
          {
            rowDataFromDataBase?.map(e => {
              return (
                <Table bordered hover responsive key={e.id}>
                <thead>
                  <tr>
                    <th className="bg-dark text-white">Brand</th>
                    <th className="bg-dark text-white">Product</th>
                    <th className="bg-dark text-white">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {e?.map((order) => (
                    <React.Fragment key={order?.id}>
                      <tr>
                        <td>{order?.brand}</td>
                        <td>{order?.productName}</td>
                        <td>$ {order?.price}.00</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </Table>
              )
            })
          }
        </>
      }
    </Container>
  );
};

export default UserOrderDetails;
