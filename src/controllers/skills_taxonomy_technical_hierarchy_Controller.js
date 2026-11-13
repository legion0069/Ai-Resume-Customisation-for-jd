/**
 * AI Resume Optimization Agent - Controller Handler for Day 4
 * Capability: Skills Taxonomy & Technical Hierarchy Engine
 */
const { SkillsTaxonomyTechnicalHierarchy_ } = require('../features/skills_taxonomy_technical_hierarchy_');

class SkillsTaxonomyTechnicalHierarchy_Controller {
  constructor(config = {}) {
    this.feature = new SkillsTaxonomyTechnicalHierarchy_(config);
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

module.exports = { SkillsTaxonomyTechnicalHierarchy_Controller };
