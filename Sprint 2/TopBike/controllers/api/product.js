const db = require("../../database/models")
module.exports = {
    getAll: async (req,res) => {
        try {
            const products = await db.Product.findAll({
                include:['category']
            })
            res.status(200).json({
                total: products.length,
                data: products,
                status: 200,
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    },
    
    getOne: async (req,res) => {
        try {
            const product = await db.Product.findByPk(req.params.id)
            res.status(200).json({
                data: product,
                status: 200,
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}