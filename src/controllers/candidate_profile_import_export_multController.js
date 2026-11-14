/**
 * AI Resume Optimization Agent - Controller Handler for Day 5
 * Capability: Candidate Profile Import/Export & Multi-Format Ingestion
 */
const { CandidateProfileImportExportMult } = require('../features/candidate_profile_import_export_mult');

class CandidateProfileImportExportMultController {
  constructor(config = {}) {
    this.feature = new CandidateProfileImportExportMult(config);
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

module.exports = { CandidateProfileImportExportMultController };
