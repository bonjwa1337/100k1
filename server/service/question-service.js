const QuestionModel = require('../models/question-model');

class QuestionService {

    async get(data) {
        try {
            const res = await QuestionModel.findOne(data);
            res.answers = res.answers.sort((a, b) => b.points - a.points);
            return res;
        }

        catch (error) {
            return { message: 'error' };
        }
    }

    async create(data) {
        try {
            await QuestionModel.create({ ...data });
            return { message: 'success' };
        }
        catch (error) {
            return { message: 'error' };
        }
    }

    async delete(data) {
        try {
            await QuestionModel.deleteOne({
                _id: data._id
            });
            return { message: 'success' };
        }

        catch (error) {
            return { message: 'error' };
        }
    }
}

module.exports = new QuestionService();