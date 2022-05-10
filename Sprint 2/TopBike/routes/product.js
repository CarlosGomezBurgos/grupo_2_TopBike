const express = require('express');
const path = require('path');
const router = express.Router();
const multer = require ('multer');
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')


const productController  = require('../controllers/productController')
const productCreateValidations = require('../validations/productCreateValidations')
const productEditValidations = require('../validations/productEditValidations')

/* Multer Config */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./public/img/products')
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
}})

const upload = multer({storage: fileStorageEngine})

router.get('/', productController.productList);

router.get('/detail/:id', productController.detail);

router.get('/cart/:id', authMiddleware, productController.cart);

/* create form */
router.get('/create', authMiddleware, productController.create);
router.post('/', authMiddleware, upload.single('image'), productCreateValidations, productController.store);

/* edit form */
router.get('/edit/:id', authMiddleware, productController.edit); 
router.put('/update/:id', authMiddleware,  upload.single('image'),productEditValidations, productController.update);

// router.get('/cart/:id', productController.cart)

router.delete('/deleteproduct/:id', authMiddleware, productController.deleteProduct); 
router.delete('/deletecart/:id', authMiddleware, productController.deleteCart); 

module.exports = router;