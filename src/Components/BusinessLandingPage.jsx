// Components/BusinessLandingPage.js
import React from 'react';

function BusinessLandingPage({ navigateToCustomerDashboard }) {
  return (
    <div>
      <h1>Welcome to the Business Landing Page</h1>
      {/* Add business-specific content here */}
      <button onClick={navigateToCustomerDashboard}>Go to Business Dashboard</button>
    </div>
  );
}

export default BusinessLandingPage;
