const mysql = require("mysql");

var pool = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "login_signup_schemal"
  });
module.exports=pool;