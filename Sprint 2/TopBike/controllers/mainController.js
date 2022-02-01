const fs = require('fs');
const path = require('path');
const {validationResult, body} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    index: (req,res) => {
         res.render('index',{productos: products});
    },
    register: (req,res) => {
         //res.render('index');
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0){
               return res.render('./partials/sidebar',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    productos: products
               });
          }
    },
    login: (req,res) => {
         res.render('index');
    },
}

module.exports = mainController;