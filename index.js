let app=require("./src/app.js");

let PORT=3000;
app.listen(PORT,(req,res)=>{
    console.log("Server started at " +PORT + ` click here to run the view the project http://localhost:${PORT}`);
});