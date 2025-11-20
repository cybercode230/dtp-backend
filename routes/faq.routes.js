const express = require('express');
const router = express.Router();
const FaqController = require('../controllers/faq.controller');

router.post('/', FaqController.create);
router.get('/', FaqController.getAll);
router.get('/:id', FaqController.getById);
router.put('/:id', FaqController.update);
router.delete('/:id', FaqController.delete);
router.get('/category/:category', FaqController.getByCategory);
router.get('/search', FaqController.search);

module.exports = router;
