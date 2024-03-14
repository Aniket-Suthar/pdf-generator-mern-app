const mongoose = require("mongoose");
require('dotenv').config()

//Connection to a existing database of making a new Database if doesn't exist
const dbconnect=()=>{
mongoose.connect(process.env.MONGO_DB_URL)
.then(()=>{
    console.log("Connection Successful to Database")
})
.catch((err)=>{
    console.log(err);
})

}
module.exports = {dbconnect};
