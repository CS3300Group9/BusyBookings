import React from 'react';

function BusinessLandingPage({ pageHandler, navigateToCustomerDashboard }) {
  return (
    <div>
      <h1>Welcome to the Business Landing Page</h1>
      {/* Add business-specific content here */}
      <button onClick={() => pageHandler('businessManagement')}>
        Manage Your Businesses
      </button>
      {/* Using a lambda directly */}
      <button onClick={() => pageHandler('businessDashboard')}>
        Go to Business Dashboard
      </button>
    </div>
  );
}

export default BusinessLandingPage;
