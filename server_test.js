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
        console.log('http://localhost:3001/addUser/' + x + '/' + y + '/' + z);
        axios.post('http://localhost:3001/addUser/' + x + '/' + y + '/' + z)
      }

    try {
        postUser(username, password, userType)
        console.log("Sent!")
    } catch (error) {
        console.log(error.toString())
        console.log()
    }

        
}   

async function createBooking(name, contact ,start ,end ,buisness, customer, notes) {

    async function postBooking(name, contact ,start ,end ,buisness, customer, notes){
        console.log('http://localhost:3001/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes);
        axios.post('http://localhost:3001/addBooking/' + name + '/' + contact + '/' + start + '/' + end + '/' + buisness + '/' + customer + '/' + notes);
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
        .get("http://localhost:3001/buisness")
    }

    async function getCustomerBookings(user) {
        async function search(user) {
            return await axios
            .get("http://localhost:3001/bookings/" + user)
        }

        const bookings = await search(user);
        return bookings.data
    }

    async function getBuisnessBookings(user) {
        async function search(user) {
            return await axios
            .get("http://localhost:3001/buisness-bookings/" + user)
        }

        const bookings = await search(user);
        return bookings.data
    }
    //Test Asynch Results Here
    //const bookings = await getBuisnessBookings("McDonalds")
    console.log(bookings)
    //bookings[0]["end_time"] is the value of 
}


//createUser("DEMO", "YAY", "customer")
//createBooking("Hiring Meeting", "404-333-6666" , "8:30" ,"9:30" ,"McDonalds", "John", "Pls Dress Nice");
tester()
