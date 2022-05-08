const fs = require('fs');
const path = require('path');
const { validationResult } = require('express-validator');

let db = require('../database/models')

const productController = {
     productList: async (req, res) => {
          const categories = await db.Category.findAll()
          const products = await db.Product.findAll()
          
          let products_formato = products.map(product =>{
               product.actual_price = product.price * (1 - (product.discount/100));
               product.actual_price = product.actual_price.toFixed(2);
			product.price = parseFloat(product.price).toFixed(2);
			return product;
		})
          
          //console.log(products_formato)

          return res.render("product", {
               products: products_formato,
               categories
          });
     },
     detail: async (req, res) => {
          await db.Product.findByPk(req.params.id, {
               include: [{ association: "category" }],
          })
          .then(function (product) {
               product.actual_price = product.price * (1 - (product.discount/100));
               product.actual_price = product.actual_price.toFixed(2);
			product.price = parseFloat(product.price).toFixed(2);
               res.render('productDetail', { product: product });
          })

     },
     cart: async (req, res) => {
          const carts = await db.Cart.findAll({
               include: [{ 
                    association: "cartUser", 
                    association: "cartProduct" 
               }],
          })
          const products = await db.Product.findAll()
          const user = await db.User.findByPk(req.params.id)

          res.render('productCart', { 
               carts,
               products: products_formato,
               user
          });

     },
     create: async (req, res) => {
          const categories = await db.Category.findAll()
          res.render('productCreateForm', {
               oldData: req.body,
               categories
          })
     },
     edit: async (req, res) => {
          const oneProduct = await db.Product.findByPk(req.params.id);
          const categories = await db.Category.findAll();

          res.render('productEditForm', {
               oldData: req.body,
               categories,
               product: oneProduct,
          })
     },
     store: async (req, res) => {
          console.log(req.body)
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0) {
               console.log(1)
               return res.render('productCreateForm', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
               })
          } else {
               console.log(2)
               try {
                    const newProduct = {
                         name: req.body.name,
                         price: req.body.price,
                         discount: req.body.discount,
                         id_category: req.body.category,
                         description: req.body.description,
                         image: req.file.filename
                    }
                    await db.Product.create(newProduct)
                    res.redirect('/');

               } catch (error) {
                    return res.status(500).json(error)
               }

          }
     },
     update: async (req, res) => {
          console.log(req.body)
          const oneProduct = await db.Product.findByPk(req.params.id);
          const categories = await db.Category.findAll();

          const resultValidation = validationResult(req);

          if (resultValidation.errors.length > 0) {
               return res.render('productEditForm', {
                    errors: resultValidation.mapped(),
                    product: req.body,
                    categories
               })
          } else {
               try {
                    if (req.file) {
                         await db.Product.update({
                              name: req.body.name,
                              price: req.body.price,
                              discount: req.body.discount,
                              id_category: req.body.category,
                              description: req.body.description,
                              image: req.file.filename
                         }, {
                              where: {
                                   id: req.params.id
                              }
                         })

                    } else {
                         await db.Product.update({
                              name: req.body.name,
                              price: req.body.price,
                              discount: req.body.discount,
                              id_category: req.body.category,
                              description: req.body.description,
                         }, {
                              where: {
                                   id: req.params.id
                              }
                         })
                    }
                    res.redirect('/product');

               } catch (error) {
                    return res.status(500).json(error)
               }
          }
     },
     delete: async (req, res) => {
          await db.Product.destroy({
              where: {
                  id: req.params.id
              }
          })
          res.redirect("/product")
      }

}
module.exports = productController;