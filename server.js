class db_connector {
  constructor() {
    console.log('Beginning');

    var mysql = require('mysql');
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


const express = require('express');
var cors = require('cors');
const app = express();
app.use(cors());

const port = 3001;
const db = new db_connector();


//Access Control Problems
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/


//API

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

app.post('/addUser/:name/:password/:type',(req, res) => {
    console.log("POST");
    const user = req.params.name
    const password = req.params.password
    const type = req.params.type
    db.add_user(user, password, type)
    res.send("POST Request Called")
  })

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
});