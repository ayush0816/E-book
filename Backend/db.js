const mongoose = require("mongoose");
const mongoURI = "mongodb://192.168.17.230:27017/test";

const connectToMongo = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/test", () => {
    console.log("connected to mongo");
  });
};

module.exports = connectToMongo;
