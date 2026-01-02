const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb+srv://sebinjohn20_db:sebinjohn20_db2000@cluster0.ithnyoh.mongodb.net/"
  )
  .then(() => console.log("Database connected successfully"))
  .catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
  isActive: Boolean,
  tags: [String],
  createdAt: { type: Date, default: Date.now },
});

// create user model

const User = mongoose.model("User", userSchema);

async function runQueryExamples() {
  try {
    // //create a new doucmenent
    const newUser = await User.create({
      name: "UpdateUser",
      email: "UpdateUser@gmail.com",
      age: 27,
      isActive: true,
      tags: ["Developer"],
    });
    console.log("Created a new user", newUser);
    // const allUser = await User.find({});
    // console.log(allUser);
    // const getUserIsActive = await User.find({ isActive: false });
    // console.log(getUserIsActive);
    // const getAthulUsser = await User.findOne({ name: "Athul" });
    // console.log(getAthulUsser);
    // const getLastCreatedUserByUserId = await User.findById(newUser._id);
    // console.log(getLastCreatedUserByUserId);
    // const selectedFields = await User.find().select("name email -_id");
    // console.log(selectedFields);
    // const limitedUser = await User.find()
    //   .select("name email -_id")
    //   .limit(5)
    //   .skip(1);
    // console.log(limitedUser);
    // const sortedUsers = await User.find().sort({ age: 1 });
    // console.log(sortedUsers);
    // const countDoc = await User.countDocuments({ isActive: true });
    // console.log(countDoc);
    // const deletedUser = await User.findByIdAndDelete(newUser._id);
    // console.log("deleted User", deletedUser);

    const upadteUser = await User.findByIdAndUpdate(
      newUser._id,
      { $set: { age: 100 }, $push: { tags: "Updated" } },
      { new: true }
    );
    console.log("updatedUser", upadteUser);
  } catch (e) {
    console.log("Error->", e);
  } finally {
    await mongoose.connection.close();
  }
}

runQueryExamples();
