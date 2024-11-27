// Components/CreateAccountPage.js
// USED
// Just the front end design, nothing else
import React from 'react';
import '../index.css'

function CreateAccountPage({
  pageHandler,
  createAccountHandler,
  username,
  password,
  setUsername,
  setPassword,
  userType,
  setUserType,
  error,
}) {
  // NO LOGIC HERE, KEEP CLEAN

  return (
    <div className='blueContainer'>
      <div className='mainBox'>
        <div className="App">
          <div>
            <h1 className="App-title">Busy Bookings</h1>
          </div>
          <div>
            <div className="App-title">Create Account</div>
          </div>
          <div>
            <input
              className='textCustom'
              placeholder="Enter username"
              value={username}
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <input
              className='textCustom'
              type="password"
              placeholder="Enter password here"
              value={password}
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div>
            <label>
              Account Type:
              <select value={userType} onChange={(e) => setUserType(e.target.value)} className='buttonCustom'>
                <option value="customer">Customer</option>
                <option value="business">Business</option>
              </select>
            </label>
          </div>
          <div>
            <input
              className='buttonCustom'
              type="button"
              value="Create Account"
              onClick={() => createAccountHandler(userType)}
            />
          </div>
          {error && <div style={{ color: 'red' }}>{error}</div>}
          <div>
            <div>Already have an account? Log in!</div>
          </div>
          <div>
            <input
              className='buttonCustom'
              type="button"
              value="Log in"
              onClick={() => pageHandler('initial')}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateAccountPage;
