class Booking {
    static idCounter = 0;

    constructor(startTime, endTime, name, contactInfo, notes, business, customer, date) {
        this.id = Booking.idCounter++;
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.contactInfo = contactInfo;
        this.notes = notes;
        this.business = business;
        this.customer = customer;
        this.date = date;
    }

    static getDisplay(bookingInstance) {
        if (!bookingInstance) {
            return <div></div>;
        } else {
            return (
                <div className="booking-display">
                    <p><strong>Time:</strong> {bookingInstance.startTime} to {bookingInstance.endTime}</p>
                    <p><strong>Customer:</strong> {bookingInstance.customer}</p>
                    <p><strong>Business:</strong> {bookingInstance.business}</p>
                    {bookingInstance.notes && (
                        <p><strong>Notes:</strong> {bookingInstance.notes}</p>
                    )}
                    {bookingInstance.contactInfo && (
                        <p><strong>Contact:</strong> {bookingInstance.contactInfo}</p>
                    )}
                </div>
            );
        }
    }
}

export default Booking;
