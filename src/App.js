import './App.css';
import React, { useState } from 'react';
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
import CreateBookingsPage from './Components/CreateBookingsPage';
import Calendar from './Calendar';
import LandingPage from './Components/LandingPage';
import BusinessLandingPage from './Components/BusinessLandingPage';
import BusinessDashboard from './Components/BusinessDashboard';
import Booking from './Booking';
import UpdateBookingsPage from './Components/UpdateBookingsPage';

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

  const [selectedBooking, setSelectedBooking] = useState(null);

  // TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());
  const [bookings, setBookings] = useState(new Map());

  // Handle login
  const handleLogin = (userType) => {
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

  // Handle account creation
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

  // Create a Booking
  const createBooking = () => {
    if (!startTime || !endTime || !name || !contactInfo || !business) {
      setError('All required fields must be filled');
      return;
    }
  
    setBookings((prevBookings) => {
      const dayKey = currentDay.date.toString();
      const newBooking = new Booking(
        startTime,
        endTime,
        name,
        contactInfo,
        notes || '', // Allow optional notes to default to an empty string
        business,
      );
  
      if (!prevBookings.has(dayKey)) {
        const updatedBookings = new Map(prevBookings);
        updatedBookings.set(dayKey, [newBooking]);
        return updatedBookings;
      } else {
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
  
  // Update a booking
  const updateBooking = (updatedBooking) => {
    if (!selectedBooking || !selectedBooking.date) {
      setError('No booking selected to update.');
      return;
    }
  
    const dayKey = selectedBooking.date.toString();
    const updatedBookings = new Map(bookings);
    const existingBookings = updatedBookings.get(dayKey) || [];
  
    const updatedBookingIndex = existingBookings.findIndex(
      (b) => b.id === updatedBooking.id // Compare by ID
    );
  
    if (updatedBookingIndex !== -1) {
      existingBookings[updatedBookingIndex] = { ...updatedBooking }; // Update booking with new values
      updatedBookings.set(dayKey, existingBookings);
      setBookings(updatedBookings);
    }
  
    // Clear fields and reset state
    setStartTime('');
    setEndTime('');
    setName('');
    setContactInfo('');
    setNotes('');
    setBusiness('');
    setSelectedBooking(null);
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
            setSelectedBooking={setSelectedBooking}
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
      );
    case 'updateBookings':
      return (
        <UpdateBookingsPage
          updateBooking={updateBooking}
          booking={selectedBooking}
          setStartTime={setStartTime}
          setEndTime={setEndTime}
          setName={setName}
          setContactInfo={setContactInfo}
          setNotes={setNotes}
          setBusiness={setBusiness}
          setCustomer={setCustomer}
          error={error}
        />
      );
    case 'customerDashboard':
      return <BusinessDashboard bookings={bookings} />;
    default:
      return <InitialPage pageHandler={setCurrentPage} />;
  }
}

export default App;
