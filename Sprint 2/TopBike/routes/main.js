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
const validations = [
    body('user_name').notEmpty().withMessage('Nombre incompleto'),
    body('email')
        .notEmpty().withMessage('Email incorrecto').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
    body('user_password').notEmpty().withMessage('Contraseña no valida'),
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
//Formulario de registro
router.get('/', mainController.index);
//Procesar el registro
router.post('/', upload.single('avatar'),validations, mainController.register);


 module.exports = router;