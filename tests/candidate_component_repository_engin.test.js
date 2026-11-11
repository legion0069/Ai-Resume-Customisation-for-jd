/**
 * Automated Test Suite for Day 2: Candidate Component Repository Engine & CRUD Store
 */
const assert = require('assert');
const { CandidateComponentRepositoryEngin } = require('../src/features/candidate_component_repository_engin');
const { CandidateComponentRepositoryEnginController } = require('../src/controllers/candidate_component_repository_enginController');

async function runTest() {
  console.log('🧪 Testing CandidateComponentRepositoryEngin...');
  const instance = new CandidateComponentRepositoryEngin();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 2);

  const controller = new CandidateComponentRepositoryEnginController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ CandidateComponentRepositoryEngin passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
