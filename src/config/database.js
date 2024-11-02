const mongoose = require("mongoose")

const connectDB = async () => {
   await mongoose.connect('mongodb+srv://shivam2300:6fNK0AJi75zBMK6T@cluster0.skbta.mongodb.net/')
}

module.exports = connectDB;