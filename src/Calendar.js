import React, { Component } from 'react';
import CalendarDays from './CalendarDays';
import './index.css'

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
    
  render() {
    return (
        <div className="calendar">
        <div className="calendar-header">
          <h2>{this.months[this.state.currentDay.getMonth()]} {this.state.currentDay.getFullYear()}</h2>
        </div>
        <div className="calendar-body">
          <div className="table-header">
            {
              this.weekdays.map((weekday) => {
                return <div className="weekday"><p>{weekday}</p></div>
              })
            }
          </div>
          <CalendarDays day={this.state.currentDay} handleCalendarDayClick={this.props.handleCalendarDayClick} />
        </div>
      </div>
    )
  }
}