import $api from '../http';

export default class QuestionService {

    static async create(data) {
        try {
            const query = {
                round: data.round,
                questionPack: data.questionPack,
                text: data.text,
                answers: [
                    {
                        text: data.answer1,
                        points: data.point1
                    },
                    {
                        text: data.answer2,
                        points: data.point2
                    },
                    {
                        text: data.answer3,
                        points: data.point3
                    },
                    {
                        text: data.answer4,
                        points: data.point4
                    },
                    {
                        text: data.answer5,
                        points: data.point5
                    },
                    {
                        text: data.answer6,
                        points: data.point6
                    },
                ]
            }
            return await $api.post('/question-create', query);
        } catch (e) {
            console.log(e)
        }
    }

    static async get(data) {
        try {
            return await $api.post('/question-get', data);
        } catch (e) {
            console.log(e)
        }
    }

    static async delete(data) {
        try {
            return await $api.post('/question-delete', data);
        } catch (e) {
            console.log(e)
        }
    }
}