const User = require("../models/userModel");
const Player = require('../models/playerModel')
const asyncHandler = require("express-async-handler");


// @desc  Create new player
// @route POST /players
// @access Public
const createPlayer = asyncHandler(async (req, res) => {
    const {creatorId, firstName, lastName, image, age, year, team, height, weight, position, points, rebounds, assists, blocks, threePointer,  
        comparisons, overview, strengths, weaknesses} = req.body

    if (!creatorId || !firstName || !lastName || !image || !age || !year || !team || !height || 
        !weight || !position || !points || !rebounds || !assists || !blocks || !threePointer || !comparisons || 
        !overview || !strengths || !weaknesses ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

     // check if player exists
     const existingPlayer = await Player.findOne({"personal.name.first":firstName, "personal.name.last":lastName, "personal.year":year});

     if (existingPlayer) {
        res.status(400).json({success: false, error: {message:`${firstName} ${lastName} in the ${year} draft already exists`}, existingPlayer});
     }

    // Create player
    const player = await Player.create({
        creatorId,
        personal: {
            name: {
                first: firstName,
                last: lastName
            },
            image,
            age,
            year,
            team,
            measureables: {
                height, 
                weight
            },
            position
        },
        stats: {
            points,
            rebounds,
            assists, 
            blocks, 
            threePointer,
        },
        comparisons,
        overview,
        strengths,
        weaknesses
    });

    if (player) {
        res.status(200).json({
            creatorId: player.creatorId, 
            firstName: player.personal.name.first, 
            lastName: player.personal.name.last, 
            image: player.personal.image, 
            age: player.personal.age,
            year: player.personal.year, 
            team: player.personal.team, 
            height: player.personal.measureables.height,
            weight: player.personal.measureables.weight,
            position: player.personal.position,
            points: player.stats.points, 
            rebounds: player.stats.rebounds,
            assists: player.stats.assists, 
            blocks: player.stats.blocks, 
            threePointer: player.stats.threePointer, 
            comparisons: player.comparisons,
            overview: player.overview, 
            strengths: player.strengths,
            weaknesses: player.weaknesses
        });
      } else {
        res.status(400);
        throw new Error("Invalid player data");
      }
});

// @desc  Get player
// @route GET /players
// @access Public
const getPlayer = asyncHandler(async(req, res) => {
    const {firstName, lastName, year} = req.body

     //search for player
     const player = await Player.findOne({"personal.name.first": firstName, "personal.name.last": lastName, "personal.year": year});
  
     if (player){
       res.status(200).json(player);
     }else{
        res.status(400);
        throw new Error("Player was not found");
     }
});

// @desc Update player 
// @route PUT /players/:id
// @access Public
const updatePlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id)

    if(!player){
        res.status(400)
        throw new Error("Player not found")
    }

    const {creatorId, firstName, lastName, image, age, year, team, height, weight, position, points, rebounds, assists, blocks, threePointer,  
        comparisons, overview, strengths, weaknesses} = req.body

    if (!creatorId || !firstName || !lastName || !image || !age || !year || !team || !height || 
        !weight || !position || !points || !rebounds || !assists || !blocks || !threePointer || !comparisons || 
        !overview || !strengths || !weaknesses ) {
        res.status(400);
        throw new Error("Please add all fields");
    }

    const updatedPlayer = await Player.findByIdAndUpdate(req.params.id, {
        creatorId,
        personal: {
            name: {
                first: firstName,
                last: lastName
            },
            image,
            age,
            year,
            team,
            measureables: {
                height, 
                weight
            },
            position
        },
        stats: {
            points,
            rebounds,
            assists, 
            blocks, 
            threePointer,
        },
        comparisons,
        overview,
        strengths,
        weaknesses
    }, {
        new: true,
    });

    if (updatedPlayer){
        res.status(200).json(updatedPlayer);
      }else{
         res.status(400);
         throw new Error("Player update unsuccessful");
    }
});

// @desc Delete player 
// @route DELETE /players/:id
// @access Public
const deletePlayer = asyncHandler(async (req, res) => {
    const player = await Player.findById(req.params.id)

     // check for user
    if(!player){
        res.status(400)
        throw new Error("Player not found")
    }

    await player.remove();
  
    res.status(200).json({ id: req.params.id });
});

module.exports = {
    createPlayer,
    getPlayer, 
    updatePlayer,
    deletePlayer
}