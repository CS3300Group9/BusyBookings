var mysql = require("mysql");

const con = mysql.createConnection({
    host: "34.45.247.194",
    user: "Group9",
    password: "food@4193",
    database: "prod"
  });

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected");
  });

  module.exports = con;