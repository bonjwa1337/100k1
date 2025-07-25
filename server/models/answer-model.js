const { Schema, model } = require('mongoose');

const AnswerSchema = new Schema({
    roomCode: { type: String },
    round: { type: String },
    isOpen: { type: Boolean, default: false },
    answer: { type: Number },
    questionPack: { type: Number }
})

module.exports = model('answer', AnswerSchema)