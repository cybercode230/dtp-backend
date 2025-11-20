const db = require('../config/db');
const bcrypt = require('bcryptjs');
const log = require('../utils/logger');

const UserService = {
  /**
   * Create a new user
   * - Requires full_name, email, password
   * - If role_id missing, defaults to Guest role (id = 1)
   */
  async createUser(data) {
    try {
      const defaultRoleId = 1; // guest role id
      const full_name = data.full_name || 'Guest User';
      const email = data.email || `guest${Date.now()}@dtp.com`; // avoid duplicate email
      const password = data.password || 'guest123';
      const role_id = data.role_id || defaultRoleId;

      const password_hash = await bcrypt.hash(password, 10);

      const [id] = await db('users').insert({
        full_name,
        email,
        password_hash,
        role_id
      });

      log(`User created with ID: ${id}`, 'INFO');
      return { id, full_name, email, role_id };
    } catch (err) {
      log(`Failed to create user: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getAllUsers() {
    try {
      return await db('users').select('id', 'full_name', 'email', 'role_id', 'created_at');
    } catch (err) {
      log(`Failed to fetch users: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getUserById(id) {
    try {
      return await db('users')
        .select('id', 'full_name', 'email', 'role_id', 'created_at')
        .where({ id })
        .first();
    } catch (err) {
      log(`Failed to fetch user: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async updateUser(id, data) {
    try {
      const updateData = { ...data };
      if (data.password) {
        updateData.password_hash = await bcrypt.hash(data.password, 10);
        delete updateData.password;
      }
      await db('users').where({ id }).update(updateData);
      log(`User updated with ID: ${id}`, 'INFO');
      return { id, ...updateData };
    } catch (err) {
      log(`Failed to update user: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async deleteUser(id) {
    try {
      await db('users').where({ id }).del();
      log(`User deleted with ID: ${id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to delete user: ${err.message}`, 'ERROR');
      throw err;
    }
  }
};

module.exports = UserService;
