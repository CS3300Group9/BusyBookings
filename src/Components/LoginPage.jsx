import '../index.css'

// USED
// Very basic logic attached, still mostly just front end

function LoginPage({
  pageHandler,
  loginHandle,
  setUsername,
  setPassword,
  error,
  userType,
}) {
  // Include any necessary logic here

  const handleLoginClick = () => {
    // You can add any pre-validation logic here if needed
    loginHandle(userType); // Pass userType to the login handler
    // userType is what allows for factory class
  };

  //NO LOGIC HERE, KEEP CLEAN

//Handle both business and customer logins

  return (
    <div className="blueContainer">
      <div className="mainBox">
        <div className="App">
          <div>
            <h1 className="App-title">Busy Bookings</h1>
          </div>
          <div>
            <div className="App-title">
              {userType === 'business' ? 'Business Login' : 'Customer Login'}
            </div>
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Enter username here"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              type="password"
              placeholder="Enter password here"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='buttonCustom'
              type="button"
              value="Log in"
              onClick={handleLoginClick}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <div>Don't have an account? Create one!</div>
          </div>
          <div>
            <input
              className='buttonCustom'
              type="button"
              value="Create account"
              onClick={() => pageHandler('createAccount')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
