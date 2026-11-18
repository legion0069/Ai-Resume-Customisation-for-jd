/**
 * Automated Test Suite for Day 9: Intelligent Project & Internship Recommendation Ranker
 */
const assert = require('assert');
const { IntelligentProjectInternshipRecom } = require('../src/features/intelligent_project_internship_recom');
const { IntelligentProjectInternshipRecomController } = require('../src/controllers/intelligent_project_internship_recomController');

async function runTest() {
  console.log('🧪 Testing IntelligentProjectInternshipRecom...');
  const instance = new IntelligentProjectInternshipRecom();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 9);

  const controller = new IntelligentProjectInternshipRecomController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ IntelligentProjectInternshipRecom passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
