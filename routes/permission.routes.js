const express = require('express');
const router = express.Router();
const PermissionController = require('../controllers/permission.controller');

router.post('/', PermissionController.create);
router.get('/', PermissionController.getAll);
router.get('/:id', PermissionController.getById);
router.put('/:id', PermissionController.update);
router.delete('/:id', PermissionController.delete);

module.exports = router;
