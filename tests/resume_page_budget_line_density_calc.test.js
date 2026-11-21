/**
 * Automated Test Suite for Day 12: Resume Page-Budget & Line Density Calculator
 */
const assert = require('assert');
const { ResumePageBudgetLineDensityCalc } = require('../src/features/resume_page_budget_line_density_calc');
const { ResumePageBudgetLineDensityCalcController } = require('../src/controllers/resume_page_budget_line_density_calcController');

async function runTest() {
  console.log('🧪 Testing ResumePageBudgetLineDensityCalc...');
  const instance = new ResumePageBudgetLineDensityCalc();
  const output = await instance.process({ projects: [{ id: 1 }] }, { title: 'Engineer' });
  assert.strictEqual(output.success, true);
  assert.strictEqual(output.day, 12);

  const controller = new ResumePageBudgetLineDensityCalcController();
  const res = await controller.handleOptimization({ pool: {}, jd: {} });
  assert.strictEqual(res.statusCode, 200);
  console.log('✅ ResumePageBudgetLineDensityCalc passed all checks!');
}

if (require.main === module) {
  runTest().catch(err => { console.error(err); process.exit(1); });
}

module.exports = { runTest };
