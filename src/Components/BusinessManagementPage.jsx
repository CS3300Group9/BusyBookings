// Components/BusinessManagementPage.js
import React, { useState } from 'react';

function BusinessManagementPage({ user, businesses, setBusinesses, pageHandler }) {
  const [businessName, setBusinessName] = useState(user[0]);
  const [address, setAddress] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
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

    setBusinessName('');
    setAddress('');
    setStartTime('');
    setEndTime('');
    setError('');
  };

  return (
    <div className='blueContainer'>
      <div className='mainBox'>
      <div className='App'>
        <h1>Business Management</h1>
          <div>
            <h2>Update Business information</h2>
            <div>
              <input
                className='textCustom'
                type="text"
                placeholder="Business Name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div>
              <input
                className='textCustom'
                type="text"
                placeholder="Business Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <input
                className='textCustom'
                type="text"
                placeholder="Opening Time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
              />
            </div>
            <div>
              <input
                className='textCustom'
                type="text"
                placeholder="Closing Time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
              />
            </div>
            <button onClick={handleCreateBusiness} className='buttonCustom'>Update Business</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
          </div>
          <button onClick={() => pageHandler('businessLanding') } className='buttonCustom'>Back to Dashboard</button>
        </div>
      </div>
    </div>
  );
}

export default BusinessManagementPage;
