const UserService = require('../services/user.service');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management
 */

const UserController = {
  /**
   * @swagger
   * /api/v1/users/:
   *   post:
   *     summary: Create a new user
   *     tags: [Users]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *               password:
   *                 type: string
   *               role_id:
 *                   type: string
 *                   description: UUID of the role to assign
   *             required:
   *               - username
   *               - email
   *               - password
 *     responses:
 *       201:
 *         description: User created
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
   */
  async create(req, res) {
    try {
      const { username, email, password, role_id } = req.body;

      // Basic validation
      if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'username, email, and password are required' });
      }

      const user = await UserService.createUser({
        full_name: username,
        email,
        password,
        role_id, // optional, will be passed to service layer
      });

      res.status(201).json({ success: true, message: 'User created', data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/users/:
   *   get:
   *     summary: Get all users
   *     tags: [Users]
   *     responses:
   *       200:
   *         description: List of users
   *       500:
   *         description: Server error
   */
  async getAll(req, res) {
    try {
      const users = await UserService.getAllUsers();
      res.status(200).json({ success: true, data: users });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   get:
   *     summary: Get user by ID
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User data
   *       404:
   *         description: User not found
   *       500:
   *         description: Server error
   */
  async getById(req, res) {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) return res.status(404).json({ success: false, message: 'User not found' });
      res.status(200).json({ success: true, data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   put:
   *     summary: Update a user
   *     tags: [Users]
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
   *               username:
   *                 type: string
   *               email:
   *                 type: string
   *     responses:
   *       200:
   *         description: User updated
   *       500:
   *         description: Server error
   */
  async update(req, res) {
    try {
      const user = await UserService.updateUser(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'User updated', data: user });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/users/{id}:
   *   delete:
   *     summary: Delete a user
   *     tags: [Users]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: User deleted
   *       500:
   *         description: Server error
   */
  async delete(req, res) {
    try {
      await UserService.deleteUser(req.params.id);
      res.status(200).json({ success: true, message: 'User deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = UserController;
