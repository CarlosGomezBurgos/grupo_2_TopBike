const {body} = require('express-validator');

const productEditValidations = [
    body('name')
        .notEmpty().withMessage('El "Nombre del producto" debe estar completo')
        .isLength({min: 5}).withMessage('El "Nombre del producto" debe tener minimo 8 caracteres'),
    // body('price')
    //      .notEmpty().withMessage('El "Precio del producto" debe estar completo'),
    //      Ver precio mayor a cero.
    // body('discount')
    //     .notEmpty().withMessage('El "Descuento" debe estar completo'),
    //     El descuento debe estar entre 1 y 100.
    // body('category')
    //     .notEmpty().withMessage('La "Categoria" debe estar seleccionada'),
    // body('description')
    //      .notEmpty().withMessage('La "Descripcion" debe estar completo')
    //      .isLength({min: 20}).withMessage('La descripción debe tener mínimo 20 caracteres'),

    // La imagen de un articulo no se deberia editar, sino sería un nuevo articulo.
    // body('image').custom((value, { req})=>{
    //     let file = req.file;
    //     let acceptedExtensions = ['.jpeg', '.jpg', '.png'];
    //     if (file) {
    //         let fileExtension = path.extname(file.originalname);
    //         if (!acceptedExtensions.includes(fileExtension)) {
    //             throw new Error (`Las extenciones de archivos permitidas son: ${acceptedExtensions.join(', ')}`);
    //         }
    //     }
    // return true;
    // })
]

module.exports = productEditValidations;