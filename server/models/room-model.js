const { Schema, model } = require('mongoose');

const RoomSchema = new Schema({
    code: { type: String },
    round: { type: String },
    players: [
        {
            name: { type: String },
            points: { type: Number, default: 0 },
            errors: { type: Number, default: 0 },
        }
    ],
    questionPack: { type: Number },
})

module.exports = model('room', RoomSchema)