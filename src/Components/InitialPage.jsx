function InitialPage({pageHandler}) {
    return (
        <div className="App">
            <h1>Busy Bookings</h1>
            <div className="App-title">Select user type</div>
            <input
              type="button"
              value="I am a customer"
              onClick={pageHandler('customerLogin')}
            />
            <input
              type="button"
              value="I am a business"
              onClick={pageHandler('businessLogin')}
            />
        </div>
    );
}

export default InitialPage;