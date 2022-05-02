const express = require('express');
const router = express.Router();

const userController = require('../../controllers/api/user');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);


module.exports = router;