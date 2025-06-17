const conn = require("../config/db");
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

exports.staffLoginPage = (req, res) => {
  res.render("staffLogin.ejs"); // this should point to the EJS file you posted
}; 

exports.registerUser = (req, res) => {
  const { name, email, contact, username, password, role } = req.body;

  const userData = {
    name,
    email,
    contact,
    username,
    password,
    role
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


exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      console.error("Session destroy error:", err);
      return res.status(500).send("Logout failed");
    }
    res.redirect("/"); // back to login page
  });
};
exports.validateUser = (req, res) => {
  const { username, password } = req.body;

  regmodel.validateUserWithPassword(username, password)
    .then((result) => {
      if (result.length > 0) {
        req.session.uid = result[0].id;
        res.render("adminDashboard.ejs");
      } else {
        res.render("login.ejs", { msg: "Invalid username/email or password" });
      }
    })
    .catch((err) => {
      console.error("Login Error:", err);
      res.render("error.ejs", { error: err });
    });
};

exports.validateUserWithPassword = (userInput, password) => {
  return new Promise((resolve, reject) => {
    let sql = "";
    let params = [];

    // Check if input looks like an email
    if (userInput.includes("@")) {
      sql = "SELECT * FROM user WHERE email = ? AND password = ?";
    } else {
      sql = "SELECT * FROM user WHERE username = ? AND password = ?";
    }

    params = [userInput, password];

    conn.query(sql, params, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};


exports.addCategory=(req,res)=>{
  res.render("addCat.ejs");
}

exports.staffLoginPage = (req, res) => {
  res.render("staffLogin.ejs", { msg: "" });
};

// Validate login by email + contact number
exports.validateStaffLogin = (req, res) => {
  const { email, contact_no } = req.body;

  const sql = "SELECT * FROM staff WHERE email = ? AND contact_no = ?";
  conn.query(sql, [email, contact_no], (err, result) => {
    if (err) {
      console.error("Login Error:", err);
      return res.render("error.ejs", { error: "Database error" });
    }

    if (result.length > 0) {
      req.session.staffId = result[0].staff_id;
      req.session.staffName = result[0].name;
      res.render("staffDashboard.ejs", { staff: result[0] });
    } else {
      res.render("staffLogin.ejs", { msg: "Invalid email or contact number" });
    }
  });
};
exports.logout = (req, res) => {
  req.session.destroy(err => {
    if (err) {
      return res.send("Logout failed");
    }
    res.redirect("/");
  });
};