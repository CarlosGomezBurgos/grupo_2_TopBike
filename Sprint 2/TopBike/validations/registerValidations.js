const {body} = require('express-validator');
const path = require('path')

const registerValidations = [
    body('user_name')
        .notEmpty().withMessage('Debe ingresar el "Nombre Completo"')
        .isLength({min: 2}).withMessage('El "Nombre Completo" debe tener un minimo 2 caracteres'),
    body('email')
        .notEmpty().withMessage('El "Correo Electronico" es inválido').bail()
        .isEmail().withMessage('Debes escribir un formato de correo válido'),
        // No puede repetirse con los e-mails ya registrados.
    body('user_password')
        .notEmpty().withMessage('Debe ingresar la "Contraseña"')
        .isLength({min: 8}).withMessage('La "Contraseña" debe tener mínimo 8 caracteres'),
        //(Opcional) → Deberá tener letras mayúsculas, minúsculas, un número y un carácter especial.
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

module.exports = registerValidations;