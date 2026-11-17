/**
 * Automated Test Suite for Day 8: Semantic Relevance & Component Compatibility Scoring Engine
 */
const assert = require('assert');
const { SemanticRelevanceComponentCompati } = require('../src/features/semantic_relevance_component_compati');
const { SemanticRelevanceComponentCompatiController } = require('../src/controllers/semantic_relevance_component_compatiController');

async function runTest() {
  console.log('🧪 Testing SemanticRelevanceComponentCompati...');
  const instance = new SemanticRelevanceComponentCompati();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 8);

  const controller = new SemanticRelevanceComponentCompatiController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ SemanticRelevanceComponentCompati passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
