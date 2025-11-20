const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('Role API Endpoints', () => {
  let roleId;

  afterAll(async () => {
    // Cleanup DB after tests
    await db('roles').where({ id: roleId }).del();
    db.destroy();
  });

  it('should create a new role', async () => {
    const res = await request(app)
      .post('/api/v1/roles')
      .send({ name: 'Test Role', description: 'Role for testing' });

    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    roleId = res.body.data.id;
  });

  it('should get all roles', async () => {
    const res = await request(app).get('/api/v1/roles');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get role by ID', async () => {
    const res = await request(app).get(`/api/v1/roles/${roleId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.id).toBe(roleId);
  });

  it('should update role', async () => {
    const res = await request(app)
      .put(`/api/v1/roles/${roleId}`)
      .send({ name: 'Updated Role' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.data.name).toBe('Updated Role');
  });

  it('should delete role', async () => {
    const res = await request(app).delete(`/api/v1/roles/${roleId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
  });
});
