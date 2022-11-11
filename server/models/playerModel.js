const mongoose = require('mongoose')


const playerSchema = mongoose.Schema(
    {
        creatorId: {
            type: mongoose.Schema.Types.ObjectId,
            required : true, 
            ref: 'User'
        },
        personal: {
            name: {
                first: {
                    type: String, 
                    required: true
                }, 
                last: {
                    type: String, 
                    required: true
                },
            },
            image: {
                type: String, 
                required: true
            },
            age: {
                type: Number, 
                required: true
            },  
            year: {
                type: String, 
                required: true, 
            },
            team: {
                type: String, 
                required: true 
            },
            measureables:{
                height: {
                    type: Number, 
                    required: true,
                },
                weight: {
                    type: Number, 
                    required: true,
                },
            }, 
            position: {
                type: String, 
                required: true
            }
        },
        stats:{
            points: {
                type: Number, 
                required: true,
            },
            rebounds: {
                type: Number, 
                required: true,
            },
            assists: {
                type: Number, 
                required: true,
            },
            blocks: {
                type: Number, 
                required: true,
            },
            threePointer: {
                type: Number, 
                required: true,
            },
        }, 
        comparisons: [String],
        overview: String,
        strengths: [String],
        weaknesses: String
    },
    {
        timestamp: true 
    }
)


module.exports = mongoose.model('Player', playerSchema)