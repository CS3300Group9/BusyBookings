import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
import LandingPage from './Components/LandingPage';

function App() {
  const [currentPage, setCurrentPage] = useState('initial');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());

  // CHANGE ME FOR SQL DB
  const handleLogin = () => {
    if (users.has(username)) {
      if (users.get(username) === password) {
        setError('');
        setCurrentPage('Logged in');
      } else {
        setError('Incorrect password. Please try again.');
      }
    } else {
      setError('Username does not exist. Please create an account.');
    }
  };

  const handleCreateAccount = () => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (users.has(username)) {
      setError('Username already exists. Please choose a different one.');
      return;
    }

    setUsers((prevUsers) => {
      const updatedUsers = new Map(prevUsers);
      updatedUsers.set(username, password);
      return updatedUsers;
    });

    setUsername('');
    setPassword('');
    setError('');
    setCurrentPage('initial');
  };

  switch (currentPage) {
    case 'initial':
      return <InitialPage pageHandler={setCurrentPage} />;
    case 'customerLogin':
    case 'businessLogin':
      return (
        <LoginPage
          pageHandler={setCurrentPage}
          loginHandle={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
        />
      );
    case 'createAccount':
      return (
        <CreateAccountPage
          pageHandler={setCurrentPage}
          createAccountHandler={handleCreateAccount}
          setUsername={setUsername}
          setPassword={setPassword}
          error={error}
        />
      );
    case 'Logged in':
      return <LandingPage />; // Render the new component
    default:
      return <InitialPage pageHandler={setCurrentPage} />;
  }
}

export default App;
