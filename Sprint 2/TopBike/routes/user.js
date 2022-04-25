const express = require('express');
const path = require('path');
const router = express.Router();
const usersController  = require('../controllers/userController')
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')
const guestMiddleware = require('../middlewares/guestMiddleware')

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

/* Validaciones */
const validationsRegister = [
    body('user_name').notEmpty().withMessage('Debe ingresar el "Nombre Completo"')
    .isLength({min: 2}).withMessage('El "Nombre Completo" debe tener un minimo 2 caracteres'),
    body('email')
        .notEmpty().withMessage('El "Correo Electronico" es inválido').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
    body('user_password')
        .notEmpty().withMessage('Debe ingresar la "Contraseña"')
        .isLength({min: 8}).withMessage('La "Contraseña" debe tener mínimo 8 caracteres'),
    // ver validacion de password (mayuscula, minuscula, numero y caracter especial)
    body('avatar')
        .custom((value, {req})=>{
            let file = req.file;
            let acceptedExtensions = ['.jpg', '.png', '.gif'];
            if (!file) {
                throw new Error ('Tienes que subir una imagen');
            } else {
                let fileExtension = path.extname(file.originalname);
                if (! acceptedExtensions.includes(fileExtension)) {
                    throw new Error (`Las extenciones de archivos permitidas son: ${acceptedExtensions.join(', ')}`);
                }
            }
            return true;
        })
] 
 const validationsLogin = [
    body('email')
        .notEmpty().withMessage('Debe ingresar el correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
        //ver mail , deberá existir en la bd.
    body('user_password')
        .notEmpty().withMessage('Debe ingresar la contraseña')
        .isLength({min: 8}).withMessage('La contraseña debe tener minimo 8 caracteres'),
 ]

router.get('/register', guestMiddleware, usersController.register);
router.post('/register', upload.single('avatar'),validationsRegister, usersController.processRegister);

router.get('/login',guestMiddleware, usersController.login);
router.post('/login', validationsLogin, usersController.processLogin);

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