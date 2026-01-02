const mongoose = require("mongoose");

const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://sebinjohn20_db:sebinjohn20_db2000@cluster0.ithnyoh.mongodb.net/"
    );
    console.log("MongoDb is connected successfully!");
  } catch (e) {
    console.error("MongoDb connection is failed ", e);
    process.exit(1);
  }
};

module.exports = connectToDB;
