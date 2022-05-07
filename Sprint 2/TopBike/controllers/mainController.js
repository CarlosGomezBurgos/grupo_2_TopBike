let db = require('../database/models')



const mainController = {
    index: async (req, res) => {
        const categories = await db.Category.findAll()
        const products = await db.Product.findAll()
       
        return res.render("index", {
             products,
             categories
        });
   },
}
          
module.exports = mainController;