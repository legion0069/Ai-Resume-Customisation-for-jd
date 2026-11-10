/**
 * AI Resume Optimization Agent - Controller Handler for Day 1
 * Capability: Project Setup, Component Architecture & Candidate Profile Schemas
 */
const { ProjectSetupComponentArchitecture } = require('../features/project_setup_component_architecture');

class ProjectSetupComponentArchitectureController {
  constructor(config = {}) {
    this.feature = new ProjectSetupComponentArchitecture(config);
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

module.exports = { ProjectSetupComponentArchitectureController };
