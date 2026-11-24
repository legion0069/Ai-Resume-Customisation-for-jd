/**
 * AI Resume Optimization Agent - Controller Handler for Day 15
 * Capability: ATS Compatibility & Parser Compliance Pre-Flight Checker
 */
const { AtsCompatibilityParserCompliance_ } = require('../features/ats_compatibility_parser_compliance_');

class AtsCompatibilityParserCompliance_Controller {
  constructor(config = {}) {
    this.feature = new AtsCompatibilityParserCompliance_(config);
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

module.exports = { AtsCompatibilityParserCompliance_Controller };
