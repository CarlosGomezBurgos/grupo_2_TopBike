const db = require("../../database/models")
module.exports = {
    getAll: async (req,res) => {
        try {
            const users = await db.Product.findAll({
                include:['category']
            })
            res.json(users)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}