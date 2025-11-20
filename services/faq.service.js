const db = require('../config/db');
const log = require('../utils/logger');
const { v4: uuidv4 } = require('uuid');

const FaqService = {
  async createFaq(data) {
    try {
      const id = uuidv4();
      const defaultUserId = uuidv4(); // You may replace with actual Guest user UUID
      await db('faq').insert({
        id,
        question: data.question,
        answer: data.answer || '',
        category: data.category || 'General',
        created_by: data.created_by || defaultUserId,
        updated_by: data.updated_by || data.created_by || defaultUserId,
      });
      log(`FAQ created with ID: ${id}`, 'INFO');
      return { id, ...data };
    } catch (err) {
      log(`Failed to create FAQ: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  async getAllFaqs() {
    return db('faq').select('*').orderBy('created_at', 'desc');
  },

  async getFaqById(id) {
    return db('faq').where({ id }).first();
  },

  async updateFaq(id, data) {
    const updatedData = {
      question: data.question,
      answer: data.answer,
      category: data.category,
      updated_by: data.updated_by || uuidv4(),
    };
    await db('faq').where({ id }).update(updatedData);
    return { id, ...updatedData };
  },

  async deleteFaq(id) {
    await db('faq').where({ id }).del();
    return true;
  },

  async getFaqsByCategory(category) {
    return db('faq').where({ category }).orderBy('created_at', 'desc');
  },

  async searchFaqs(keyword) {
    return db('faq')
      .where('question', 'like', `%${keyword}%`)
      .orWhere('answer', 'like', `%${keyword}%`)
      .orderBy('created_at', 'desc');
  },
};

module.exports = FaqService;
