
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
  };

  //NO LOGIC HERE, KEEP CLEAN

//Handle both business and customer logins

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          border: '1px solid #ccc',
          borderRadius: '5px',
          padding: '16px',
          margin: '16px',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          maxWidth: '30%',
          alignItems: 'center',
        }}
      >
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
              placeholder="Enter username here"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Enter password here"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div>
            <input
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
