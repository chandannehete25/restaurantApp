const bcrypt = require("bcryptjs");
let RegService = require("../services/regService.js");
const regmodel = require("../models/regModel.js");

exports.regCtrl = (req, res) => {
  res.render("home.ejs"); // This loads views/nav.ejs
};

exports.homePage=(req,res)=>{
  res.render("home.ejs");
}
exports.signUpPage = (req, res) => {
  res.render("register.ejs", { msg: "" });
};

exports.signInPage = (req, res) => {
  res.render("login.ejs", { msg: "" });
};


exports.registerUser = (req, res) => {
  const { name, email, contact, username, password } = req.body;

  const userData = {
    name,
    email,
    contact,
    username,
    password 
  };

  regmodel.insertUser(userData)
    .then(() => {
      res.render("login.ejs", { msg: "Registration successful. Please log in." });
    })
    .catch((err) => {
      console.error("Registration Error:", err);
      if (err.code === "ER_DUP_ENTRY") {
        res.render("register.ejs", { msg: "Username already exists." });
      } else {
        res.render("register.ejs", { msg: "Registration failed." });
      }
    });
};

exports.validateUser = (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  regmodel.validateUserWithPassword(username, password)
    .then((result) => {
      if (result.length > 0) {
        req.session.uid = result[0].id;       //store user ID in session
        res.render("adminDashboard.ejs" );
      } else {
        res.render("login.ejs", { msg: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error("Login Error:", err);
      res.render("error.ejs", { error: err });
    });
};

exports.validateUserWithPassword = (username, password) => {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    conn.query(sql, [username, password], (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

exports.addCategory=(req,res)=>{
  res.render("addCat.ejs");
}