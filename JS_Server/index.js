import express from 'express';
import mysql from 'mysql'

class db_connector {
    constructor() {
      console.log('Beginning');
  
      //var mysql = require('mysql');
      this.test = 1
  
      this.con = mysql.createConnection({
        host: "34.45.247.194",
        user: "Group9",
        password: "food@4193",
        database: "prod"
      });
  
      this.con.connect(function(err) {
        if (err) throw err;
        console.log("Connected");
      });
    }
  
    add_user(username, hashed_password, type) {
        console.log("Posting");
        this.con.query("INSERT INTO users (username, hashed_password, user_type) VALUES (\x22" + username + "\x22, \x22" + hashed_password + "\x22, \x22" + type + "\x22);", function (err, result) {
          if (err) throw err;
        });
    }
  
    add_booking(name, contact ,start ,end ,buisness, customer, notes, date) {
      console.log("Posting Booking");
      this.con.query("INSERT INTO bookings (booking_name, contactInfo ,start_time ,end_time ,buisness, customer, notes, dates) VALUES (\x22" + name + "\x22, \x22" + contact+ "\x22, \x22" + start + "\x22,\x22" + end + "\x22,\x22" + buisness+ "\x22,\x22" + customer +  "\x22, \x22" + notes + "\x22, \x22" + date + "\x22);", function (err, result) {
        if (err) throw err;
      });
      return true;
    }
  
     user_exists(username) {
      console.log("Checking for " + username);
      return new Promise((resolve, reject) => {
        this.con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
        if (result.length == 0) {
            console.log("Incorrect Username");
            resolve(false);
          }
          console.log("Found!");
          resolve(true);
        });
      });
      }
  
      user_type(username) {
        console.log("Checking type for " + username);
        return new Promise((resolve, reject) => {
            this.con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
              console.log(JSON.stringify(result));
              if (result.length == 0) {
                resolve("incorrect-user")
              } else {
              console.log("Type = " + result[0]["user_type"]);
              resolve(result[0]["user_type"]);
              }
            });
        });
      }
  
      listBusiness() {
        return new Promise((resolve, reject) => {
          this.con.query("select username from users where user_type = \x22"+ "business" +"\x22", function (err, result) {
            console.log(JSON.stringify(result));
            resolve(result);
          });
        });
      }
  
    customer_bookings(user) {
      return new Promise((resolve, reject) => {
        this.con.query("select * from bookings where customer = \x22"+ user +"\x22", function (err, result) {
          resolve(result)
        });
      });
    }
  
    buisness_bookings(user) {
      return new Promise((resolve, reject) => {
        this.con.query("select * from bookings where buisness = \x22"+ user +"\x22", function (err, result) {
          resolve(result)
        });
      });
    }
  
    validate(username, hashed_password) {
      console.log("Validating")
      return new Promise((resolve, reject) => {
      this.con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
        console.log("KSJBFKJ")
        //console.log(result)
        if (result.length == 0) {
          console.log("Incorrect Username")
          resolve(false);
          return;
        }
        console.log(result)
        if(!hashed_password.localeCompare(result[0]["hashed_password"])) {
          console.log("Found! Given:" + hashed_password + " True:" + result[0]["hashed_password"])
          resolve(true);
          return;
        }
        console.log("Mismatch! Given: " + hashed_password + " True:" + result[0]["hashed_password"])
        resolve(false)
        return
      });
      });
    }
  }

const app = express();
const db = new db_connector();

app.get('/validate/:name/:password', (req, res) => {
    const user = req.params.name
    const password = req.params.password
    console.log("User:" + user)
    console.log("Password:" + password)
    db.validate(user, password).then((exists) => {
      console.log("Exists: " + exists)
      if (exists) {
        console.log("YAY SENDING LOGIN")
        res.send(true)
      } else {
        console.log("BOO SENDING FAILURE")
        res.send(false)
      }
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  app.get('/type/:name', (req, res) => {
    const user = req.params.name
    console.log("TYPE: " + user)
    db.user_type(user).then((type) => {
        console.log(type)
        res.send(type)
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  app.get('/user/:name', (req, res) => {
    const user = req.params.name
    db.user_exists(user).then((exists) => {
      if (exists) {
        res.send(true)
      } else {
        res.send(false)
      }
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  app.get('/buisness', (req, res) => {
    db.listBusiness().then((all_buisness) => {
      res.send(all_buisness)
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  
  app.get('/bookings/:name', (req, res) => {
    const user = req.params.name
    db.customer_bookings(user).then((bookings) => {
      res.send(bookings)
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  app.get('/buisness-bookings/:name', (req, res) => {
    const user = req.params.name
    db.buisness_bookings(user).then((bookings) => {
      res.send(bookings)
    }).catch((err) => {
      console.error("Error checking user: ", err);
    });
  });
  
  app.post('/addUser/:name/:password/:type',(req, res) => {
      console.log("POST");
      const user = req.params.name
      const password = req.params.password
      const type = req.params.type
      db.add_user(user, password, type)
      res.send("POST Request Called")
    })
  
  app.post('/addBooking/:name/:contact/:start/:end/:buisness/:customer/:notes/:date',(req, res) => {
      const name = req.params.name
      const contact = req.params.contact
      const start = req.params.start
      const end = req.params.end
      const buisness = req.params.buisness
      const customer = req.params.customer
      const notes = req.params.notes
      const date = req.params.date
      console.log("POST BOOKING");
  
      db.add_booking(name, contact ,start ,end ,buisness, customer, notes, date)
      res.send("POST Request Called")
    })

const port = parseInt(process.env.PORT) || 8080;
app.listen(port, () => {
  console.log(`helloworld: listening on port ${port}`);
});