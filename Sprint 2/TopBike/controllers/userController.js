const bcryptjs = require('bcryptjs');
const { validationResult, body } = require('express-validator');
const User = require('../models/User');

const db = require('../database/models')


const usersController = {
     register: (req, res) => {
          res.render('register')
     },
     registerProcess: async (req, res) => {
          const resultValidation = validationResult(req);
          if (resultValidation.errors.length > 0) { //validacion de errores
               return res.render('register', {
                    errors: resultValidation.mapped(),
                    oldData: req.body,
               })

          } else {
               const userInDB = await db.User.findOne({ where: { email: req.body.email } }) // busca mail en bd

               if (userInDB) { // El mail se encuantra en bd
                    res.render('register', {
                         errors: {
                              email: {
                                   msg: 'Este correo electronico ya esta registrado'

                              }
                         },
                         oldData: req.body
                    })

               } else { // El mail no se encuentra en bd

                    try {
                         const newUser = {
                              name: req.body.user_name,
                              email: req.body.email,
                              // password: bcryptjs.hashSync(req.body.user_password, 10),// la comparacion da false cuando esta encriptada. Intentamos resolver con Andrey sin exito.
                              password: req.body.user_password,
                              picture: req.file.filename
                         };
                         
                         await db.User.create(newUser);
                         res.redirect('/user/login')
                         
                    } catch (error) {
                        return res.status(500).json(error) 
                    }
               }
          }

     },
     login: (req, res) => {
          res.render('login')
     },
     loginProcess: async (req, res) => {
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
     },
     profile: (req, res) => {
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

// const userController = {
//      register: (req, res) => {
//          res.render('users/register');
//      },
//      processRegister: (req, res) => {
//          const resultValidation = validationResult(req);

//          if (resultValidation.errors.length > 0) {
//              res.render('users/register', {
//                  errors: resultValidation.mapped(),
//                  oldData: req.body
//              });
//          } else {
//              db.User.findOne({ where: { email: req.body.email } })
//                  .then((userInDB) => {
//                      if (userInDB) {
//                          res.render('users/register', {
//                              errors: {
//                                  email: {
//                                      msg: 'Este correo electronico ya esta registrado'
//                                  }
//                              },
//                              oldData: req.body
//                          })
//                      } else if (req.body.imgDefault) {
//                          db.User.create({
//                              first_name: req.body.first_name,
//                              last_name: req.body.last_name,
//                              email: req.body.email,
//                              password: bcryptjs.hashSync(req.body.password, 10),
//                              adress: req.body.adress,
//                              avatar: "default.png",
//                              category_id: 1,
//                          })

//                      } else {
//                          db.User.create({
//                              first_name: req.body.first_name,
//                              last_name: req.body.last_name,
//                              email: req.body.email,
//                              password: bcryptjs.hashSync(req.body.password, 10),
//                              adress: req.body.adress,
//                              avatar: req.file.filename,
//                              category_id: 1,
//                          })

//                      }
//                      return res.redirect('/users/login')
//                  }).catch(err => { console.log(err) })
//          }
//      },

//      login: (req, res) => {

//          res.render('users/loginEmail')
//      },

//      loginProcess: (req, res) => {

//          db.User.findOne({ where: { email: req.body.email } })

//          .then((userToLogin) => {

//              const resultValidation = validationResult(req);

//              if (resultValidation.errors.length > 0) {
//                  res.render('users/loginEmail', {
//                      errors: resultValidation.mapped(),
//                      oldData: req.body
//                  });
//              } else if (!userToLogin) {

//                  return res.render('users/loginEmail', {
//                      errors: {
//                          email: {
//                              msg: 'El correo electronico no esta registrado'
//                          }
//                      },

//                  })
//              } else {
//                  res.render('users/loginPass', {
//                      oldData: req.body
//                  })
//              }
//          }).catch(err => { console.log(err) })
//      },

//      loginPass: (req, res) => {

//          if (req.body.email) {
//              db.User.findOne({ where: { email: req.body.email } })
//                  .then((userToLogin) => {

//                      let isOkThePassword = bcryptjs.compareSync(req.body.password, userToLogin.password);

//                      if (isOkThePassword) {
//                          delete userToLogin.password;

//                          req.session.userLogged = userToLogin;

//                          if (req.body.remember_user) {
//                              res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60 })
//                              return res.redirect('/users/profile')
//                          }
//                          return res.render('users/loginPass', {
//                              errors: {
//                                  email: {
//                                      msg: 'Debe recordar su usuario'
//                                  }
//                              },
//                              oldData: req.body
//                          })
//                      } else {
//                          return res.render('users/loginPass', {
//                              errors: {
//                                  email: {
//                                      msg: 'La contraseña es errónea'
//                                  }
//                              },
//                              oldData: req.body
//                          })
//                      };
//                  })
//                  .catch(err => { console.log(err) })
//          }
//      },

//      profile: (req, res) => {
//          db.Product.findAll()

//          .then((products) => {

//              return res.render('users/profile', {
//                  user: req.session.userLogged,

//              });
//          })
//      },

//      logout: (req, res) => {
//          res.clearCookie('userEmail');
//          req.session.destroy();
//          return res.redirect('/');
//      },

//      deleteUser: (req, res) => {
//          let id = req.params.id
//          req.session.destroy();
//          res.clearCookie('userEmail');
//          db.User.destroy({
//              where: {
//                  id: id
//              }
//          }).catch(err => { console.log(err) })
//          res.redirect("/")
//      },


module.exports = usersController;