const express = require('express');
const path = require('path');
const router = express.Router();
const mainController  = require('../controllers/mainController')
const {body} = require('express-validator');

const multer = require('multer');
/* Multer config */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./public/img/avatars')
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
}})

const upload = multer({storage: fileStorageEngine})

/* Validaciones */
const validations = [
    body('user_name').notEmpty().withMessage('Nombre incompleto'),
    body('email')
        .notEmpty().withMessage('Email inválido').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('user_password').notEmpty().isLength({min: 8}).withMessage('Contraseña debe tener minimo 8 caracteres'),
    body('avatar').custom((value, { req})=>{
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
    body('user_name').notEmpty().withMessage('Nombre incompleto'),
    body('user_password').notEmpty().isLength({min: 8}).withMessage('Contraseña debe tener minimo 8 caracteres'),
 ]

//Formulario de registro
router.get('/', mainController.index);
//Procesar el registro
router.post('/', upload.single('avatar'),validations, mainController.register);

router.post('/',validationsLogin, mainController.login);

router.get('/pruebaSession', function(req,res){
    if(req.session.numeroVisitas == undefined){
        req.session.numeroVisitas = 0;
    }
    req.session.numeroVisitas ++;
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)
})

router.get('/mostrarNumeroSession', function(req,res){
    res.send('Session tiene el numero: ' + req.session.numeroVisitas)
})

 module.exports = router;