import '../index.css'

// USED
// Just the front end design, nothing else

function InitialPage({pageHandler, loginTypeHandler}) {
    return (
      <div className="blueContainer">
        <div className="mainBox">
          <div className="App">
          <h1>Busy Bookings</h1>
            <div className="App-title">Select user type</div>
            <input
              className='buttonCustom'
              type="button"
              value="I am a customer"
              onClick={() => {
                pageHandler('customerLogin') 
                loginTypeHandler('customer')
              }}
            />
            <input
              type="button"
              className='buttonCustom'
              value="I am a business"
              onClick={() => {
                pageHandler('businessLogin')
                loginTypeHandler('business')
              }}
            />
          </div>
        </div>
      </div>
    );
}

export default InitialPage;