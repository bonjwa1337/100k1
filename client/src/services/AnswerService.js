import $api from '../http';

export default class AnswerService {

    static async create(data) {
        try {
            return await $api.post('/answer-create', data);
        } catch(e) {
            console.log(e)
        }
    }

    static async update(data) {
        try {
            return await $api.post('/answer-update', data);
        } catch(e) {
            console.log(e)
        }
    }

    static async get(data) {
        try {
            return await $api.post('/answer-get', data);
        } catch(e) {
            console.log(e)
        }
    }
}