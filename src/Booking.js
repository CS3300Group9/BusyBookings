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
        return (
            <div>
                <h1>{bookingInstance.business}</h1>
            </div>
        )
    }
}

export default booking;