const RoleService = require('../services/role.service')

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Role management
 */

const RoleController = {
  /**
   * @swagger
   * /api/v1/roles:
   *   post:
   *     summary: Create a new role
   *     tags: [Roles]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - name
   *             properties:
   *               name:
   *                 type: string
   *               description:
   *                 type: string
   *     responses:
   *       201:
   *         description: Role created successfully
   *       500:
   *         description: Server error
   */
  async create(req, res) {
    try {
      const data = req.body;
      const role = await RoleService.createRole(data);
      res.status(201).json({ success: true, message: 'Role created', data: role });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/roles:
   *   get:
   *     summary: Get all roles
   *     tags: [Roles]
   *     responses:
   *       200:
   *         description: List of roles
   *       500:
   *         description: Server error
   */
  async getAll(req, res) {
    try {
      const roles = await RoleService.getAllRoles();
      res.status(200).json({ success: true, data: roles });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/roles/{id}:
   *   get:
   *     summary: Get role by ID
   *     tags: [Roles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Role ID
   *     responses:
   *       200:
   *         description: Role data
   *       404:
   *         description: Role not found
   *       500:
   *         description: Server error
   */
  async getById(req, res) {
    try {
      const role = await RoleService.getRoleById(req.params.id);
      if (!role) return res.status(404).json({ success: false, message: 'Role not found' });
      res.status(200).json({ success: true, data: role });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/roles/{id}:
   *   put:
   *     summary: Update a role
   *     tags: [Roles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Role ID
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
   *         description: Role updated
   *       500:
   *         description: Server error
   */
  async update(req, res) {
    try {
      const role = await RoleService.updateRole(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'Role updated', data: role });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/roles/{id}:
   *   delete:
   *     summary: Delete a role
   *     tags: [Roles]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Role ID
   *     responses:
   *       200:
   *         description: Role deleted
   *       500:
   *         description: Server error
   */
  async delete(req, res) {
    try {
      await RoleService.deleteRole(req.params.id);
      res.status(200).json({ success: true, message: 'Role deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = RoleController;
