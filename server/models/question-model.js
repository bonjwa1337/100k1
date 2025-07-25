const { Schema, model } = require('mongoose');

const QuestionSchema = new Schema({
    round: { type: Number },
    text: { type: String },
    answers: [
        {
            text: { type: String },
            points: { type: Number },
        }
    ],
    questionPack: { type: Number },
})

module.exports = model('question', QuestionSchema)