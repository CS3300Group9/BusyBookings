const axios = require("axios")
class Booking {
    constructor(startTime, endTime, name, contactInfo, notes, business, customer) {
        this.startTime = startTime;
        this.endTime = endTime;
        this.name = name;
        this.contactInfo = contactInfo;
        this.notes = notes;
        this.business = business;
        this.customer = customer;
    }
}
async function createUser(username, password, userType) {

    async function postUser(x, y, z){
        console.log('https://jsserver-1056678293451.us-east5.run.app/addUser/' + x + '/' + y + '/' + z);
        axios.post('https://jsserver-1056678293451.us-east5.run.app/addUser/' + x + '/' + y + '/' + z)
      }

    try {
        postUser(username, password, userType)
        console.log("Sent!")
    } catch (error) {
        console.log(error.toString())
        console.log()
    }

        
}   

async function createBooking(name, contact ,start ,end ,buisness, customer, notes, date) {

    async function postBooking(name, contact ,start ,end ,buisness, customer, notes){
        console.log('https://jsserver-1056678293451.us-east5.run.app/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes + '/' + date);
        axios.post('https://jsserver-1056678293451.us-east5.run.app/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes + '/' + date);
    }
    try {
        postBooking(name, contact ,start ,end ,buisness, customer, notes)
        console.log("Sent!")
    } catch (error) {
        //console.log(error.toString())
        console.log("OPPZ")
    }

        
}   

async function tester() {
//TO GET DATA FROM THESE GETTERS YOU WILL HAVE TO USE AWAIT AS FOLLOWS WHEN YOU CALL THIS FUNCTION, IN EXAMPLE BELOW CALLING GET BUISNESSES result_list.data WILL HOLD A JSON WITH ALL BUISNESSES
        /*
        const result_list = await getBuisnesses();
        */
    async function getBuisnesses() {
        return await axios
        .get("https://jsserver-1056678293451.us-east5.run.app/buisness")
    }

    async function getCustomerBookings(user) {
        async function search(user) {
            return await axios
            .get("https://jsserver-1056678293451.us-east5.run.app/bookings/" + user)
        }

        const bookings = await search(user);
        return bookings.data
    }

    async function getBuisnessBookings(user) {
        async function search(user) {
            return await axios
            .get("https://jsserver-1056678293451.us-east5.run.app/buisness-bookings/" + user)
        }

        const bookings = await search(user);
        return bookings.data
    }
    //Test Asynch Results Here
    //const bookings = await getBuisnesses()
    const bookings = await getBuisnessBookings("McDonalds")
    console.log(bookings)
}



createBooking("Hiring Meeting 3", "404-333-6666" , "8:30" ,"9:30" ,"McDonalds", "Billy", "Pls Dress Nice", "March 3");
//tester()
