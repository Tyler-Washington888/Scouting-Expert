const User = require("../models/userModel");
const Player = require('../models/playerModel')
const BigBoard = require('../models/bigBoardModel')
const asyncHandler = require("express-async-handler");
 
// @desc Create big board 
// @route POST /bigBoards
// @access Public
const createBigBoard = asyncHandler (async (req, res) => {
    const {creatorId, year, rankings} = req.body

    if (!creatorId || !year){
        res.status(400)
        throw new Error("Please add all required fields")
    }

    const duplicate = await BigBoard.findOne({year})

    if (duplicate){
        res.status(400)
        throw new Error(`A ${year} Big Board already exists`);
    }

     // Create Big Board
     const newBigBoard = await BigBoard.create({
        creatorId,
        year,
        rankings: []
    });

    if (newBigBoard) {
        res.status(200).json({newBigBoard});
    } else {
        res.status(400);
        throw new Error("Invalid Big Board data");
    }
});

// @desc Updates player ranking in specific big board
// @route PUT /bigBoards/:bb_id/players/:id
// @access Public

async function callBigBoard (bigBoardId, playerId, rank) {
    // find bigBoard and player to update
    const bBoard = await BigBoard.findById(bigBoardId);
    const player = await Player.findById(playerId);

    // catch errors
    if(!player || !bBoard){
        console.log({
            bBoard,
            player, 
        });

        return {
            status: false, 
            rankings: []
        }
    }

    // if player exists in rankings array delete them 
    for (let i = 0 ; i < bBoard.rankings.length; i++){
        if (bBoard.rankings[i].toString() == player._id.toString()){
            bBoard.rankings.splice(i, 1);
        }
    };

    // add player to rankings array based on new ranking
    if (rank >= bBoard.rankings.length){
         bBoard.rankings.push(player)
    }else{
        bBoard.rankings.splice(rank, 0, player)
    };

    const updatedBBoard = await BigBoard.findByIdAndUpdate(bigBoardId, {
        creatorId: bBoard.creatorId, 
        year: bBoard.year, 
        rankings: bBoard.rankings
    }, 
    {new: true})

    if(updatedBBoard){
        return {
            status: true, 
            rankings: updatedBBoard.rankings
        }
    }else{
        console.log('Big board failed to update')
        return {
            status: false, 
            rankings: bBoard.rankings
        }
    }
}

const updateBigBoard = asyncHandler ( async(req, res,) => {

    let rank = parseInt(req.body.rank)

    if(isNaN(rank)){
        res.status(400)
        throw new Error("Rank is not a number")
    }

    // decrease rank by 1 to account for arrays being zero indexed
    // Example: if user wantes to change player's rank from 10(9th index position) to 1(0 index position)
    rank--

    if(rank < 0){
        rank = 0
    }

    // helper function used to re sort playerId's in big board ranking's array 
    const bigBoardRankings = await callBigBoard(req.params.bb_id, req.params.id, rank)

    if(!bigBoardRankings.status){
        res.status(400)
        throw new Error('Error connecting to database')
    }

    // converts each playerId in big board rankings array to object
    const playerObjects = bigBoardRankings.rankings.map( async playerId => await Player.findById(playerId))

    Promise.all(playerObjects).then(players => {
        const filteredPlayers = players.filter(player => player)

        if(!filteredPlayers.length){
            res.status(400)
            throw new Error('Error connecting to database')
        }

        res.status(200).json({rankings: filteredPlayers})
    })
})

module.exports = {
    createBigBoard, 
    updateBigBoard
}