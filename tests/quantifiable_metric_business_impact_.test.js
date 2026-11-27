/**
 * Automated Test Suite for Day 18: Quantifiable Metric & Business Impact Enhancer
 */
const assert = require('assert');
const { QuantifiableMetricBusinessImpact_ } = require('../src/features/quantifiable_metric_business_impact_');
const { QuantifiableMetricBusinessImpact_Controller } = require('../src/controllers/quantifiable_metric_business_impact_Controller');

async function runTest() {
  console.log('🧪 Testing QuantifiableMetricBusinessImpact_...');
  const instance = new QuantifiableMetricBusinessImpact_();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 18);

  const controller = new QuantifiableMetricBusinessImpact_Controller();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ QuantifiableMetricBusinessImpact_ passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
