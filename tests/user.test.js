const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('User API Endpoints', () => {
  let userId;

  afterAll(async () => {
    await db('users').where({ id: userId }).del();
    db.destroy();
  });

  it('should create a new user with default guest role', async () => {
    const res = await request(app)
      .post('/api/v1/users')
      .send({ full_name: 'Test User', email: 'testuser@example.com', password: 'password123' });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.role_id).toBe(1); // guest role
    userId = res.body.data.id;
  });

  it('should get all users', async () => {
    const res = await request(app).get('/api/v1/users');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get user by ID', async () => {
    const res = await request(app).get(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(userId);
  });

  it('should update user', async () => {
    const res = await request(app)
      .put(`/api/v1/users/${userId}`)
      .send({ full_name: 'Updated User' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.full_name).toBe('Updated User');
  });

  it('should delete user', async () => {
    const res = await request(app).delete(`/api/v1/users/${userId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
