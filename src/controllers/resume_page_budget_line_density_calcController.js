/**
 * AI Resume Optimization Agent - Controller Handler for Day 12
 * Capability: Resume Page-Budget & Line Density Calculator
 */
const { ResumePageBudgetLineDensityCalc } = require('../features/resume_page_budget_line_density_calc');

class ResumePageBudgetLineDensityCalcController {
  constructor(config = {}) {
    this.feature = new ResumePageBudgetLineDensityCalc(config);
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

module.exports = { ResumePageBudgetLineDensityCalcController };
