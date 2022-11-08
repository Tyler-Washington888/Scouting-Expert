const User = require("../models/userModel");
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")

// @desc  Register new user
// @route POST /users
// @access Public
const createUser = async(req, res,) => {
    const {username, email, password} = req.body;

    if(!username || !email || !password){
        res.status(400)
        throw new Error("Please add all fields")
    }

    const userExists = await User.findOne({email})

    // see if user exists
    if(userExists){
        res.status(400)
        throw new Error("User with that email alreay exists")
    }

    // hash password 
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt)

    // Create User 
    const user = await User.create({
        username, 
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(200).json({
            _id: user.id,
            username: user.username,
            email: user.email, 
            token: geneerateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error("invalid User data")
    }
}


// @desc Authenicate a user
// @route POST /users/login
// @access Public
const loginUser = async (req, res,) => {
    const { email, password } = req.body;

    const user = await User.findOne({email}); 

    if (user && (await bcrypt.compare(password, user.password))) {
        res.json({
            _id: user.id,
            username: user.username,
            email: user.email, 
            token: geneerateToken(user._id),
        })
    }else {
        res.status(400);
        throw new Error("invalid credentials")
    }
}

module.exports = {
    createUser, 
    loginUser
}