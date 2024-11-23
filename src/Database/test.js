const connection = require("./connect.js");

console.log("Posting");
connection.query("INSERT INTO users (username, hashed_password, user_type) VALUES (\x22" + "Test!" + "\x22, \x22" + "PASS" + "\x22, \x22" + "admin" + "\x22);", function (err, result) {
  if (err) throw err;
});
connection.c