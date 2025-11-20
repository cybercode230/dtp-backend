const db = require('../config/db');
const log = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const RolePermissionService = {
  async assignPermission(role_id, permission_id) {
    try {
      const id = uuidv4();
      await db('role_permissions').insert({ id, role_id, permission_id });
      log(`Permission ${permission_id} assigned to role ${role_id}`, 'INFO');
      return { id, role_id, permission_id };
    } catch (err) {
      log(`Failed to assign permission: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getPermissionsByRole(role_id) {
    try {
      return await db('role_permissions')
        .where({ role_id })
        .join('permissions', 'role_permissions.permission_id', 'permissions.id')
        .select('permissions.id', 'permissions.name', 'permissions.description');
    } catch (err) {
      log(`Failed to get permissions by role: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async removePermission(role_id, permission_id) {
    try {
      await db('role_permissions').where({ role_id, permission_id }).del();
      log(`Permission ${permission_id} removed from role ${role_id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to remove permission: ${err.message}`, 'ERROR');
      throw err;
    }
  },
};

module.exports = RolePermissionService;
