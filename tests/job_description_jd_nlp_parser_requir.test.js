/**
 * Automated Test Suite for Day 6: Job Description (JD) NLP Parser & Requirement Extractor
 */
const assert = require('assert');
const { JobDescriptionJdNlpParserRequir } = require('../src/features/job_description_jd_nlp_parser_requir');
const { JobDescriptionJdNlpParserRequirController } = require('../src/controllers/job_description_jd_nlp_parser_requirController');

async function runTest() {
  console.log('🧪 Testing JobDescriptionJdNlpParserRequir...');
  const instance = new JobDescriptionJdNlpParserRequir();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 6);

  const controller = new JobDescriptionJdNlpParserRequirController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ JobDescriptionJdNlpParserRequir passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
