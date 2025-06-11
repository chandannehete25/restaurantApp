const bcrypt = require("bcryptjs");
let RegService = require("../services/regService.js");
const regmodel = require("../models/regModel.js");
//const { acceptregdata } = require("../services/regService.js");
exports.regCtrl = (req, res) => {
  res.render("nav.ejs"); // This loads views/nav.ejs
};

exports.signUpPage = (req, res) => {
  res.render("register.ejs", { msg: "" });
};

exports.signInPage = (req, res) => {
  res.render("login.ejs", { msg: "" });
};
exports.registerUser = (req, res) => {
  const { name, email, contact, oldusername, newusername, password } = req.body;
  //const hashedPassword = bcrypt.hashSync(password, 10);
  let result = RegService.acceptregdata(
    name,
    email,
    contact,
    oldusername,
    newusername,
    password
  );
  res.render("register.ejs", { msg: result });
};

//   const userData = {
//     name,
//     email,
//     contact,
//     username,
//     password: hashedPassword,
//   };

//   regmodel.insertUser(userData)
//     .then(() => {
//       res.render("login.ejs", { message: "Registration successful. Please log in." });
//     })
//     .catch((err) => {
//       console.error(err);
//       res.render("register.ejs", { message: "Registration failed." });
//     });
// };

exports.validateUser = (req, res) => {
    const { username, password } = req.body;
  
    regmodel.validateUserFromDB(username)
      .then((result) => {
        if (result.length === 0) {
          return res.render("login.ejs", { message: "User not found. Please register first." });
        }
  
        const user = result[0];
        const match = bcrypt.compareSync(password, user.password); // compare hash
  
        if (match) {
          req.session.uid = user.id;
          res.render("nav.ejs");
        } else {
          res.render("login.ejs", { message: "Incorrect password." });
        }
      })
      .catch((err) => {
        console.error(err);
        res.render("error.ejs", { error: err });
      });
  };
  