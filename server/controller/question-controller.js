const QuestionService = require('../service/question-service');

class questionController {

    async get(req, res, next) {
        try {
            const data = await QuestionService.get(req.body);
            return res.json(data);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            await QuestionService.create(req.body);
            return res.json({message: 'success'});
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

        async delete(req, res, next) {
        try {
            await QuestionService.delete(req.body);
            return res.json({message: 'success'});
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new questionController();