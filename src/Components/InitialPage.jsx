function InitialPage({pageHandler, loginTypeHandler}) {
    return (
        <div className="App">
            <h1>Busy Bookings</h1>
            <div className="App-title">Select user type</div>
            <input
              type="button"
              value="I am a customer"
              onClick={() => {
                pageHandler('customerLogin') 
                loginTypeHandler('customer')
              }}
            />
            <input
              type="button"
              value="I am a business"
              onClick={() => {
                pageHandler('businessLogin')
                loginTypeHandler('business')
              }}
            />
        </div>
    );
}

export default InitialPage;