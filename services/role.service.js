const db = require('../config/db');
const log = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const RoleService = {
  /**
   * Create a new role
   * Automatically generates a UUID for the role ID
   */
  async createRole(data) {
    try {
      const id = uuidv4();
      await db('roles').insert({
        id,
        name: data.name,
        description: data.description || null,
      });
      log(`Role created with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to create role: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Get all roles
   */
  async getAllRoles() {
    try {
      const roles = await db('roles').select('*');
      return roles;
    } catch (err) {
      log(`Failed to fetch roles: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Get role by ID
   */
  async getRoleById(id) {
    try {
      const role = await db('roles').where({ id }).first();
      return role;
    } catch (err) {
      log(`Failed to fetch role by ID: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Update role by ID
   */
  async updateRole(id, data) {
    try {
      await db('roles').where({ id }).update({
        name: data.name,
        description: data.description || null,
      });
      log(`Role updated with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to update role: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Delete role by ID
   */
  async deleteRole(id) {
    try {
      await db('roles').where({ id }).del();
      log(`Role deleted with ID: ${id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to delete role: ${err.message}`, 'ERROR');
      throw err;
    }
  },
};

module.exports = RoleService;
