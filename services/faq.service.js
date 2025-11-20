const db = require('../config/db');
const log = require('../utils/logger');

const FaqService = {
  /**
   * Create a new FAQ question
   * Automatically sets created_by and updated_by to Guest (id=1) if not provided
   */
  async createFaq(data) {
    try {
      const defaultUserId = 1; // Guest user
      const [id] = await db('faq').insert({
        question: data.question,
        answer: data.answer || '', // default empty answer if none provided
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

  /**
   * Get all FAQs
   */
  async getAllFaqs() {
    try {
      const faqs = await db('faq').select('*').orderBy('created_at', 'desc');
      return faqs;
    } catch (err) {
      log(`Failed to fetch FAQs: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Get FAQ by ID
   */
  async getFaqById(id) {
    try {
      const faq = await db('faq').where({ id }).first();
      return faq;
    } catch (err) {
      log(`Failed to fetch FAQ by ID: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Update FAQ by ID
   */
  async updateFaq(id, data) {
    try {
      const updatedData = {
        question: data.question,
        answer: data.answer,
        category: data.category,
        updated_by: data.updated_by || 1, // default to Guest if missing
      };

      await db('faq').where({ id }).update(updatedData);
      log(`FAQ updated with ID: ${id}`, 'INFO');
      return { id, ...updatedData };
    } catch (err) {
      log(`Failed to update FAQ: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Delete FAQ by ID
   */
  async deleteFaq(id) {
    try {
      await db('faq').where({ id }).del();
      log(`FAQ deleted with ID: ${id}`, 'INFO');
      return true;
    } catch (err) {
      log(`Failed to delete FAQ: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Get FAQs by category
   */
  async getFaqsByCategory(category) {
    try {
      const faqs = await db('faq').where({ category }).select('*').orderBy('created_at', 'desc');
      return faqs;
    } catch (err) {
      log(`Failed to fetch FAQs by category: ${err.message}`, 'ERROR');
      throw err;
    }
  },

  /**
   * Search FAQs by keyword
   */
  async searchFaqs(keyword) {
    try {
      const faqs = await db('faq')
        .where('question', 'like', `%${keyword}%`)
        .orWhere('answer', 'like', `%${keyword}%`)
        .orderBy('created_at', 'desc')
        .select('*');

      return faqs;
    } catch (err) {
      log(`Failed to search FAQs: ${err.message}`, 'ERROR');
      throw err;
    }
  },
};

module.exports = FaqService;
