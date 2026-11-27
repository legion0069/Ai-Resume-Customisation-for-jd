/**
 * AI Resume Optimization Agent - Controller Handler for Day 18
 * Capability: Quantifiable Metric & Business Impact Enhancer
 */
const { QuantifiableMetricBusinessImpact_ } = require('../features/quantifiable_metric_business_impact_');

class QuantifiableMetricBusinessImpact_Controller {
  constructor(config = {}) {
    this.feature = new QuantifiableMetricBusinessImpact_(config);
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

module.exports = { QuantifiableMetricBusinessImpact_Controller };
