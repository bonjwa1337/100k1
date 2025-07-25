const RoomService = require('../service/room-service');

class roomController {

    async get(req, res, next) {
        try {
            const data = await RoomService.get(req.body);
            return res.json(data);
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async create(req, res, next) {
        try {
            await RoomService.create(req.body);
            return res.json({ message: 'success' });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async delete(req, res, next) {
        try {
            await RoomService.delete(req.body);
            return res.json({ message: 'success' });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }

    async update(req, res, next) {
        try {
            await RoomService.update(req.body);
            return res.json({ message: 'success' });
        } catch (e) {
            console.log(e)
            next(e)
        }
    }
}

module.exports = new roomController();