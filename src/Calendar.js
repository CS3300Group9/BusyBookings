import React, { Component } from 'react';
import CalendarDays from './CalendarDays';
import './index.css'


//Main calendar class, handles displaying and some logic upates
export default class Calendar extends Component {
    constructor() {
        super();
    
        this.weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        this.months = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    
        this.state = {
          currentDay: new Date()
        }
      }

  handleCalendarDayClick = (day) => {
    if (this.props.userType === 'customer') {
      this.props.setCurrDay(day)
      this.props.pageHandler('createBookings')
    }
  }

  handleBookingClick = (booking) => {
    this.props.setSelectedBooking(booking); // Pass the selected booking
    this.props.pageHandler("viewBooking"); // Navigate to update bookings page
  };
    
  render() {
    return (
      <div>
        <div className='center'>
          <div className="calendar">
            <div className="calendar-header">
              <h2>
                {this.months[this.state.currentDay.getMonth()]}{" "}
                {this.state.currentDay.getFullYear()}
              </h2>
            </div>
            <div className="calendar-body">
              <div className="table-header">
                {this.weekdays.map((weekday) => {
                  return (
                    <div key={weekday} className="weekday">
                      <p>{weekday}</p>
                    </div>
                  );
                })}
              </div>
              <CalendarDays
                day={this.state.currentDay}
                handleCalendarDayClick={this.handleCalendarDayClick}
                handleBookingClick={this.handleBookingClick} // Pass the new handler
                bookings={this.props.bookings}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}