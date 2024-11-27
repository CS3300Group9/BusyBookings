// NOT USED
import React from 'react';

function BusinessLandingPage({ pageHandler, bookings, setCurrDay }) {
  return (
    <div>
      <h1>Welcome to the Business Landing Page</h1>
      {/* Add business-specific content here */}
      <button onClick={() => pageHandler('businessManagement')}>
        Manage Your Businesses
      </button>
      {/* Using a lambda directly */}
      <button onClick={() => pageHandler('')}>
        Go to Business Dashboard
      </button>
    </div>
  );
}

export default BusinessLandingPage;
