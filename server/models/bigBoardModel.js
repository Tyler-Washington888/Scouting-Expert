const mongoose = require('mongoose')


const bigBoardSchema = mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required : true,
            ref: 'User'
        },
        year: {
            type: Number, 
            required: true
        },
        rankings: [
            {
                type: mongoose.Schema.Types.ObjectId, 
                ref: 'Player',
            }
        ]
    }
)

module.exports = mongoose.model("BigBoard", bigBoardSchema)