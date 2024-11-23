import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
import CreateBookingsPage from './Components/CreateBookingsPage';
import Calendar from './Calendar';
import Booking from './Booking';

function App() {

  const [currentPage, setCurrentPage] = useState('initial');
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [startTime, setStartTime] = useState(0);
  const [endTime, setEndTime] = useState(0);
  const [currentDay, setCurrDay] = useState(0);

  //TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());
  const [bookings, setBookings] = useState(new Map());

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
    setCurrentPage('initial');
  };

  const createBooking = () => {

    console.log(currentDay.date.toString())

    setBookings((prevBookings) => {
      const updatedBookings = new Map(prevBookings)
      updatedBookings.set(currentDay.date.toString(), new Booking(startTime, endTime));
      console.log(updatedBookings)
      return updatedBookings;
    });

    console.log(bookings.get(currentDay.date.toString()))
    console.log(bookings)

    setCurrentPage('Logged in')
  }

  switch (currentPage) {
    case 'initial':
      return (
        <InitialPage pageHandler={setCurrentPage}/>
      );
    case 'customerLogin':
      return (
        <LoginPage 
          pageHandler={setCurrentPage}
          loginHandle={handleLogin} 
          setUsername={setUsername} 
          setPassword={setPassword}
          error={error}
        />
      );
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
      return (
        <div>
          <Calendar 
            pageHandler={setCurrentPage}
            bookings={bookings}
            setCurrDay={setCurrDay}
          />
        </div>
      );
    case 'createBookings':
      return (
        <div>
          <CreateBookingsPage 
            createBooking={createBooking}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            error={error}
          />
        </div>
      )
    default:
      return (
        <InitialPage pageHandler={setCurrentPage}/>
      );
  }
}

export default App;
