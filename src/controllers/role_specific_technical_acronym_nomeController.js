/**
 * AI Resume Optimization Agent - Controller Handler for Day 19
 * Capability: Role-Specific Technical Acronym & Nomenclature Harmonizer
 */
const { RoleSpecificTechnicalAcronymNome } = require('../features/role_specific_technical_acronym_nome');

class RoleSpecificTechnicalAcronymNomeController {
  constructor(config = {}) {
    this.feature = new RoleSpecificTechnicalAcronymNome(config);
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

module.exports = { RoleSpecificTechnicalAcronymNomeController };
