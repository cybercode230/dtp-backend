const PermissionService = require('../services/permission.service');

/**
 * @swagger
 * tags:
 *   name: Permissions
 *   description: Permission management
 */

const PermissionController = {
  /**
   * @swagger
   * /permissions:
   *   post:
   *     summary: Create a new permission
   *     tags: [Permissions]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *             required:
   *               - name
   *     responses:
   *       201:
   *         description: Permission created
   *       500:
   *         description: Server error
   */
  async create(req, res) {
    try {
      const permission = await PermissionService.createPermission(req.body);
      res.status(201).json({ success: true, message: 'Permission created', data: permission });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /permissions:
   *   get:
   *     summary: Get all permissions
   *     tags: [Permissions]
   *     responses:
   *       200:
   *         description: List of permissions
   *       500:
   *         description: Server error
   */
  async getAll(req, res) {
    try {
      const permissions = await PermissionService.getAllPermissions();
      res.status(200).json({ success: true, data: permissions });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /permissions/{id}:
   *   get:
   *     summary: Get permission by ID
   *     tags: [Permissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Permission data
   *       404:
   *         description: Permission not found
   *       500:
   *         description: Server error
   */
  async getById(req, res) {
    try {
      const permission = await PermissionService.getPermissionById(req.params.id);
      if (!permission) return res.status(404).json({ success: false, message: 'Permission not found' });
      res.status(200).json({ success: true, data: permission });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /permissions/{id}:
   *   put:
   *     summary: Update a permission
   *     tags: [Permissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       200:
   *         description: Permission updated
   *       500:
   *         description: Server error
   */
  async update(req, res) {
    try {
      const permission = await PermissionService.updatePermission(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Permission updated', data: permission });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /permissions/{id}:
   *   delete:
   *     summary: Delete a permission
   *     tags: [Permissions]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Permission deleted
   *       500:
   *         description: Server error
   */
  async delete(req, res) {
    try {
      await PermissionService.deletePermission(req.params.id);
      res.status(200).json({ success: true, message: 'Permission deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = PermissionController;
