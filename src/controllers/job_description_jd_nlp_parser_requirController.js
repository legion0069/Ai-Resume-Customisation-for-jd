/**
 * AI Resume Optimization Agent - Controller Handler for Day 6
 * Capability: Job Description (JD) NLP Parser & Requirement Extractor
 */
const { JobDescriptionJdNlpParserRequir } = require('../features/job_description_jd_nlp_parser_requir');

class JobDescriptionJdNlpParserRequirController {
  constructor(config = {}) {
    this.feature = new JobDescriptionJdNlpParserRequir(config);
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

module.exports = { JobDescriptionJdNlpParserRequirController };
