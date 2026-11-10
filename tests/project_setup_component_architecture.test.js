/**
 * Automated Test Suite for Day 1: Project Setup, Component Architecture & Candidate Profile Schemas
 */
const assert = require('assert');
const { ProjectSetupComponentArchitecture } = require('../src/features/project_setup_component_architecture');
const { ProjectSetupComponentArchitectureController } = require('../src/controllers/project_setup_component_architectureController');

async function runTest() {
  console.log('🧪 Testing ProjectSetupComponentArchitecture...');
  const instance = new ProjectSetupComponentArchitecture();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 1);

  const controller = new ProjectSetupComponentArchitectureController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ ProjectSetupComponentArchitecture passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
