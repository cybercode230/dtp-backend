const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('Permission API Endpoints', () => {
  let permissionId;

  afterAll(async () => {
    await db('permissions').where({ id: permissionId }).del();
    db.destroy();
  });

  it('should create a permission', async () => {
    const res = await request(app)
      .post('/api/v1/permissions')
      .send({ name: 'Test Permission', description: 'Permission for testing' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    permissionId = res.body.data.id;
  });

  it('should get all permissions', async () => {
    const res = await request(app).get('/api/v1/permissions');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get permission by ID', async () => {
    const res = await request(app).get(`/api/v1/permissions/${permissionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(permissionId);
  });

  it('should update permission', async () => {
    const res = await request(app)
      .put(`/api/v1/permissions/${permissionId}`)
      .send({ name: 'Updated Permission' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.name).toBe('Updated Permission');
  });

  it('should delete permission', async () => {
    const res = await request(app).delete(`/api/v1/permissions/${permissionId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
