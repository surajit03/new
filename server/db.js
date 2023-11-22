const mongoose = require("mongoose");
const mongoURI = "mongodb+srv://sura_jit:sura123@cluster0.9gitkxu.mongodb.net/server";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Connected to Mongo Successfully!");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectToMongo;