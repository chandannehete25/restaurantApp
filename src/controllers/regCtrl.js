const bcrypt = require("bcryptjs");
const regmodel = require("../models/regModel.js");
exports.regCtrl = (req, res) => {
  res.render("nav.ejs"); // This loads views/nav.ejs
};

exports.signUpPage = (req, res) => {
  res.render("register.ejs", { message: "" });
};

exports.signInPage = (req, res) => {
  res.render("login.ejs", { message: "" });
};
exports.registerUser = (req, res) => {
  const { name, email, contact, username, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const userData = {
    name,
    email,
    contact,
    username,
    password: hashedPassword,
  };

  regmodel.insertUser(userData)
    .then(() => {
      res.render("login.ejs", { message: "Registration successful. Please log in." });
    })
    .catch((err) => {
      console.error(err);
      res.render("register.ejs", { message: "Registration failed." });
    });
};

exports.validateUser = (req, res) => {
  const { username, password } = req.body;
  regmodel.validateUserFromDB(username)
    .then((result) => {
      if (result.length > 0 && bcrypt.compareSync(password, result[0].password)) {
        req.session.uid = result[0].id;
        res.render("nav.ejs");
      } else {
        res.render("login.ejs", { message: "Invalid username or password" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.render("error.ejs", { error: err });
    });
};