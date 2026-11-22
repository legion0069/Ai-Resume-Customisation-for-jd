/**
 * AI Resume Optimization Agent - Controller Handler for Day 13
 * Capability: Dynamic Section Priority & Layout Configurator
 */
const { DynamicSectionPriorityLayoutConf } = require('../features/dynamic_section_priority_layout_conf');

class DynamicSectionPriorityLayoutConfController {
  constructor(config = {}) {
    this.feature = new DynamicSectionPriorityLayoutConf(config);
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

module.exports = { DynamicSectionPriorityLayoutConfController };
