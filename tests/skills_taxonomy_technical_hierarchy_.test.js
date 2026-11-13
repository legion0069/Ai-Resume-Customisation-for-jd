/**
 * Automated Test Suite for Day 4: Skills Taxonomy & Technical Hierarchy Engine
 */
const assert = require('assert');
const { SkillsTaxonomyTechnicalHierarchy_ } = require('../src/features/skills_taxonomy_technical_hierarchy_');
const { SkillsTaxonomyTechnicalHierarchy_Controller } = require('../src/controllers/skills_taxonomy_technical_hierarchy_Controller');

async function runTest() {
  console.log('🧪 Testing SkillsTaxonomyTechnicalHierarchy_...');
  const instance = new SkillsTaxonomyTechnicalHierarchy_();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 4);

  const controller = new SkillsTaxonomyTechnicalHierarchy_Controller();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ SkillsTaxonomyTechnicalHierarchy_ passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
