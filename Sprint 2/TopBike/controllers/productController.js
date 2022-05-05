const fs = require('fs');
const path = require('path');
const {validationResult} = require('express-validator');

let db = require('../database/models')

const productController = {
     index: async (req,res) => {
          await db.Product.findAll()
               .then(function(products){
                    return res.render("product",{products:products});
               })
     },
     detail: async (req,res) => {
          await db.Product.findByPk(req.params.id,{
               include:[{association: "category"}],
               // {association: "cart"}]
          })
          .then(function(product){
               res.render('productDetail',{product:product});
          })

     },
     cart: (req,res) => {
         res.render('productCart',{carrito: productsCart});

     },
     create: (req,res) => {
          db.Category.findAll()
               .then(function(categories){
                    res.render('productCreateForm',{
                         oldData: req.body,
                         categories: categories,
                    })
               })
     },
     edit: (req, res) => {
          let orderProduct = db.Product.findByPk(req.params.id);

          let orderCategory = db.Product.findAll();

          promise.all([orderProduct, orderCategory])
               .then(function([product, category]){
                    res.render("productEditForm",{product:product, category:category});
          })
	},
     store: async (req, res) => {
          const resultValidation = validationResult(req);
          if(resultValidation.errors.length > 0){
               console.log(1)
               return res.render('productCreateForm',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
               })
          } else {
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
	update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

          const resultValidation = validationResult(req);
          console.log(resultValidation)

          if(resultValidation.errors.length > 0){
               let id = req.params.id;
               console.log(id)
               return res.render('productEditForm',{
                    errors: resultValidation.mapped(),
                    //oldData: req.body,
                    //productoBuscado: productToEdit
                    productoBuscado: req.body
               })
          } else {
               productToEdit = {
                    id: productToEdit.id,
                    ...req.body,// los nuevos datos que recibe del form
                    image: productToEdit.image
               }
               let newProducts = products.map(product =>{
                    if(product.id == productToEdit.id) {
                         return product = {...productToEdit}
                    }
                    return product;
               })
               fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, ' '));
               res.redirect('/')
          }
          
	},
     delete: (req, res) => {
          /* let id = req.params.id;
          let finalProducts = productsCart.filter(product => product.id != id);
          fs.writeFileSync(productsCartFilePath, JSON.stringify(finalProducts, null, ' '));
          res.render('productCart',{carrito: finalProducts}); */
          db.Product.destroy({
               where: {
                    id: req.params.id
               }
          })

          res.redirect("/product");
     },
     deleteAll: (req, res) => {
          let finalProducts = [];
          fs.writeFileSync(productsCartFilePath, JSON.stringify(finalProducts, null, ' '));
          res.render('productCart',{carrito: finalProducts});
     },
     add: (req, res) => {
          
     }
}
module.exports = productController;