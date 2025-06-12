let express = require("express");
let session = require("express-session");
let app = express();
let bodyparser = require("body-parser");

let router = require("./routes/regroutes.js");  // Adjusted to local path
let conn = require("./config/db.js");
const adminRoutes = require("./routes/adminRoutes.js");

app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

app.use(session({
    secret: "11111111fdf",
    resave: true,
    saveUninitialized: false
}));
app.set("view engine", "ejs");
app.use("/", router);

app.use("/", adminRoutes);

app.use(express.static("public"));

module.exports = app;
 