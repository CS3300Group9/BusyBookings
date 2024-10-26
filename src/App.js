import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import CreateAccountPage from './Components/CreateAccountPage';

function App() {

  const [currentPage, setCurrentPage] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  var users = [];

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
        <div></div>
      ) : (
        <CreateAccountPage/>
      )}
    </>
  );
}

export default App;
