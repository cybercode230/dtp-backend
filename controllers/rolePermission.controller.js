const RolePermissionService = require('../services/rolePermission.service');

/**
 * @swagger
 * tags:
 *   name: RolePermissions
 *   description: Role-Permission mapping
 */

const RolePermissionController = {
  /**
   * @swagger
   * /role-permissions:
   *   post:
   *     summary: Assign a permission to a role
   *     tags: [RolePermissions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               role_id:
   *                 type: integer
   *               permission_id:
   *                 type: integer
   *             required:
   *               - role_id
   *               - permission_id
   *     responses:
   *       201:
   *         description: Permission assigned
   *       500:
   *         description: Server error
   */
  async assign(req, res) {
    try {
      const { role_id, permission_id } = req.body;
      const result = await RolePermissionService.assignPermission(role_id, permission_id);
      res.status(201).json({ success: true, message: 'Permission assigned', data: result });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /role-permissions/role/{role_id}:
   *   get:
   *     summary: Get all permissions for a role
   *     tags: [RolePermissions]
   *     parameters:
   *       - in: path
   *         name: role_id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: List of permissions
   *       500:
   *         description: Server error
   */
  async getByRole(req, res) {
    try {
      const permissions = await RolePermissionService.getPermissionsByRole(req.params.role_id);
      res.status(200).json({ success: true, data: permissions });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /role-permissions:
   *   delete:
   *     summary: Remove a permission from a role
   *     tags: [RolePermissions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               role_id:
   *                 type: integer
   *               permission_id:
   *                 type: integer
   *             required:
   *               - role_id
   *               - permission_id
   *     responses:
   *       200:
   *         description: Permission removed
   *       500:
   *         description: Server error
   */
  async remove(req, res) {
    try {
      const { role_id, permission_id } = req.body;
      await RolePermissionService.removePermission(role_id, permission_id);
      res.status(200).json({ success: true, message: 'Permission removed' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = RolePermissionController;
