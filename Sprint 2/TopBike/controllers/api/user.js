const db = require("../../database/models")
module.exports = {
    getAll: async (req,res) => {
        try {
            const users = await db.User.findAll()
            res.json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    getOne: async (req,res) => {
        try {
            const user = await db.User.findByPk(req.params.id)
            res.json(user)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}