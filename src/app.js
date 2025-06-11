let express=require("express");
let session=require("express-session");
let app=express();
let bodyparser=require("body-parser");
let conn=require("./config/db.js");
app.use(bodyparser.urlencoded({extended:true}));
app.use(bodyparser.json());
app.use(session({
    secret:"11111111fdf",
    resave:true,
    saveUninitialized:false
}));

//app.use("/", router);
app.set("view engine",'ejs');
app.use(express.static("public"));

module.exports=app;