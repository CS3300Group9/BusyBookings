import React, { useState } from 'react';

function CreateAccountPage({ loginHandle, users, setUsers }) {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

    //handle account creation

   //handle account creation
  const handleCreateAccount = () => {
    // Basic validation
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    // Ensure Password is more than 8 characters
    if (password.length < 8) {
        setError('Password must be at least 8 characters');
        return;
    }

    // Check if the username already exists in the Map
    if (users.has(username)) {
      setError('Username already exists. Please choose a different one.');
      return;
    }

    // Store the new username and password in the Map
    setUsers((prevUsers) => {
      const updatedUsers = new Map(prevUsers);
      updatedUsers.set(username, password);
      return updatedUsers;
    });

    // Reset fields and navigate to the login page
    setUsername('');
    setPassword('');
    setError('');
    loginHandle('login');
  };

    //various details
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
            <h1 className="App-title">Food Location Finder</h1>
          </div>
          <div>
            <div className="App-title">Create Account</div>
          </div>
          <div>
            <input
              value={username}
              placeholder="Enter username"
              onChange={(ev) => setUsername(ev.target.value)}
            />
          </div>
          <div>
            <input
              value={password}
              type="password"
              placeholder="Enter password here"
              onChange={(ev) => setPassword(ev.target.value)}
            />
          </div>
          <div>
            <input
              type="button"
              value="Create Account"
              onClick={handleCreateAccount}
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
              onClick={() => loginHandle('login')}
            />
          </div>
        </div>
      </div>
    </div>  
  );
}

export default CreateAccountPage;
