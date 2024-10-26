//npm install mysql
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
    con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
      if (result.length == 0) {
        console.log("Incorrect Username");
        return false;
      }
      return true;
    });
  }

  validate(username, hashed_password) {
    console.log("Validating")
    con.query("select * from users where username = \x22"+ username +"\x22", function (err, result) {
      console.log(result)
      if (result.length == 0) {
        console.log("Incorrect Username")
        return false;
      }
      if(!hashed_password.localeCompare(result[1]["hashed_password"])) {
        console.log("Found! Given:" + hashed_password + " True:" + result[0]["hashed_password"])
        return true;
      }
      console.log("Mismatch! Given: " + hashed_password + " True:" + result[0]["hashed_password"])
      return false;
    });
  }
}


//Example Call
//db = new db_connector
//db.add_user("Test", "Test", "admin")

