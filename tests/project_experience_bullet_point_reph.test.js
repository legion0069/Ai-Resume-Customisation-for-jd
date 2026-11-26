/**
 * Automated Test Suite for Day 17: Project & Experience Bullet-Point Rephraser
 */
const assert = require('assert');
const { ProjectExperienceBulletPointReph } = require('../src/features/project_experience_bullet_point_reph');
const { ProjectExperienceBulletPointRephController } = require('../src/controllers/project_experience_bullet_point_rephController');

async function runTest() {
  console.log('🧪 Testing ProjectExperienceBulletPointReph...');
  const instance = new ProjectExperienceBulletPointReph();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 17);

  const controller = new ProjectExperienceBulletPointRephController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ ProjectExperienceBulletPointReph passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
