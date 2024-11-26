// Business.js
class Business {
    constructor(name, address, startAvailableTime, endAvailableTime, availableDays) {
      this.name = name;
      this.address = address;
      this.startAvailableTime = startAvailableTime; // Expected format: "HH:MM"
      this.endAvailableTime = endAvailableTime;     // Expected format: "HH:MM"
      this.availableDays = availableDays
    }
  }
  
  export default Business;
  