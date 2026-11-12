/**
 * AI Resume Optimization Agent - Controller Handler for Day 3
 * Capability: Bullet-Point Action Verb & STAR Impact Metric Normalizer
 */
const { BulletPointActionVerbStarImpact } = require('../features/bullet_point_action_verb_star_impact');

class BulletPointActionVerbStarImpactController {
  constructor(config = {}) {
    this.feature = new BulletPointActionVerbStarImpact(config);
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

module.exports = { BulletPointActionVerbStarImpactController };
