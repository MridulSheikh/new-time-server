const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("colors");
const app = require("./app");

// database connection
mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/freetime").then(()=>{
    console.log(`Database connection is successfull`.red.bold)
})

//server
const port = process.env.PORT || 5000;

app.listen(port,()=>{
    console.log(`App is runnig on port ${port}`)
})