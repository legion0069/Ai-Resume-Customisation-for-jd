/**
 * AI Resume Optimization Agent - Controller Handler for Day 14
 * Capability: AI Executive Summary & Targeted Objective Generator
 */
const { AiExecutiveSummaryTargetedObject } = require('../features/ai_executive_summary_targeted_object');

class AiExecutiveSummaryTargetedObjectController {
  constructor(config = {}) {
    this.feature = new AiExecutiveSummaryTargetedObject(config);
  }

  async handleOptimization(req = {}) {
    try {
      const pool = req.candidatePool || req.pool || {};
      const jd = req.jobDescription || req.jd || {};
      const result = await this.feature.process(pool, jd);
      return { statusCode: 200, body: result };
    } catch (err) {
      return { statusCode: 500, error: err.message || 'Optimization controller error' };
    }
  }
}

module.exports = { AiExecutiveSummaryTargetedObjectController };
