/**
 * AI Resume Optimization Agent - Controller Handler for Day 17
 * Capability: Project & Experience Bullet-Point Rephraser
 */
const { ProjectExperienceBulletPointReph } = require('../features/project_experience_bullet_point_reph');

class ProjectExperienceBulletPointRephController {
  constructor(config = {}) {
    this.feature = new ProjectExperienceBulletPointReph(config);
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

module.exports = { ProjectExperienceBulletPointRephController };
