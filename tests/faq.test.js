const request = require('supertest');
const app = require('../server');
const db = require('../config/db');

describe('FAQ API Endpoints', () => {
  let faqId;

  afterAll(async () => {
    await db('faq').where({ id: faqId }).del();
    db.destroy();
  });

  it('should create a FAQ', async () => {
    const res = await request(app)
      .post('/api/v1/faqs')
      .send({
        question: 'What is DTP?',
        answer: 'Desktop Publishing software.',
        category: 'Software',
        created_by: 1
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    faqId = res.body.data.id;
  });

  it('should get all FAQs', async () => {
    const res = await request(app).get('/api/v1/faqs');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should get FAQ by ID', async () => {
    const res = await request(app).get(`/api/v1/faqs/${faqId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.data.id).toBe(faqId);
  });

  it('should update FAQ', async () => {
    const res = await request(app)
      .put(`/api/v1/faqs/${faqId}`)
      .send({ answer: 'Updated answer.' });
    expect(res.statusCode).toBe(200);
    expect(res.body.data.answer).toBe('Updated answer.');
  });

  it('should search FAQ', async () => {
    const res = await request(app).get(`/api/v1/faqs/search?keyword=DTP`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body.data)).toBe(true);
  });

  it('should delete FAQ', async () => {
    const res = await request(app).delete(`/api/v1/faqs/${faqId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.success).toBe(true);
  });
});
