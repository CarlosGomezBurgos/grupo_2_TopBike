const fs = require('fs');
const path = require('path');
const { where } = require('sequelize/types');

//CRUD
const db = require("../database/models");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const productsCartFilePath = path.join(__dirname, '../data/productsCartDataBase.json');
const productsCart = JSON.parse(fs.readFileSync(productsCartFilePath, 'utf-8'));

const productController = {
     index: (req,res) => {
		/* let products_formato = products.map(product =>{
               product.actual_price = product.price * (1 - (product.discount/100));
               product.actual_price = product.actual_price.toFixed(2);
			product.price = parseFloat(product.price).toFixed(2);
			return product;
		})
          res.render('product',{productos: products}); */
          db.Product.findAll()
          .then(function(products){
               return res.render("product",{products:products});
          })


     },
     detail: (req,res) => {
          /* let productoBuscado = products.find(unProducto => unProducto.id == req.params.id);
          console.log(productoBuscado)
          res.render('productDetail',{productoBuscado:productoBuscado}); */
          db.Product.findByPk(req.params.id,{
               include:[{association: "category"},{association: "cart"}]
          })
               .then(function(product){
                    res.render('productDetail',{products:products});
               })

     },



     cart: (req,res) => {
         res.render('productCart',{carrito: productsCart});

     },
     create: (req,res)=>{
         /* res.render('productCreateForm') */
         db.Product.findAll()
               .then(function(products){
                    return res.render("productCreateForm",{products:products});
               })         
     },


     edit: (req, res) => {
		/* let productoBuscado = products.find(unProducto => unProducto.id == req.params.id);
          res.render('productEditForm',{
               productoBuscado: productoBuscado */
               let orderProduct = db.Product.findByPk(req.params.id);

               let orderCategory = db.Product.findAll();

               promise.all([orderProduct, orderCategory])
                    .then(function([product, category]){
                         res.render("productEditForm",{product:product, category:category});
          })
          //console.log(productoBuscado)
	},
     store: (req, res) => {
         /*  console.log(req.body);
          let nuevoProducto = {//manteniendo la estructura de cada objeto del json que se ocupa de bd
               id: products[products.length -1].id +1,
               ...req.body, // completa todos los elementos de un objeto.
               image: req.file.filename
          }
          products.push(nuevoProducto);
          console.log(nuevoProducto)
          fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));
          res.redirect('/product'); */

          db.Product.create({
               /* id:, */
               name: req.body.name,
               price: req.body.price,
               discount: req.body.discount ,
               /* id_category: , */
               description: req.body.description,
               image: req.body.image
          });

          res.redirect("/product");



     },
	update: (req, res) => {
		//console.log(req.body);
		//console.log(req.params.id);

		/* let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

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
		res.redirect('/'); */

          db.Product.update({
               /* id:, */
               name: req.body.name,
               price: req.body.price,
               discount: req.body.discount ,
               /* id_category: , */
               description: req.body.description,
               image: req.body.image
          },{
               where: {
                    id: req.params.id
               }
          });

          res.redirect("/product/" + req.params.id)

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