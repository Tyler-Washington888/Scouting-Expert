const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const asyncHandler = require("express-async-handler");

// @desc  Register new user
// @route POST /users
// @access Public
const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  
    if (!username || !email || !password) {
      res.status(400);
      throw new Error("Please add all fields");
    }
  
    // check if user exists
    const userExists = await User.findOne({ email });
  
    if (userExists) {
      res.status(400);
      throw new Error("User with that email already exists");
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    // Create user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(200).json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  });


// @desc Authenicate a user
// @route POST /users/login
// @access Public
const loginUser = asyncHandler(async (req, res,) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}); 

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user._id,
            username: user.username,
            email: user.email, 
            token: generateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error("invalid credentials")
    }
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
};

module.exports = {
    createUser, 
    loginUser
}