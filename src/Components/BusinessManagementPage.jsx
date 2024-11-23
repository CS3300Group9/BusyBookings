// Components/BusinessManagementPage.js
import React, { useState } from 'react';
import Business from '../Business';

function BusinessManagementPage({ user, businesses, setBusinesses, pageHandler }) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:00');
  const [error, setError] = useState('');

  const handleCreateBusiness = () => {
    if (!businessName || !address || !startTime || !endTime) {
      setError('Please fill in all fields.');
      return;
    }

    if (startTime >= endTime) {
      setError('Start time must be before end time.');
      return;
    }

    setBusinesses((prevBusinesses) => {
      const updatedBusinesses = new Map(prevBusinesses);
      const userBusinesses = updatedBusinesses.get(user.username) || [];
      userBusinesses.push(new Business(businessName, address, startTime, endTime));
      updatedBusinesses.set(user.username, userBusinesses);
      return updatedBusinesses;
    });

    setBusinessName('');
    setAddress('');
    setStartTime('09:00');
    setEndTime('17:00');
    setError('');
  };

  const userBusinesses = businesses.get(user.username) || [];

  return (
    <div>
      <h1>Business Management</h1>

      <div>
        <h2>Create a New Business</h2>
        <div>
          <label>
            Business Name:
            <input
              type="text"
              placeholder="Business Name"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Address:
            <input
              type="text"
              placeholder="Business Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            Start Time:
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            End Time:
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
        </div>
        <button onClick={handleCreateBusiness}>Create Business</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div>
        <h2>Your Businesses</h2>
        {userBusinesses.length > 0 ? (
          <ul>
            {userBusinesses.map((business, index) => (
              <li key={index}>
                <strong>{business.name}</strong>
                <div>Address: {business.address}</div>
                <div>
                  Availability: {business.startTime} - {business.endTime}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>You have no businesses yet.</p>
        )}
      </div>

      <button onClick={() => pageHandler('businessLanding')}>Back to Dashboard</button>
    </div>
  );
}

export default BusinessManagementPage;
