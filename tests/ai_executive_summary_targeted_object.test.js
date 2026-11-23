/**
 * Automated Test Suite for Day 14: AI Executive Summary & Targeted Objective Generator
 */
const assert = require('assert');
const { AiExecutiveSummaryTargetedObject } = require('../src/features/ai_executive_summary_targeted_object');
const { AiExecutiveSummaryTargetedObjectController } = require('../src/controllers/ai_executive_summary_targeted_objectController');

async function runTest() {
  console.log('🧪 Testing AiExecutiveSummaryTargetedObject...');
  const instance = new AiExecutiveSummaryTargetedObject();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 14);

  const controller = new AiExecutiveSummaryTargetedObjectController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ AiExecutiveSummaryTargetedObject passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
