import $api from '../http';

export default class RoomService {

    static async create(data) {
        try {
            return await $api.post('/room-create', data);
        } catch (e) {
            console.log(e)
        }
    }

    static async delete(data) {
        try {
            return await $api.post('/room-delete', data);
        } catch (e) {
            console.log(e)
        }
    }

    static async get(data) {
        try {
            return await $api.post('/room-get', data);
        } catch (e) {
            console.log(e)
        }
    }

    static async update(data) {
        try {
            return await $api.post('/room-update', data);
        } catch (e) {
            console.log(e)
        }
    }
}