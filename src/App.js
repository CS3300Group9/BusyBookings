// App.js
import './App.css';
import React, { useState, useEffect } from 'react';
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
import CreateBookingsPage from './Components/CreateBookingsPage';
import Calendar from './Calendar';
import LandingPage from './Components/LandingPage';
import BusinessLandingPage from './Components/BusinessLandingPage';
import BusinessDashboard from './Components/BusinessDashboard';
import Booking from './Booking';
import BusinessManagementPage from './Components/BusinessManagementPage';
import Business from './Business';

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
  const [currentDay, setCurrDay] = useState(new Date()); // Initialize as Date object
  const [userType, setUserType] = useState('customer');

  // TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());
  const [bookings, setBookings] = useState(new Map());
  const [businesses, setBusinesses] = useState(new Map()); // Maintain as Map
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [businessAvailabilities, setBusinessAvailabilities] = useState(new Map()); // Map<businessId, {startTime, endTime}>

  const [currentBusiness, setCurrentBusiness] = useState(null); // Added state for currentBusiness

  const handleLogin = (userType) => {
    if (users.has(username)) {
      const user = users.get(username);
      if (user.password === password) {
        if (user.userType === userType) {
          setError('');
          setUsername('');
          setPassword('');
          setUserType('customer');
          setLoggedInUser({ username, userType });
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

    setLoggedInUser({ username, userType });

    setUsername('');
    setPassword('');
    setUserType('customer');
    setError('');
    setCurrentPage(
      userType === 'customer' ? 'customerLanding' : 'businessLanding'
    );
  };

  const createBooking = () => {
    if (!startTime || !endTime || !name || !contactInfo || !business || !customer) {
      setError('Please fill in all fields');
      return;
    }

    if (startTime >= endTime) {
      setError('Start time must be before end time.');
      return;
    }

    const dateString = currentDay ? currentDay.toDateString() : new Date().toDateString();

    setBookings((prevBookings) => {
      const newBooking = new Booking(
        startTime,
        endTime,
        name,
        contactInfo,
        notes,
        business.name, // Ensure 'business' is an object with a 'name' property
        customer
      );

      const updatedBookings = new Map(prevBookings);
      const existingBookings = updatedBookings.get(dateString) || [];
      existingBookings.push(newBooking);
      updatedBookings.set(dateString, existingBookings);
      return updatedBookings;
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

  // Initialize sample businesses when the component mounts
  useEffect(() => {
    if (businesses.size === 0) {
      const sampleBusinesses = [
        new Business("Sample Business 1", "123 Main St", "09:00", "17:00"),
        new Business("Sample Business 2", "456 Elm St", "10:00", "18:00"),
      ];
      const businessesMap = new Map();
      sampleBusinesses.forEach((biz, index) => {
        businessesMap.set(index, biz);
      });
      setBusinesses(businessesMap);
    }
  }, [businesses]);

  // Initialize manual bookings once currentBusiness is set
  useEffect(() => {
    if (currentBusiness && bookings.size === 0) {
      const date1 = new Date();
      date1.setDate(date1.getDate() + 1); // Tomorrow
      const dateKey1 = date1.toDateString();

      const booking1 = new Booking(
        "09:00",
        "10:00",
        "John Doe",
        "john@example.com",
        "First booking",
        currentBusiness.name,
        "Jane Customer"
      );

      const booking2 = new Booking(
        "11:00",
        "12:00",
        "Alice Smith",
        "alice@example.com",
        "Second booking",
        currentBusiness.name,
        "Bob Customer"
      );

      const initialBookings = new Map();
      initialBookings.set(dateKey1, [booking1, booking2]);

      setBookings(initialBookings);
    }
  }, [currentBusiness, bookings]);

  // Initialize a sample currentBusiness when businesses are loaded
  useEffect(() => {
    if (!currentBusiness && businesses.size > 0) {
      const firstBusiness = businesses.values().next().value;
      setCurrentBusiness(firstBusiness);
    }
  }, [businesses, currentBusiness]);

  // Rendering components based on currentPage
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
          {/* Add navigation or other components as needed */}
        </div>
      );
    case 'businessLanding':
      return (
        <BusinessLandingPage
          pageHandler={setCurrentPage} // Properly passed
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
      return (
        <BusinessDashboard 
          bookings={bookings} 
          businesses={businesses} // Pass businesses as a Map
          pageHandler={setCurrentPage} // Properly passed
          setCurrDay={setCurrDay} // Pass setCurrDay here
        />
      );
    case 'businessDashboard':
      return (
        <BusinessDashboard
          bookings={bookings}
          businesses={businesses} // Pass businesses as a Map
          pageHandler={setCurrentPage}
          currentBusiness={currentBusiness}
          setCurrDay={setCurrDay} //Set current day
        />
      );
    case 'businessManagement':
      return (
        <BusinessManagementPage
          user={loggedInUser}
          businesses={businesses}
          setBusinesses={setBusinesses}
          setCurrentBusiness={setCurrentBusiness} // Pass setCurrentBusiness here
          pageHandler={setCurrentPage}
        />
      );
    default:
      return <InitialPage pageHandler={setCurrentPage} />;
  }
}

export default App;
