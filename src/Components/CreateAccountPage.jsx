
function CreateAccountPage({ pageHandler, createAccountHandler, setUsername, setPassword, error }) {

  //NO LOGIC HERE, KEEP CLEAN

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <div style={{
        border: '1px solid #ccc',
        borderRadius: '5px',
        padding: '16px',
        margin: '16px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
        maxWidth: '30%',
        alignItems: 'center'
      }}>
        <div className="App"> 
          <div>
            <h1 className="App-title">Busy Bookings</h1>
          </div>
          <div>
            <div className="App-title">Create Account</div>
          </div>
          <div>
            <input
              placeholder="Enter username"
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
              value="Create Account"
              onClick={createAccountHandler}
            />
          </div>
          {error && (
            <div style={{ color: 'red' }}>
              {error}
            </div>
          )}
          <div>
            <div>Already have an account? Log in!</div>
          </div>
          <div>
            <input
              type="button"
              value="Log in"
              onClick={() => pageHandler('login')}
            />
          </div>
        </div>
      </div>
    </div>  
  );
}

export default CreateAccountPage;
