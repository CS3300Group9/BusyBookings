import React from "react";
import Booking from "../Booking";
import Calendar from "../Calendar";

function BusinessDashboard({ bookings, pageHandler, currentBusiness, setCurrDay }) {

  const bookingsArray = new Map();

  // Iterate over the bookings Map
  bookings.forEach((dayBookings, date) => {
    dayBookings.forEach((booking) => {
      if (booking.business === currentBusiness.name) {
        // Include the date in the booking object
        bookingsArray.push({ ...booking, date });
      }
    });
  });
  return (
    <div className="business-dashboard">
      {/* Display the current business name if provided */}
      <h1>{currentBusiness?.name || "Business Dashboard"}</h1>

      {/* Calendar for managing bookings */}
      <Calendar
        pageHandler={pageHandler}
        bookings={bookingsArray}
        currentBusiness={currentBusiness}
        setCurrDay={setCurrDay} // Pass setCurrDay here
      />

      {/* Bookings List */}
      {bookingsArray.length > 0 ? (
        <div className="bookings-list">
          {bookingsArray.map((booking, index) => (
            <div key={index} className="booking-card">
              <h3>Booking Details</h3>
              <p>
                <strong>Date:</strong> {booking.date}
              </p>
              <p>
                <strong>Start Time:</strong> {booking.startTime}
              </p>
              <p>
                <strong>End Time:</strong> {booking.endTime}
              </p>
              <p>
                <strong>Customer:</strong> {booking.customer}
              </p>
              <p>
                <strong>Contact Info:</strong> {booking.contactInfo}
              </p>
              <p>
                <strong>Notes:</strong> {booking.notes || "N/A"}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available for this business.</p>
      )}
    </div>
  );
}

export default BusinessDashboard;
