import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';

function App() {

  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  //TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());

  //CHANGE ME FOR SQL DB
  const handleLogin = () => {
    // Check if the username exists in the map
    if (users.has(username)) {
      // Check if the password matches
      if (users.get(username) === password) {
        setError(''); // Clear any existing error
        setCurrentPage('Logged in'); // Successfully logged in
      } else {
        setError('Incorrect password. Please try again.');
      }
    } else {
      setError('Username does not exist. Please create an account.');
    }
  };

  //CHANGE ME FOR SQL DB
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
    setCurrentPage('login');
  };

  return (
    <>
      {currentPage === 'login' ? (
        // Pass `users` as a prop to LoginPage
        <LoginPage 
          pageHandler={setCurrentPage}
          loginHandle={handleLogin} 
          setUsername={setUsername} 
          setPassword={setPassword}
          error={error}
        />
      ) : currentPage === 'Logged in' ? (
        <div></div> //MAIN PAGE HERE
      ) : (
        <CreateAccountPage 
          pageHandler={setCurrentPage}
          createAccountHandler={handleCreateAccount}
          setUsername={setUsername} 
          setPassword={setPassword}
          error={error}
        />
      )}
    </>
  );
}

export default App;
