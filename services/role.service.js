const db = require('../config/db');
const log = require('../utils/logger');

const RoleService = {
  async createRole(data) {
    try {
      const [id] = await db('roles').insert(data);
      log(`Role created with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to create role: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getAllRoles() {
    try {
      const roles = await db('roles').select('*');
      return roles;
    } catch (err) {
      log(`Failed to fetch roles: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getRoleById(id) {
    try {
      const role = await db('roles').where({ id }).first();
      return role;
    } catch (err) {
      log(`Failed to fetch role by ID: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async updateRole(id, data) {
    try {
      await db('roles').where({ id }).update(data);
      log(`Role updated with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to update role: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async deleteRole(id) {
    try {
      await db('roles').where({ id }).del();
      log(`Role deleted with ID: ${id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to delete role: ${err.message}`, 'ERROR');
      throw err;
    }
  }
};

module.exports = RoleService;
