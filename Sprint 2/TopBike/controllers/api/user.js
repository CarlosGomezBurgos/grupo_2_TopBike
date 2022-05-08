const db = require("../../database/models")
let url = "http://localhost:4000/img/avatars/"


module.exports = {
    getAll: async (req,res) => {
        try {
            const users = await db.User.findAll()
            users.forEach(user => {
                delete user.dataValues.password,
                user.dataValues.picture = url + user.dataValues.picture
            });

            res.json({
                count: users.length,
                data: users,
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getOne: async (req,res) => {
        try {
            const user = await db.User.findByPk(req.params.id)
            delete user.dataValues.password,
            user.dataValues.picture = url + user.dataValues.picture

            res.status(200).json({
                data:user,
                status: 200,
            }
            )
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}