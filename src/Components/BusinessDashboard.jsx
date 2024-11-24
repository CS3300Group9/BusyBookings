// Components/BusinessDashboard.js
import React, { useState, useEffect } from "react";
import Calendar from "../Calendar";
import PropTypes from 'prop-types';


function BusinessDashboard({ bookings, businesses, pageHandler, setCurrDay }) {
  // Local state to track the selected business
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  
  // Local state to hold filtered bookings as a Map
  const [filteredBookings, setFilteredBookings] = useState(new Map());

  // Convert 'businesses' Map to array if it's a Map
  const businessesArray = React.useMemo(() => {
    if (businesses instanceof Map) {
      return Array.from(businesses.values());
    }
    return businesses || [];
  }, [businesses]);

  // Debugging: Log businessesArray
  useEffect(() => {
    console.log("Businesses Array:", businessesArray);
    if (businessesArray.length > 0 && !selectedBusiness) {
      setSelectedBusiness(businessesArray[0]); // Select the first business by default
    }
  }, [businessesArray, selectedBusiness]);

  // Debugging: Log selectedBusiness and bookings
  useEffect(() => {
    console.log("Selected Business:", selectedBusiness);
    console.log("Bookings Map:", bookings);
    if (selectedBusiness && bookings instanceof Map) {
      const filteredMap = new Map();
      bookings.forEach((dayBookings, date) => {
        const businessBookings = dayBookings.filter(booking => booking.business === selectedBusiness.name);
        if (businessBookings.length > 0) {
          filteredMap.set(date, businessBookings);
        }
      });
      setFilteredBookings(filteredMap);
    }
  }, [selectedBusiness, bookings]);

  // Handle change in the drop-down menu
  const handleBusinessChange = (event) => {
    const businessName = event.target.value;
    const business = businessesArray.find(b => b.name === businessName);
    setSelectedBusiness(business);
  };

  return (
    <div className="business-dashboard">
      {/* Business Selection Drop-down */}
      <div className="business-selection">
        <label htmlFor="business-select"><strong>Select Business:</strong></label>
        <select 
          id="business-select" 
          value={selectedBusiness ? selectedBusiness.name : ''} 
          onChange={handleBusinessChange}
        >
          {businessesArray.map((business, index) => (
            <option key={index} value={business.name}>
              {business.name}
            </option>
          ))}
        </select>
      </div>

      {/* Display the selected business name */}
      <h1>{selectedBusiness?.name || "Business Dashboard"}</h1>

      {/* Calendar for managing bookings */}
      <Calendar
        pageHandler={pageHandler}
        bookings={filteredBookings} // Pass filtered bookings as a Map
        currentBusiness={selectedBusiness}
        setCurrDay={setCurrDay} // Pass setCurrDay here
      />

      {/* Bookings List */}
      {filteredBookings.size > 0 ? (
        <div className="bookings-list">
          {Array.from(filteredBookings.entries()).map(([date, bookingsForDate], index) => (
            <div key={index} className="booking-card">
              <h3>Bookings for {date}</h3>
              {bookingsForDate.map((booking, idx) => (
                <div key={idx} className="individual-booking">
                  <p><strong>Start Time:</strong> {booking.startTime}</p>
                  <p><strong>End Time:</strong> {booking.endTime}</p>
                  <p><strong>Customer:</strong> {booking.customer}</p>
                  <p><strong>Contact Info:</strong> {booking.contactInfo}</p>
                  <p><strong>Notes:</strong> {booking.notes || "N/A"}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available for this business.</p>
      )}
    </div>
  );
}

// PropTypes for type checking
BusinessDashboard.propTypes = {
  bookings: PropTypes.instanceOf(Map).isRequired, // Ensure bookings is a Map
  businesses: PropTypes.oneOfType([
    PropTypes.instanceOf(Map), // If businesses is a Map
    PropTypes.array // Or an array
  ]).isRequired,
  pageHandler: PropTypes.func.isRequired,
  setCurrDay: PropTypes.func.isRequired,
};

export default BusinessDashboard;
