const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviesController');

router.get('/', controller.list);
router.get('/:id', controller.show);
router.get('/search', controller.search);
router.post('/', controller.store);
router.delete('/:id', controller.delete)

module.exports = router;