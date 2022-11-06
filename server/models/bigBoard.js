const mongoose = require('mongoose')


const bigBoardSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.type.ObjectId
            required : true,
            ref: 'User'
        },
        year: {
            type: Number, 
            required: true
        }
        rankings: [{type: mongoose.Schema.type.ObjectId, ref: 'Player'}]
    }
)