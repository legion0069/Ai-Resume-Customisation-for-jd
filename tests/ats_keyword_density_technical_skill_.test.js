/**
 * Automated Test Suite for Day 7: ATS Keyword Density & Technical Skill Matcher
 */
const assert = require('assert');
const { AtsKeywordDensityTechnicalSkill_ } = require('../src/features/ats_keyword_density_technical_skill_');
const { AtsKeywordDensityTechnicalSkill_Controller } = require('../src/controllers/ats_keyword_density_technical_skill_Controller');

async function runTest() {
  console.log('🧪 Testing AtsKeywordDensityTechnicalSkill_...');
  const instance = new AtsKeywordDensityTechnicalSkill_();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 7);

  const controller = new AtsKeywordDensityTechnicalSkill_Controller();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ AtsKeywordDensityTechnicalSkill_ passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
