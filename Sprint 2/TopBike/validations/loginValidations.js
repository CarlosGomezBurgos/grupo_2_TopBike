const {body} = require('express-validator');

const loginValidations = [
    body('email')
        .notEmpty().withMessage('Debe ingresar el correo electrónico').bail()
        .isEmail().withMessage('Debes escribir un formato de correo valido'),
        //Deberá existir en base.
    body('user_password')
        .notEmpty().withMessage('Debe ingresar la contraseña')
        .isLength({min: 8}).withMessage('La contraseña debe tener minimo 8 caracteres'),
        // Deberá coincidir con la existente en base.
 ]

 module.exports = loginValidations;