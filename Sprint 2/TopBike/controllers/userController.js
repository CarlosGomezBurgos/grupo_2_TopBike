const fs = require('fs');
const path = require('path');
const bcryptjs = require('bcryptjs');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');

const db = require("../database/models");


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const usersController = {
     register: (req, res) => {
          res.render('register')
     },
     processRegister: async (req, res) => {
          //res.render('index');
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0) {
               return res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
               });
          } else {
               //     let nuevoUsuario = {//manteniendo la estructura de cada objeto del json que se ocupa de bd
               //           id: users[users.length -1].id +1,
               //           user_name: req.body.user_name,
               //           email: req.body.email,
               //           user_password: bcryptjs.hashSync(req.body.user_password, 10),
               //           avatar: req.file.filename
               //      }
               //      users.push(nuevoUsuario);
               //      console.log(nuevoUsuario);
               //      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));
               try {
                    // const salt = bcryptjs.genSaltSync(10);
                    // ToDo: Encriptar contraseña, no funcina cuando nos conectamos a la base de datos
                    // Intentamos encriptar las contraseñas y no funciono. Ver proyecto de guia.
                    const newUser = {
                         name: req.body.user_name,
                         email: req.body.email,
                         // password: bcryptjs.hashSync(req.body.user_password, salt),// 
                         password: req.body.user_password,
                         picture: req.file.filename
                    };
                    await db.User.create(newUser);
                    res.redirect('/user/login');
               } catch (error) {
                    return res.status(500).json(error);
                    //mostrar vista de error.
                    //sino error en la vista de create.
               }


          }
     },
     login: (req, res) => {
          res.render('login')
     },
     processLogin: async (req, res) => {
          // let userToLogin = User.findByField('email', req.body.email)

          const userToLogin = await db.User.findOne({
               where: {
                    email: req.body.email
               }
          })
          if (userToLogin) {
               // let isOkThePassword = await bcryptjs.compareSync(req.body.user_password, userToLogin.dataValues.password)
               const isOkThePassword = req.body.user_password === userToLogin.password;
               if (isOkThePassword) {
                    delete userToLogin.password;
                    req.session.userLogged = userToLogin;

                    if (req.body.recordame) {
                         res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 2 })
                    }

                    return res.redirect('/user/profile')
               }
               return res.render('login', {
                    errors: {
                         email: {
                              msg: 'Las credenciales con invalidas'
                         }
                    }
               })
          }
          return res.render('login', {
               errors: {
                    email: {
                         msg: 'No se encuenta este email en nuestra base de datos'
                    }
               }
          })
          // const resultValidation = validationResult(req);
          // if (resultValidation.errors.length > 0){
          //      return res.render('login',{
          //           errors: resultValidation.mapped(),
          //           oldData: req.body,
          //      });
          // } else {
          //      let userEmails = users.map(user => user.email);
          //      const reqUser = users[userEmails.lastIndexOf(req.body.email)];

          //      if(reqUser && bcryptjs.compareSync(req.body.user_password,reqUser.user_password)){
          //           console.log('encontrado')
          //           req.session.usuarioLogueado = reqUser;
          //           if(req.body.recordame != undefined){
          //               res.cookie('recordame', reqUser.email, {expire : new Date() + 9999});
          //           }
          //           res.redirect('/');
          //      } else {
          //           console.log('no encontrado')
          //           res.render('login')

          //      }
     },
     profile: (req, res) => {
          console.log(req.cookies.userEmail)
          res.render('profile', {
               user: req.session.userLogged
          })
     },
     logout: (req, res) => {
          res.clearCookie('userEmail');
          req.session.destroy();
          return res.redirect('/')
     }

}

module.exports = usersController;