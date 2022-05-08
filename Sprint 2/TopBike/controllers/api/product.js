const db = require("../../database/models")
let url = "http://localhost:4000/public/img/products/"

module.exports = {
    getAll: async (req,res) => {
        try {
            const products = await db.Product.findAll({
                include:['category']
            })
            products.forEach(product => {
                product.dataValues.image = url + product.dataValues.image
            });
            res.status(200).json({
                count: products.length,
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
            product.dataValues.image = url + product.dataValues.image
            res.status(200).json({
                data: product,
                status: 200,
            })
        } catch (error) {
            return res.status(500).json(error)
        }
    }
}