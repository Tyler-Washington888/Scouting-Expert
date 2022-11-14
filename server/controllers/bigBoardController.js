const User = require("../models/userModel");
const Player = require('../models/playerModel')
const bigBoard = require('../models/bigBoardModel')
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
        creatorId,
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
// @route PUT /bigBoards/:bb_id/players/:id
// @access Public
const updateBigBoard = asyncHandler ( async(req, res,) => {
    const bBoard = await bigBoard.findById(req.params.bb_id);
    const player = await Player.findById(req.params.id);
    const {rank} = req.body

    if(!bBoard){
        res.status(400)
        throw new Error('Big board not found');
    };

    if(!player){
        res.status(400)
        throw new Error('Player not found');
    };

    if(!rank){
        res.status(400)
        throw new Error('Player include desired player ranking');
    }

    // if players exists in rankings array delete them 
    for (let i = 0 ; i < bBoard.rankings.length; i++){
        if (bBoard.rankings[i].ObjectId == player._id){
            bBoard.rankings.splice(i, 1);
            return;
        }
    };

    // add player to rankings array based on new ranking
    if (rank >= bBoard.rankings.length){
         bBoard.rankings.push(player)
    }else {
        bBoard.rankings.splice(rank, 0, player)
    }

    const updatedBBoard = await bigBoard.findByIdAndUpdate(req.params.bb_id, {bBoard}, {new: true})

    if(updatedBBoard){
        res.status(200).json({updatedBBoard});
    }else{
        res.status(400);
        throw new Error("Invalid Big Board data");
    }
});

module.exports = {
    createBigBoard, 
    updateBigBoard
}