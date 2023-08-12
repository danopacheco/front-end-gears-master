import React, { useState, useEffect } from 'react';
const MechanicProfile = () => {
  const [mechanicData, setMechanicData] = useState([]);

  useEffect(() => {
    // Replace this with your API endpoint
    fetch('http://localhost:4000/getMechanics')
      .then(response => response.json())
      .then(data => setMechanicData(data))
      .catch(error => console.error('Error fetching mechanic data:', error));
  }, []);

  return (
    <div className="container mt-5">
      <div className="row">
        {mechanicData.map(mechanic => (
          <div key={mechanic.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{mechanic.name}</h5>
                <h6 className="card-title">{mechanic.surname}</h6>
                <p className="card-text text-muted">{mechanic.status}</p>
                <p className="card-text">{mechanic.bio}</p>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  <strong>Email:</strong> {mechanic.email}
                </li>
                <li className="list-group-item">
                  <strong>Phone:</strong> {mechanic.telephone}
                </li>
                <li className="list-group-item">
                  <strong>Status:</strong> {mechanic.status}
                </li>
                <li className="list-group-item">
                  <strong>Start Shift:</strong> {new Date(mechanic.startShift).toLocaleTimeString()}
                </li>
                <li className="list-group-item">
                  <strong>End Shift:</strong> {new Date(mechanic.endShift).toLocaleTimeString()}
                </li>
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicProfile;
