const express = require('express');
const router = express.Router();
const RolePermissionController = require('../controllers/rolePermission.controller');

router.post('/', RolePermissionController.assign);
router.get('/:role_id', RolePermissionController.getByRole);
router.delete('/', RolePermissionController.remove);

module.exports = router;
