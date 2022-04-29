const express = require('express');
const router = express.Router();

const productController = require('../../controllers/api/product');

router.get('/', productController.getAll);


module.exports = router;