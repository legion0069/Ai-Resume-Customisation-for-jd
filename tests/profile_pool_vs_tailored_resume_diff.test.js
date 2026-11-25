/**
 * Automated Test Suite for Day 16: Profile Pool vs. Tailored Resume Diff & Delta Inspector
 */
const assert = require('assert');
const { ProfilePoolVsTailoredResumeDiff } = require('../src/features/profile_pool_vs_tailored_resume_diff');
const { ProfilePoolVsTailoredResumeDiffController } = require('../src/controllers/profile_pool_vs_tailored_resume_diffController');

async function runTest() {
  console.log('🧪 Testing ProfilePoolVsTailoredResumeDiff...');
  const instance = new ProfilePoolVsTailoredResumeDiff();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 16);

  const controller = new ProfilePoolVsTailoredResumeDiffController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ ProfilePoolVsTailoredResumeDiff passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
