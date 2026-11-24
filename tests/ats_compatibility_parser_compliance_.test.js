/**
 * Automated Test Suite for Day 15: ATS Compatibility & Parser Compliance Pre-Flight Checker
 */
const assert = require('assert');
const { AtsCompatibilityParserCompliance_ } = require('../src/features/ats_compatibility_parser_compliance_');
const { AtsCompatibilityParserCompliance_Controller } = require('../src/controllers/ats_compatibility_parser_compliance_Controller');

async function runTest() {
  console.log('🧪 Testing AtsCompatibilityParserCompliance_...');
  const instance = new AtsCompatibilityParserCompliance_();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 15);

  const controller = new AtsCompatibilityParserCompliance_Controller();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ AtsCompatibilityParserCompliance_ passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
