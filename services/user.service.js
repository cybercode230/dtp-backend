const db = require('../config/db');
const bcrypt = require('bcryptjs');
const log = require('../utils/logger');

const UserService = {
  async createUser(data) {
    try {
      // Default role_id = guest (assuming id = 1 for guest)
      const role_id = data.role_id || 1;

      const hashedPassword = await bcrypt.hash(data.password, 10);
      const [id] = await db('users').insert({
        full_name: data.full_name,
        email: data.email,
        password_hash: hashedPassword,
        role_id
      });

      log(`User created with ID: ${id}`, 'INFO');
      return { id, full_name: data.full_name, email: data.email, role_id };
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
      return await db('users').select('id', 'full_name', 'email', 'role_id', 'created_at').where({ id }).first();
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
      return { id, ...data };
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
