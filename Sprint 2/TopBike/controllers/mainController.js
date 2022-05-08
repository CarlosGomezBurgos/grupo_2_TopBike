let db = require('../database/models')



const mainController = {
     index: async (req, res) => {
          const categories = await db.Category.findAll()
          const products = await db.Product.findAll()

          let products_formato = products.map(product => {
               product.actual_price = product.price * (1 - (product.discount / 100));
               product.actual_price = product.actual_price.toFixed(2);
               product.price = parseFloat(product.price).toFixed(2);
               return product;
          })

          return res.render("index", {
               products: products_formato,
               categories
          });
     },
}

module.exports = mainController;