/**
 * AI Resume Optimization Agent - Controller Handler for Day 2
 * Capability: Candidate Component Repository Engine & CRUD Store
 */
const { CandidateComponentRepositoryEngin } = require('../features/candidate_component_repository_engin');

class CandidateComponentRepositoryEnginController {
  constructor(config = {}) {
    this.feature = new CandidateComponentRepositoryEngin(config);
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

module.exports = { CandidateComponentRepositoryEnginController };
