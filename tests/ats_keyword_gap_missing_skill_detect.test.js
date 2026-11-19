/**
 * Automated Test Suite for Day 10: ATS Keyword Gap & Missing Skill Detection Engine
 */
const assert = require('assert');
const { AtsKeywordGapMissingSkillDetect } = require('../src/features/ats_keyword_gap_missing_skill_detect');
const { AtsKeywordGapMissingSkillDetectController } = require('../src/controllers/ats_keyword_gap_missing_skill_detectController');

async function runTest() {
  console.log('🧪 Testing AtsKeywordGapMissingSkillDetect...');
  const instance = new AtsKeywordGapMissingSkillDetect();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 10);

  const controller = new AtsKeywordGapMissingSkillDetectController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ AtsKeywordGapMissingSkillDetect passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
