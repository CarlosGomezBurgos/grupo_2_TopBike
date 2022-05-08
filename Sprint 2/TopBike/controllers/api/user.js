const db = require("../../database/models")
let url = "http://localhost:4000/public/img/avatars/"


module.exports = {
    getAll: async (req,res) => {
        try {
            const users = await db.User.findAll()
            users.forEach(user => {
                user.dataValues.picture = url + user.dataValues.picture
            });

            res.json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getOne: async (req,res) => {
        try {
            const user = await db.User.findByPk(req.params.id)
            user.dataValues.picture = url + user.dataValues.picture

            res.json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}