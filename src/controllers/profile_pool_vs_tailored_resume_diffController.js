/**
 * AI Resume Optimization Agent - Controller Handler for Day 16
 * Capability: Profile Pool vs. Tailored Resume Diff & Delta Inspector
 */
const { ProfilePoolVsTailoredResumeDiff } = require('../features/profile_pool_vs_tailored_resume_diff');

class ProfilePoolVsTailoredResumeDiffController {
  constructor(config = {}) {
    this.feature = new ProfilePoolVsTailoredResumeDiff(config);
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

module.exports = { ProfilePoolVsTailoredResumeDiffController };
