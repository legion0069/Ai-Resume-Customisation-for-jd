/**
 * Automated Test Suite for Day 5: Candidate Profile Import/Export & Multi-Format Ingestion
 */
const assert = require('assert');
const { CandidateProfileImportExportMult } = require('../src/features/candidate_profile_import_export_mult');
const { CandidateProfileImportExportMultController } = require('../src/controllers/candidate_profile_import_export_multController');

async function runTest() {
  console.log('🧪 Testing CandidateProfileImportExportMult...');
  const instance = new CandidateProfileImportExportMult();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 5);

  const controller = new CandidateProfileImportExportMultController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ CandidateProfileImportExportMult passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
