const mongoose = require("mongoose");
const connect = mongoose.connect("mongodb://localhost:27017/campuspoll");

connect.then(() => {
    console.log("Database connected succesfully");
})
.catch(() => {
    console.log("Database cannot be connected");
});

const signUpSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});

const collection = new mongoose.model("users", signUpSchema);

module.exports = collection;