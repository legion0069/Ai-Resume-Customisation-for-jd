/**
 * Automated Test Suite for Day 3: Bullet-Point Action Verb & STAR Impact Metric Normalizer
 */
const assert = require('assert');
const { BulletPointActionVerbStarImpact } = require('../src/features/bullet_point_action_verb_star_impact');
const { BulletPointActionVerbStarImpactController } = require('../src/controllers/bullet_point_action_verb_star_impactController');

async function runTest() {
  console.log('🧪 Testing BulletPointActionVerbStarImpact...');
  const instance = new BulletPointActionVerbStarImpact();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 3);

  const controller = new BulletPointActionVerbStarImpactController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ BulletPointActionVerbStarImpact passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
