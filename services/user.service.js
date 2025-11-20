const db = require('../config/db');
const bcrypt = require('bcryptjs');
const log = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const UserService = {
  async createUser(data) {
    try {
      const id = uuidv4();
      const defaultRoleId = data.role_id || '00000000-0000-0000-0000-000000000001'; // Replace with Guest role UUID
      const passwordHash = await bcrypt.hash(data.password || 'guest123', 10);

      await db('users').insert({
        id,
        full_name: data.full_name || 'Guest User',
        email: data.email || `guest${Date.now()}@dtp.com`,
        password_hash: passwordHash,
        role_id: defaultRoleId,
      });

      log(`User created with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to create user: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getAllUsers() {
    return db('users').select('id', 'full_name', 'email', 'role_id', 'created_at');
  },

  async getUserById(id) {
    return db('users').select('id', 'full_name', 'email', 'role_id', 'created_at').where({ id }).first();
  },

  async updateUser(id, data) {
    const updateData = { ...data };
    if (data.password) {
      updateData.password_hash = await bcrypt.hash(data.password, 10);
      delete updateData.password;
    }
    await db('users').where({ id }).update(updateData);
    return { id, ...updateData };
  },

  async deleteUser(id) {
    await db('users').where({ id }).del();
    return true;
  },
};

module.exports = UserService;
