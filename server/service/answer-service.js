const AnswerModel = require('../models/answer-model');

class AnswerService {

    async get(data) {
        try {
            const res = await AnswerModel.find(data);
            return res;
        }
        catch (error) {
            return { message: 'error' };
        }
    }

    async create(data) {
        try {
            for (let i = 0; i < data.answers.length; i++) {
                await AnswerModel.create({
                    roomCode: data.roomCode,
                    round: data.round,
                    answer: i + 1,
                    questionPack: data.questionPack
                });
            }

            return { message: 'success' };
        }
        catch (error) {
            return { message: 'error' };
        }
    }

    async update(data) {
        try {
            console.log(data)
            await AnswerModel.findOneAndUpdate({
                round: data.round,
                roomCode: data.roomCode,
                answer: data.answer
            }, { isOpen: data.isOpen }, { upsert: true, new: true });
            return { message: 'success' };
        }

        catch (error) {
            return { message: 'error' };
        }
    }
}

module.exports = new AnswerService();