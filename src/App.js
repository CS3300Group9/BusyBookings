import './App.css';
import React, { useState } from 'react';
import axios from "axios";
import LoginPage from './Components/LoginPage';
import InitialPage from './Components/InitialPage';
import CreateAccountPage from './Components/CreateAccountPage';
//import db_connector from './Database/db_connector';
import CreateBookingsPage from './Components/CreateBookingsPage';
import Calendar from './Calendar';
import LandingPage from './Components/LandingPage';
import BusinessLandingPage from './Components/BusinessLandingPage';
import BusinessManagementPage from './Components/BusinessManagementPage';
import ViewBookingPage from './Components/ViewBookingPage';


import BusinessDashboard from './Components/BusinessDashboard'; // Import the new dashboard
import Booking from './Booking'; // Import the booking class
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
  const [currentDay, setCurrDay] = useState(0);
  const [userType, setUserType] = useState('customer');
  const [loginType, setLoginType] = useState('customer');

  const [selectedBooking, setSelectedBooking] = useState(null);

  // TEMPORARY UNTIL DB MADE
  const [users, setUsers] = useState(new Map());
  const [businesses, setBusinesses] = useState(new Map());
  const [loggedInUser, setLoggedInUser] = useState([]);

  

  //const db = new db_connector;
  //var con = require("./Database/connect.js");

  const [bookings, setBookings] = useState(new Map());

  //DATABASE API

  // Mock bookings for the Business Dashboard
  //Map of strings (date to object list)

  const [businessAvailabilities, setBusinessAvailabilities] = useState(new Map()); // Map<businessId, {startTime, endTime}>


  // CHANGE ME FOR SQL DB
  const handleLogin = async() => {
    //DATABASE VALIDATE CALL
        //CHECK DATABASE FOR USER
      async function checkUser(x) {
          return await axios
         .get("https://jsserver-1056678293451.us-east5.run.app/user/" + x)
         }
      const response = await checkUser(username);

      if (!response.data){
        setError('Username does not exist. Please create an account.');
      } else {
        //CHECK FOR TYPE 

  
        async function validate(x, y) {
          return await axios
          .get("https://jsserver-1056678293451.us-east5.run.app/validate/" + x + "/" + y)
        }
        try {
          const validated = await validate(username, password);

          if (validated.data) {

              //CHECK TYPE 
              async function type(x) {
                console.log("https://jsserver-1056678293451.us-east5.run.app/type/" + x)
                return await axios
                .get("https://jsserver-1056678293451.us-east5.run.app/type/" + x)
              }

              const actual_type = await type(username);
              var uType = actual_type.data;
            if (uType === loginType) {
              setLoggedInUser([ username, uType ]);
              setError('');
              setUsername('');
              setPassword('');
              setUserType(uType);
              setCurrentPage(uType === 'customer' ? 'customerLanding' : 'businessLanding');
              if (uType === 'customer') {
                const results = await getCustomerBookings(username);
                const resultsUnique = Array.from(new Set(results.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));
                var length = Object.keys(resultsUnique)?.length
                if (length >= 1) {
                  var i = 0;
                  var customerBookings = new Map();
                  while (i < length) {
                    var newBooking = new Booking(
                      resultsUnique[i]["start_time"],
                      resultsUnique[i]["end_time"],
                      resultsUnique[i]["booking_name"],
                      resultsUnique[i]["contactInfo"],
                      resultsUnique[i]["notes"],
                      resultsUnique[i]["buisness"],
                      resultsUnique[i]["customer"],
                      resultsUnique[i]["dates"]
                    );
                    if (customerBookings.has(resultsUnique[i]["dates"])) {
                      var temp = [...customerBookings.get(resultsUnique[i]["dates"])];
                      temp.push(newBooking);
                      customerBookings.set(resultsUnique[i]["dates"], temp);
                    } else {
                      customerBookings.set(resultsUnique[i]["dates"], [newBooking]);
                    }
                    i++;
                  }
                }
                if (customerBookings) {
                  setBookings(customerBookings);
                }
              } else {
                const results = await getBuisnessBookings(username);
                const resultsUnique = Array.from(new Set(results.map(a => JSON.stringify(a)))).map(e => JSON.parse(e));
                var length = Object.keys(resultsUnique)?.length
                if (length >= 1) {
                  var i = 0;
                  var businessBookings = new Map();
                  while (i < length) {
                    var newBooking = new Booking(
                      resultsUnique[i]["start_time"],
                      resultsUnique[i]["end_time"],
                      resultsUnique[i]["booking_name"],
                      resultsUnique[i]["contactInfo"],
                      resultsUnique[i]["notes"],
                      resultsUnique[i]["buisness"],
                      resultsUnique[i]["customer"],
                      resultsUnique[i]["dates"]
                    );
                    if (businessBookings.has(resultsUnique[i]["dates"])) {
                      var temp = [...businessBookings.get(resultsUnique[i]["dates"])];
                      temp.push(newBooking);
                      businessBookings.set(resultsUnique[i]["dates"], temp);
                    } else {
                      businessBookings.set(resultsUnique[i]["dates"], [newBooking]);
                    }
                    i++;
                  }
                }
                if (businessBookings) {
                  setBookings(businessBookings);
                }
              }
              getBuisnesses().then(response => {
                setBusinesses(response.data.map(object => object.username))
              })
            } else {
              setError(
                `This account is registered as a `+ actual_type.data + `, not a `+ loginType + `.`
              );
            }
          } else {
            setError('Incorrect password. Please try again.');
          }
        } catch (error) {
          setError(error.toString())
        }
      }
    //LOGIC
    /*if (users.has(username)) {
      const user = users.get(username);
      //if (user.password === password) {
        if (response) {
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
    }*/
  };



  const handleCreateAccount = async(userType) => {
    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    //CHECK DATABASE FOR USER
    async function checkUser(x) {
      return await axios
     .get("https://jsserver-1056678293451.us-east5.run.app/user/" + x)
     }
 
     try {
         const response = await checkUser(username);
         if (response.data){
            setError('Username already exists. Please choose a different one.');
            return;
          }
    } catch (error) {
         setError(error.toString());
     }

    
    //DATABASE CALL
    async function postUser(x, y, z){
      console.log('https://jsserver-1056678293451.us-east5.run.app/addUser/' + x + '/' + y + '/' + z);
      axios.post('https://jsserver-1056678293451.us-east5.run.app/addUser/' + x + '/' + y + '/' + z)
    }
    postUser(username, password, userType)

    /*setUsers((prevUsers) => {
      const updatedUsers = new Map(prevUsers);
      updatedUsers.set(username, { password, userType });
      return updatedUsers;
    });

    setLoggedInUser({ username, userType });


    setUsername('');
    setPassword('');
    setUserType('customer');*/
    setError('');
    setCurrentPage(
      userType === 'customer' ? 'customerLanding' : 'businessLanding'
    );
  };

  const createBooking = () => {
    if (!startTime || !endTime || !name || !contactInfo || !business) {
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
        username,
        dayKey
      );

      addBookingDB(name, contactInfo, startTime, endTime, business, loggedInUser[0], notes, dayKey);

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
    setCurrentPage(
      userType === 'customer' ? 'customerLanding' : 'businessLanding'
    );
  };

  switch (currentPage) {
    case 'initial':
      return (
        <InitialPage 
          pageHandler={setCurrentPage}
          loginTypeHandler={setLoginType}
        />
      );
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
          <div className='center'>
            <input
              className='buttonCustom'
              type="button"
              value="Log out"
              onClick={() => {
                setCurrentPage('intial')
                setLoggedInUser([])
                }}
            />
          </div>
          <Calendar
            pageHandler={setCurrentPage}
            bookings={bookings}
            setCurrDay={setCurrDay}
            userType={userType}
            setSelectedBooking={setSelectedBooking}
          />
        </div>
      );
    case 'businessLanding':
      return (
        <div>
          <div>
            <div className='center'>
              <input
                className='buttonCustom'
                type="button"
                value="Manage Business"
                onClick={() => setCurrentPage('businessManagement')}
              />
              <input
                className='buttonCustom'
                type="button"
                value="Log out"
                onClick={() => {
                  setCurrentPage('intial')
                  setLoggedInUser([])
                  }}
              />
            </div>
            <Calendar
              pageHandler={setCurrentPage}
              bookings={bookings}
              setCurrDay={setCurrDay}
              userType={userType}
              setSelectedBooking={setSelectedBooking}
            />
          </div>
        </div>
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
            businesses={businesses}
            business={business}
            error={error}
          />
        </div>
      );
      case 'customerDashboard':
        return (
          <BusinessDashboard 
            bookings={bookings} 
            pageHandler={setCurrentPage} // Added this line here properly
          />
        );      
    case 'businessManagement':
      return (
        <BusinessManagementPage
          user={loggedInUser}
          businesses={businesses}
          setBusinesses={setBusinesses}
          pageHandler={setCurrentPage}
        />
      );
    case 'viewBooking':
      return (
        <ViewBookingPage
          pageHandler={setCurrentPage}
          selectedBooking={selectedBooking}
          loggedInUser={loggedInUser}
        />
      )
    default:
      return <InitialPage pageHandler={setCurrentPage} />;
  }


  //Database Booking Functions

  //Should be able to call normally
  async function addBookingDB(name, contact ,start ,end ,buisness, customer, notes, date){
    console.log('https://jsserver-1056678293451.us-east5.run.app/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes + '/' + date);
    axios.post('https://jsserver-1056678293451.us-east5.run.app/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes + '/' + date);
  }    
  
  //3 Database Getters

  //TO GET DATA FROM THESE GETTERS YOU WILL HAVE TO USE AWAIT AS FOLLOWS WHEN YOU CALL THIS FUNCTION 
  //IN EXAMPLE BELOW CALLING GET BUISNESSES result_list.data WILL HOLD A JSON WITH ALL BUISNESSES
        /*
        const result_list = await getBuisnesses();
        */

  //RETURNS - All 3 functions will return JSONs, the 
    // For example if I want to know the end time of McDonalds first booking I would use the function in the following way
      //const bookings = await getBuisnessBookings("McDonalds")
      //bookings[0]["end_time"]  
      async function getBuisnesses() {
          return await axios
          .get("https://jsserver-1056678293451.us-east5.run.app/buisness")
      }
  
      async function getCustomerBookings(user) {
          async function search(user) {
              return await axios
              .get("https://jsserver-1056678293451.us-east5.run.app/bookings/" + user)
          }
  
          const bookings = await search(user);
          return bookings.data
      }
  
      async function getBuisnessBookings(user) {
          async function search(user) {
              return await axios
              .get("https://jsserver-1056678293451.us-east5.run.app/buisness-bookings/" + user)
          }
  
          const bookings = await search(user);
          return bookings.data
      }

}

export default App;

