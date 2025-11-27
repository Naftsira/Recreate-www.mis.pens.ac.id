require("dotenv").config();
const mongoose = require("mongoose");
const MONGODB_URI = process.env.MONGODB_URI;

const connectToDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("DB linked!");
  } catch (error) {
    console.error(error);
    console.log("Ada masalah pada koneksi database!");
  }
};

connectToDB();
