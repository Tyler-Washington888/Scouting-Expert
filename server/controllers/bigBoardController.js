const User = require("../models/userModel");
const Player = require('../models/playerModel')
const bigBoard = require('../models/bigBoard')
const asyncHandler = require("express-async-handler");


// @desc Create big board 
// @route POST /bigBoards
// @access Public
const createBigBoard = asyncHandler (async (req, res) => {
    const {creatorId, year, rankings} = req.body

    if (!creatorId || !year || !rankings){
        res.status(400)
        throw new Error("Please add all required fields")
    }

    const duplicate = await bigBoard.findOne({year})

    if (duplicate){
        res.status(400)
        throw new Error(`A ${year} Big Board already exists`);
    }

     // Create Big Board
     const newBigBoard = await bigBoard.create({
        creatorId
        year,
        rankings,
      });

    if (newBigBoard) {
        res.status(200).json({newBigBoard});
    } else {
        res.status(400);
        throw new Error("Invalid Big Board data");
    }
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