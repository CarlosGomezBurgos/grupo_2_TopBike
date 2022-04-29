const express = require('express');
const path = require('path');
const router = express.Router();
const usersController  = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

const loginValidations = require('../validations/loginValidations')
const registerValidations = require('../validations/registerValidations')

const multer = require('multer');
/* Multer config */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'./public/img/avatars')
    },
    filename: (req, file, cb) => {
        cb(null,`${Date.now()}--${file.originalname}`)
}})

const upload = multer({storage: fileStorageEngine})

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'),registerValidations, usersController.processRegister);

router.get('/login',guestMiddleware, usersController.login);
router.post('/login', loginValidations, usersController.processLogin);

router.get('/profile',authMiddleware, usersController.profile);

router.get('/logout', usersController.logout);

router.get('/pruebaSession', function(req,res){
    if(req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas ++;
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)
})

router.get('/check', function(req,res){
    if (req.session.usuarioLogueado == undefined){
        res.send('No estas logueado')
    } else {
        res.send('El usuario logueado es: ' + req.session.usuarioLogueado.email)
    }
})
 module.exports = router;