const User = require("../models/userModel");
const Player = require('../models/playerModel')
const bigBoard = require('../models/bigBoard')
const asyncHandler = require("express-async-handler");


// @desc Create big board 
// @route POST /bigBoards
// @access Public
const createBigBoard = asyncHandler ( async(req, res,) => {
    console.log('creating bigBoard')
});

// @desc Update big board 
// @route PUT /bigBoards/:id/players/:id
// @access Public
const updateBigBoard = asyncHandler ( async(req, res,) => {
    console.log('update bigBoard')
});

module.exports = {
    createBigBoard, 
    updateBigBoard
}