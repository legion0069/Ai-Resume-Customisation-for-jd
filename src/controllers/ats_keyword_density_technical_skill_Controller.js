/**
 * AI Resume Optimization Agent - Controller Handler for Day 7
 * Capability: ATS Keyword Density & Technical Skill Matcher
 */
const { AtsKeywordDensityTechnicalSkill_ } = require('../features/ats_keyword_density_technical_skill_');

class AtsKeywordDensityTechnicalSkill_Controller {
  constructor(config = {}) {
    this.feature = new AtsKeywordDensityTechnicalSkill_(config);
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

module.exports = { AtsKeywordDensityTechnicalSkill_Controller };
