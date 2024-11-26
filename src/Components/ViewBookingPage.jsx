import Booking from "../Booking";

function ViewBookingPage({pageHandler, selectedBooking, loggedInUser}) {
    return (
        <div className="App">
            <h1>Viewing Booking Information</h1>
            {Booking.getDisplay(selectedBooking)}
            <input
              type="button"
              value="Return to Dashboard"
              onClick={() => {
                pageHandler(loggedInUser[1] === 'customer' ? 'customerLanding' : 'businessLanding')
              }}
            />
        </div>
    );
}

export default ViewBookingPage;