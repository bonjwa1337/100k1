const AnswerService = require('../service/answer-service');

class answerController {

    async get(req, res, next) {
        try {
            const data = await AnswerService.get(req.body);
            return res.json(data);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            await AnswerService.create(req.body);
            return res.json({message: 'success'});
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

        async update(req, res, next) {
        try {
            await AnswerService.update(req.body);
            return res.json({message: 'success'});
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new answerController();