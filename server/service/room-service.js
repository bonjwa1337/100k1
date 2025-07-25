const RoomModel = require('../models/room-model');

class RoomService {

    async get(data) {
        try {
            const res = await RoomModel.findOne(data);
            return res;
        }

        catch (error) {
            return { message: 'error' };
        }
    }

    async create(data) {
        try {
            const info = {
                code: data.roomId,
                round: 1,
                players: [{ name: data.teamOne, points: 0 }, { name: data.teamTwo, points: 0 }],
                questionPack: data.questionPack
            }
            await RoomModel.create(info);
            return { message: 'success' };
        }
        catch (error) {
            return { message: 'error' };
        }
    }

    async delete(data) {
        try {
            await RoomModel.deleteOne({
                _id: data._id
            });
            return { message: 'success' };
        }

        catch (error) {
            return { message: 'error' };
        }
    }

    async update(data) {
        try {
            console.log(data)
            await RoomModel.updateOne({
                'players._id': data._id
            }, { $set: { 'players.$.errors': data?.errors, 'players.$.points': data.points } });
            return { message: 'success' };
        }

        catch (error) {
            return { message: 'error' };
        }
    }
}

module.exports = new RoomService();