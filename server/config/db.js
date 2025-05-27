const mongoose = require("mongoose");

const connect = mongoose.connect(process.env.MONGO_URI);

const connection = mongoose.connection;

connection.on("connected", ()=>{
    console.log("DB connected")
})

connection.on("error", (error)=>{
    console.log("DB connection failed", error)
    process.exit(1)
})

module.exports = mongoose