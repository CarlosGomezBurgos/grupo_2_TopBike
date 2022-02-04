const fs = require('fs');
const path = require('path');
const {validationResult, body} = require('express-validator');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const mainController = {
    index: (req,res) => {
         res.render('index',{productos: products});
    },
    register: (req,res) => {
         //res.render('index');
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0){
               return res.render('index',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    productos: products
               });
          } else {
               let nuevoUsuario = {//manteniendo la estructura de cada objeto del json que se ocupa de bd
                    id: users[users.length -1].id +1,
                    ...req.body, // completa todos los elementos de un objeto.
                    avatar: req.file.filename
               }
               users.push(nuevoUsuario);
               console.log(nuevoUsuario);
               fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
               res.redirect('/');
          }

    },
    login: (req,res) => {
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0){
               return res.render('index',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
                    productos: products
               });
          } else {
               res.redirect('/');
          }
     }
}

module.exports = mainController;