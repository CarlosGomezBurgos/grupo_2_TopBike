const express = require('express');
const router = express.Router();
const multer = require ('multer');

const productController  = require('../controllers/productController')

/* Multer config */
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null,'./public/img/products')
    },
    filename: (req, file, cb)=>{
        cb(null,`${Date.now()}--${file.originalname}`)
}})

const upload = multer({storage: fileStorageEngine})


router.get('/', productController.index);

router.get('/detail/:id', productController.detail);

router.get('/cart', productController.cart);

/* create form */
router.get('/create',productController.create);
router.post('/', upload.single('image'),productController.store);

/* edit form */
router.get('/edit/:id', productController.edit); 
router.patch('/edit/:id', productController.update);

router.delete('/delete/:id', productController.delete); 

router.get('/delete/:id', productController.delete);

router.get('/deleteAll', productController.deleteAll);

router.get('/add', productController.add);



module.exports = router;