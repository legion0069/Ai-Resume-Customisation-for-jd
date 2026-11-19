/**
 * AI Resume Optimization Agent - Controller Handler for Day 10
 * Capability: ATS Keyword Gap & Missing Skill Detection Engine
 */
const { AtsKeywordGapMissingSkillDetect } = require('../features/ats_keyword_gap_missing_skill_detect');

class AtsKeywordGapMissingSkillDetectController {
  constructor(config = {}) {
    this.feature = new AtsKeywordGapMissingSkillDetect(config);
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

module.exports = { AtsKeywordGapMissingSkillDetectController };
