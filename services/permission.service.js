const db = require('../config/db');
const log = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const PermissionService = {
  async createPermission(data) {
    try {
      const id = uuidv4();
      await db('permissions').insert({
        id,
        name: data.name,
        description: data.description || null,
      });
      log(`Permission created with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to create permission: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getAllPermissions() {
    try {
      return await db('permissions').select('*');
    } catch (err) {
      log(`Failed to fetch permissions: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getPermissionById(id) {
    try {
      return await db('permissions').where({ id }).first();
    } catch (err) {
      log(`Failed to fetch permission by ID: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async updatePermission(id, data) {
    try {
      await db('permissions')
        .where({ id })
        .update({
          name: data.name,
          description: data.description || null,
        });
      log(`Permission updated with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to update permission: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async deletePermission(id) {
    try {
      await db('permissions').where({ id }).del();
      log(`Permission deleted with ID: ${id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to delete permission: ${err.message}`, 'ERROR');
      throw err;
    }
  },
};

module.exports = PermissionService;
