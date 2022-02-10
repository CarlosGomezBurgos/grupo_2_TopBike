const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const {validationResult, body} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
     register:(req,res) => {
          res.render('register')
     },
     processRegister: (req,res) => {
        //res.render('index');
         const resultValidation = validationResult(req);
         if (resultValidation.errors.length > 0){
              return res.render('register',{
                   errors: resultValidation.mapped(),
                   oldData: req.body,
              });
         } else {
              let nuevoUsuario = {//manteniendo la estructura de cada objeto del json que se ocupa de bd
                   id: users[users.length -1].id +1,
                   user_name: req.body.user_name,
                   email: req.body.email,
                   user_password: bcryptjs.hashSync(req.body.user_password, 10),
                   avatar: req.file.filename
              }
              users.push(nuevoUsuario);
              console.log(nuevoUsuario);
              fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
              res.render('login');
         }
     },
     login: (req,res) => {
          res.render('login')
     },
     processLogin: (req,res) => {
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0){
               return res.render('login',{
                    errors: resultValidation.mapped(),
                    oldData: req.body,
               });
          } else {
               for(let i = 0; i < users.length; i ++){
                    if(users[i].user_name == req.body.user_name && bcryptjs.compareSync(req.body.user_password, users[i].user_password)){
                         res.send('index')
                    } else {
                         res.render('login')
                    }
               }
          }
     }
}

module.exports = usersController;