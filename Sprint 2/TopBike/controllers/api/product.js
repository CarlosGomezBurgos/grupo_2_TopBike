const db = require("../../database/models")
module.exports = {
    getAll: async (req,res) => {
        try {
            const products = await db.Product.findAll({
                include:['category']
            })
            res.json(products)
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}