let express = require("express");
let session = require("express-session");
let app = express();
let bodyparser = require("body-parser");

let router = require("./routes/regroutes.js");  // Adjusted to local path
let conn = require("./config/db.js");
const adminRoutes = require("./routes/adminRoutes.js");
const menuRoutes = require("./routes/menuRoutes.js");
const staffRoutes = require("./routes/staffRoute.js");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: "11111111fdf",      //This is a secret key used to sign the session ID cookie
    resave: true,               //Forces the session to be saved back to the session store
    saveUninitialized: false    //creates a session only when you add data to req.session
}));
app.set("view engine", "ejs");
app.use("/", router);

app.use("/", adminRoutes);

app.use("/menu", menuRoutes);
//app.use("/", staffRoutes);
app.use("/staffs", staffRoutes);
app.use(express.static("public"));
app.use('/uploads', express.static('public/uploads'));
module.exports = app;
 