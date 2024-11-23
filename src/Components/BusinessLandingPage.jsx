function BusinessLandingPage({ pageHandler }) {
    return (
      <div>
        <h1>Welcome to the Business Dashboard</h1>
        {/* Business-specific content */}
        <button onClick={() => pageHandler('businessManagement')}>
          Manage Your Businesses
        </button>
      </div>
    );
  }
  
  export default BusinessLandingPage;