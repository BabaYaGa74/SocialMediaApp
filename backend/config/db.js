const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB connected successfully on: ${conn.connection.host}`);
  } catch (error) {
    console.log("Database Connection failed", error);
  }
};

module.exports = connectDB;
