import React from "react";
import Booking from "../Booking"; 

const BusinessDashboard = ({ bookings }) => {
  return (
    <div className="business-dashboard">
      <h1>Business Dashboard</h1>
      {bookings.length > 0 ? (
        <div className="bookings-list">
          {bookings.map((booking, index) => (
            <div key={index} className="booking-card">
              {/* Use the static getDisplay method */}
              {Booking.getDisplay(booking)}
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
                <strong>Notes:</strong> {booking.notes}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No bookings available.</p>
      )}
    </div>
  );
};

export default BusinessDashboard;
