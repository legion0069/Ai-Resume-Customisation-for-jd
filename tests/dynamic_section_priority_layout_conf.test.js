/**
 * Automated Test Suite for Day 13: Dynamic Section Priority & Layout Configurator
 */
const assert = require('assert');
const { DynamicSectionPriorityLayoutConf } = require('../src/features/dynamic_section_priority_layout_conf');
const { DynamicSectionPriorityLayoutConfController } = require('../src/controllers/dynamic_section_priority_layout_confController');

async function runTest() {
  console.log('🧪 Testing DynamicSectionPriorityLayoutConf...');
  const instance = new DynamicSectionPriorityLayoutConf();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 13);

  const controller = new DynamicSectionPriorityLayoutConfController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ DynamicSectionPriorityLayoutConf passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
