class booking {
    constructor(startTime, endTime, name, contactInfo, notes, business, customer) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.contactInfo = contactInfo;
        this.notes = notes;
        this.business = business;
        this.customer = customer;
    }

    static getDisplay(bookingInstance) {
        if (bookingInstance === null || bookingInstance === undefined) {
            return (
                <div></div>
            )
        } else {
            return (
                <div>
                    {bookingInstance.startTime} to {bookingInstance.endTime}
                </div>
            )
        }
    }
}

export default booking;