/**
 * AI Resume Optimization Agent - Controller Handler for Day 8
 * Capability: Semantic Relevance & Component Compatibility Scoring Engine
 */
const { SemanticRelevanceComponentCompati } = require('../features/semantic_relevance_component_compati');

class SemanticRelevanceComponentCompatiController {
  constructor(config = {}) {
    this.feature = new SemanticRelevanceComponentCompati(config);
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

module.exports = { SemanticRelevanceComponentCompatiController };
