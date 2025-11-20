const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('Role-Permission API Endpoints', () => {
  let roleId, permissionId;

  beforeAll(async () => {
    const [rId] = await db('roles').insert({ name: 'Test Role' });
    const [pId] = await db('permissions').insert({ name: 'Test Permission' });
    roleId = rId;
    permissionId = pId;
  });

  afterAll(async () => {
    await db('role_permissions').where({ role_id: roleId }).del();
    await db('roles').where({ id: roleId }).del();
    await db('permissions').where({ id: permissionId }).del();
    db.destroy();
  });

  it('should assign permission to role', async () => {
    const res = await request(app)
      .post('/api/v1/role-permissions')
      .send({ role_id: roleId, permission_id: permissionId });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });

  it('should get permissions by role', async () => {
    const res = await request(app).get(`/api/v1/role-permissions/${roleId}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should remove permission from role', async () => {
    const res = await request(app)
      .delete('/api/v1/role-permissions')
      .send({ role_id: roleId, permission_id: permissionId });

    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
