const FaqService = require('../services/faq.service');

/**
 * @swagger
 * tags:
 *   name: FAQs
 *   description: Frequently Asked Questions
 */

const FaqController = {
  /**
   * @swagger
   * /api/v1/faqs:
   *   post:
   *     summary: Create a new FAQ
   *     tags: [FAQs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             required:
   *               - question
   *               - answer
   *               - created_by
   *             properties:
   *               question:
   *                 type: string
   *               answer:
   *                 type: string
   *               category:
   *                 type: string
   *               created_by:
   *                 type: integer
   */
  async create(req, res) {
    try {
      const { question, answer, category, created_by } = req.body;

      // Basic validation
      if (!question || !answer || !created_by) {
        return res.status(400).json({ success: false, message: 'question, answer, and created_by are required' });
      }

      const faq = await FaqService.createFaq({
        question,
        answer,
        category,
        created_by, // pass user UUID directly
        updated_by: created_by, // optional: initially same as created_by
      });

      res.status(201).json({ success: true, message: 'FAQ created', data: faq });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/faqs:
   *   get:
   *     summary: Get all FAQs
   *     tags: [FAQs]
   */
  async getAll(req, res) {
    try {
      const faqs = await FaqService.getAllFaqs();
      res.status(200).json({ success: true, data: faqs });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  /**
   * @swagger
   * /api/v1/faqs/{id}:
   *   get:
   *     summary: Get FAQ by ID
   *     tags: [FAQs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   */
  async getById(req, res) {
    try {
      const faq = await FaqService.getFaqById(req.params.id);
      if (!faq) return res.status(404).json({ success: false, message: 'FAQ not found' });
      res.status(200).json({ success: true, data: faq });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async update(req, res) {
    try {
      const faq = await FaqService.updateFaq(req.params.id, req.body);
      res.status(200).json({ success: true, message: 'FAQ updated', data: faq });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async delete(req, res) {
    try {
      await FaqService.deleteFaq(req.params.id);
      res.status(200).json({ success: true, message: 'FAQ deleted' });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getByCategory(req, res) {
    try {
      const faqs = await FaqService.getFaqsByCategory(req.params.category);
      res.status(200).json({ success: true, data: faqs });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async search(req, res) {
    try {
      const faqs = await FaqService.searchFaqs(req.query.keyword);
      res.status(200).json({ success: true, data: faqs });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
};

module.exports = FaqController;
