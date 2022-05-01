const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require ('multer');
const {body} = require('express-validator');


const productController  = require('../controllers/productController')

/* Multer Config */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./public/img/products')
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
}})

const upload = multer({storage: fileStorageEngine})

//Validations
const productCreateValidations = [
    body('name')
        .notEmpty().withMessage('El "Nombre del producto" debe estar completo')
        .isLength({min: 5}).withMessage('El "Nombre del producto" debe tener minimo 5 caracteres'),
    body('price')
        .notEmpty().withMessage('El "Precio del producto" debe estar completo'),
        // verificar decimal positivo
        // Ver precio mayor a cero.
    body('discount')
        .notEmpty().withMessage('El "Descuento" debe estar completo'),
        // El descuento debe estar entre 1 y 100.
    body('category')
        .notEmpty().withMessage('La "Categoria" debe estar seleccionada'),
    body('description')
        .notEmpty().withMessage('La "Descripcion" debe estar completo')
        .isLength({min: 50}).withMessage('La descripción debe tener mínimo 50 caracteres'),
        // La descripcion esta vacia pero no sale el mensaje de error.
        //Ver la posicion del cursor. Muestra una cadena de espacios vacios al inicio y final
    body('image').custom((value, { req})=>{
        let file = req.file;
        let acceptedExtensions = ['.jpeg', '.jpg', '.png'];
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

router.get('/', productController.index);

router.get('/detail/:id', productController.detail);

router.get('/cart', productController.cart);

/* create form */
router.get('/create',productController.create);
router.post('/', upload.single('image'), productCreateValidations, productController.store);

/* edit form */
router.get('/edit/:id', productController.edit); 
router.patch('/edit/:id', productEditValidations, productController.update);

router.delete('/delete/:id', productController.delete); 

router.get('/delete/:id', productController.delete);

router.get('/deleteAll', productController.deleteAll);

router.get('/add', productController.add);

//creación

/* router.get('/crear', productController.crear) */



module.exports = router;