// Components/BusinessManagementPage.js
import React, { useState } from 'react';

function BusinessManagementPage({ user, businesses, setBusinesses, pageHandler }) {
  const [businessName, setBusinessName] = useState('');
  const [error, setError] = useState('');

  const handleCreateBusiness = () => {
    if (!businessName) {
      setError('Please enter a business name.');
      return;
    }

    setBusinesses((prevBusinesses) => {
      const updatedBusinesses = new Map(prevBusinesses);
      const userBusinesses = updatedBusinesses.get(user.username) || [];
      userBusinesses.push({ name: businessName });
      updatedBusinesses.set(user.username, userBusinesses);
      return updatedBusinesses;
    });

    setBusinessName('');
    setError('');
  };

  const userBusinesses = businesses.get(user.username) || [];

  return (
    <div>
      <h1>Business Management</h1>

      <div>
        <h2>Create a New Business</h2>
        <input
          type="text"
          placeholder="Business Name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
        <button onClick={handleCreateBusiness}>Create Business</button>
        {error && <div style={{ color: 'red' }}>{error}</div>}
      </div>

      <div>
        <h2>Your Businesses</h2>
        {userBusinesses.length > 0 ? (
          <ul>
            {userBusinesses.map((business, index) => (
              <li key={index}>{business.name}</li>
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
