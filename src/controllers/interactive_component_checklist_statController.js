/**
 * AI Resume Optimization Agent - Controller Handler for Day 11
 * Capability: Interactive Component Checklist & State Management Engine
 */
const { InteractiveComponentChecklistStat } = require('../features/interactive_component_checklist_stat');

class InteractiveComponentChecklistStatController {
  constructor(config = {}) {
    this.feature = new InteractiveComponentChecklistStat(config);
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

module.exports = { InteractiveComponentChecklistStatController };
