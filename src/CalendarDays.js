import Booking from "./Booking";

//Handles displaying each calendar day as well as the booking objects within the Bookings map
function CalendarDays(props) {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
        if (day === 0 && weekdayOfFirstDay === 0) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
        } else if (day === 0) {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
        } else {
          firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
        }
    
        let calendarDay = {
          currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
          date: (new Date(firstDayOfMonth)),
          month: firstDayOfMonth.getMonth(),
          number: firstDayOfMonth.getDate(),
          selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
          year: firstDayOfMonth.getFullYear()
        }
    
        currentDays.push(calendarDay);
      }
  
    return (
      <div className="table-content">
      {currentDays.map((day) => {
        return (
          <div
            key={day.date.toString()}
            className={
              "calendar-day" +
              (day.currentMonth ? " current" : "") +
              (day.selected ? " selected" : "")
            }
            onClick={() => props.handleCalendarDayClick(day)}
          >
            <p>{day.number}</p>
            {props.bookings.get(day.date.toString())?.map((booking, index) => (
              <div
                  key={booking.id}
                  className="booking-item"
                  onClick={(e) => {
                      e.stopPropagation(); // Prevent day click event
                      props.handleBookingClick(booking);
                  }}
                  style={{ cursor: "pointer" }}
              >
                  {Booking.getDisplay(booking)}
              </div>
            ))}
          </div>
        );
      })}
    </div>
    )
  }
  
  export default CalendarDays;