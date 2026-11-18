/**
 * AI Resume Optimization Agent - Controller Handler for Day 9
 * Capability: Intelligent Project & Internship Recommendation Ranker
 */
const { IntelligentProjectInternshipRecom } = require('../features/intelligent_project_internship_recom');

class IntelligentProjectInternshipRecomController {
  constructor(config = {}) {
    this.feature = new IntelligentProjectInternshipRecom(config);
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

module.exports = { IntelligentProjectInternshipRecomController };
