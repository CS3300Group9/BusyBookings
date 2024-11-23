import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
//import db_connector from './Database/db_connector';
import CreateBookingsPage from './Components/CreateBookingsPage';
import Calendar from './Calendar';
import LandingPage from './Components/LandingPage';
import BusinessLandingPage from './Components/BusinessLandingPage';
import BusinessDashboard from './Components/BusinessDashboard'; // Import the new dashboard
import Booking from './Booking'; // Import the booking class

function App() {
  const [currentPage, setCurrentPage] = useState('initial');
  const [error, setError] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [name, setName] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [notes, setNotes] = useState('');
  const [business, setBusiness] = useState('');
  const [customer, setCustomer] = useState('');
  const [currentDay, setCurrDay] = useState(0);
  const [userType, setUserType] = useState('customer');

  // TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());
  //const db = new db_connector;
  //var con = require("./Database/connect.js");

  const [bookings, setBookings] = useState(new Map());

  // Mock bookings for the Business Dashboard

  // CHANGE ME FOR SQL DB
  const handleLogin = () => {
    if (users.has(username)) {
      const user = users.get(username);
      if (user.password === password) {
        if (user.userType === userType) {
          setError('');
          setUsername('');
          setPassword('');
          setUserType('customer');
          setCurrentPage(
            userType === 'customer' ? 'customerLanding' : 'businessLanding'
          );
        } else {
          setError(
            `This account is registered as a ${user.userType}, not a ${userType}.`
          );
        }
      } else {
        setError('Incorrect password. Please try again.');
      }
    } else {
      setError('Username does not exist. Please create an account.');
    }
  };

  const handleCreateAccount = (userType) => {
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
      updatedUsers.set(username, { password, userType });
      return updatedUsers;
    });

    setUsername('');
    setPassword('');
    setUserType('customer');
    setError('');
    setCurrentPage('initial');
  };

  const createBooking = () => {
    if (!startTime || !endTime || !name || !contactInfo || !business || !customer) {
      setError('Please fill in all fields');
      return;
    }

    setBookings((prevBookings) => {
      const dayKey = currentDay.date.toString();
      const newBooking = new Booking(
        startTime,
        endTime,
        name,
        contactInfo,
        notes,
        business,
        customer
      );

      // If no bookings exist for the current day, create a new array
      if (!prevBookings.has(dayKey)) {
        const updatedBookings = new Map(prevBookings);
        updatedBookings.set(dayKey, [newBooking]);
        return updatedBookings;
      } else {
        // Create a new array with the existing bookings and add the new booking
        const updatedBookings = new Map(prevBookings);
        const existingBookings = [...updatedBookings.get(dayKey)];
        existingBookings.push(newBooking);
        updatedBookings.set(dayKey, existingBookings);
        return updatedBookings;
      }
    });

    // Clear form fields and navigate back
    setStartTime('');
    setEndTime('');
    setName('');
    setContactInfo('');
    setNotes('');
    setBusiness('');
    setCustomer('');
    setError('');
    setCurrentPage('customerLanding');
  };

  switch (currentPage) {
    case 'initial':
      return <InitialPage pageHandler={setCurrentPage} />;
    case 'customerLogin':
      return (
        <LoginPage
          pageHandler={setCurrentPage}
          loginHandle={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          error={error}
          userType="customer"
        />
      );
    case 'businessLogin':
      return (
        <LoginPage
          pageHandler={setCurrentPage}
          loginHandle={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
          error={error}
          userType="business"
        />
      );
    case 'createAccount':
      return (
        <CreateAccountPage
          pageHandler={setCurrentPage}
          createAccountHandler={handleCreateAccount}
          setUsername={setUsername}
          setPassword={setPassword}
          setUserType={setUserType}
          username={username}
          password={password}
          userType={userType}
          error={error}
        />
      );
    case 'customerLanding':
      return (
        <div>
          <Calendar
            pageHandler={setCurrentPage}
            bookings={bookings}
            setCurrDay={setCurrDay}
          />
        </div>
      );
    case 'businessLanding':
      return (
        <BusinessLandingPage
          navigateToCustomerDashboard={() => setCurrentPage('customerDashboard')}
        />
      );
    case 'createBookings':
      return (
        <div>
          <CreateBookingsPage
            createBooking={createBooking}
            setStartTime={setStartTime}
            setEndTime={setEndTime}
            setName={setName}
            setContactInfo={setContactInfo}
            setNotes={setNotes}
            setBusiness={setBusiness}
            setCustomer={setCustomer}
            error={error}
          />
        </div>
      );
    case 'customerDashboard':
      return <BusinessDashboard bookings={bookings} />;
    default:
      return <InitialPage pageHandler={setCurrentPage} />;
  }
}

export default App;

