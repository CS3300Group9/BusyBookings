import Booking from "../Booking";

// USED
// very simple, just allows you to view a booking

function ViewBookingPage({pageHandler, selectedBooking, loggedInUser}) {
    return (
        <div className="blueContainer">
            <div className="mainBox">
                <div className="App">
                    <h1>Viewing Booking Information</h1>
                    {Booking.getDisplay(selectedBooking)}
                    <input
                        className='buttonCustom'
                        type="button"
                        value="Return to Dashboard"
                        onClick={() => {
                            pageHandler(loggedInUser[1] === 'customer' ? 'customerLanding' : 'businessLanding')
                        }}
                    />
                </div>
            </div>
        </div>
    );
}

export default ViewBookingPage;