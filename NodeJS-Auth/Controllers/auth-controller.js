// register controllers
const User = require("../Models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    //extract user information from our request body
    const { username, email, password, role } = req.body;
    // Check if the user is already exits in out database
    const checkExitsingUser = await User.findOne({
      $or: [{ username }, { email }],
    });
    if (checkExitsingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User is already exists either with same username or email . Please try again other username and email",
      });
    }
    //has user password

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user and save in your database

    const newlyCreatedUser = new User({
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });
    await newlyCreatedUser.save();
    if (newlyCreatedUser) {
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Unable to  register! Please try again",
      });
    }
  } catch (error) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

// login controllers

const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    //find if the current user is exists in databade or not
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid username ",
      });
    }

    /// if password is correct or not

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    /// create user tokens

    const accessToken = jwt.sign(
      {
        userId: user._id,
        username: user.username,

        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "30m",
      }
    );
    res.status(200).json({
      success: true,
      message: "Logged in successful",
      accessToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const userId = req.userInfo.userId;

    ///extract old and new password
    const { oldPassword, newPassword } = req.body;
    /// find the current logged in user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    /// check if the old password is correct
    const isPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password is not correct! Please try again.",
      });
    }
    //has the new password here
    const salt = await bcrypt.genSalt(10);
    const newHashedpassword = await bcrypt.hash(newPassword, salt);

    // update user password

    user.password = newHashedpassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occured! Please try again",
    });
  }
};

const changeEmail = async (req, res) => {
  try {
    const userId = req.userInfo.userId;
    const { oldEmail, newEmail } = req.body;
    const user = await User.findById(userId);
    if (!oldEmail || !newEmail) {
      return res.status(400).json({
        success: false,
        message: "Old email and new email are required",
      });
    }
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.email !== oldEmail) {
      return res.status(400).json({
        success: false,
        message: "Old email does not match",
      });
    }
    // check if new email already exists

    const emailExists = await User.findOne({ email: newEmail });
    if (emailExists) {
      return res.status(400).json({
        success: false,
        message: "Email already in use. Please choose another",
      });
    }
    user.email = newEmail;
    await user.save();
    res.status(200).json({
      success: true,
      message: "Email changed successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Some error occurred! Please try again",
    });
  }
};
module.exports = { registerUser, loginUser, changePassword, changeEmail };

//
