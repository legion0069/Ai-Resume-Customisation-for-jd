/**
 * resumeOptimizer.test.js
 * Comprehensive automated test suite for AI Resume Optimization Agent
 */

const assert = require('assert');
const { CandidateProfile } = require('../src/models/CandidateProfile');
const { JobDescriptionParser } = require('../src/parser/JobDescriptionParser');
const { SemanticMatcher } = require('../src/engine/SemanticMatcher');
const { ResumeOptimizer } = require('../src/optimizer/ResumeOptimizer');
const { ResumeRenderer } = require('../src/generator/ResumeRenderer');

console.log('🧪 Starting AI Resume Optimization Agent Test Suite...\n');

function runTests() {
  let passed = 0;
  let total = 0;

  function test(name, fn) {
    total++;
    try {
      fn();
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } catch (err) {
      console.error(`  ❌ FAIL: ${name}\n     ${err.message}`);
    }
  }

  // Test 1: CandidateProfile Schema & Pool CRUD
  test('CandidateProfile stores projects, internships, skills, and education', () => {
    const profile = new CandidateProfile({
      name: 'Test Candidate',
      email: 'candidate@test.com'
    });

    profile.addSkill('languages', 'JavaScript');
    profile.addSkill('frameworks', 'React');
    const proj = profile.addProject({
      title: 'Analytics Cloud',
      techStack: ['React', 'Node.js', 'PostgreSQL'],
      highlights: ['Built real-time telemetry pipeline']
    });
    const exp = profile.addExperience({
      role: 'Backend Intern',
      company: 'DataTech',
      techStack: ['Node.js', 'Redis']
    });

    assert.strictEqual(profile.projects.length, 1);
    assert.strictEqual(profile.experiences.length, 1);
    assert.strictEqual(profile.skills.languages.includes('JavaScript'), true);
    assert.strictEqual(proj.title, 'Analytics Cloud');
    assert.strictEqual(exp.role, 'Backend Intern');
  });

  // Test 2: JobDescriptionParser
  test('JobDescriptionParser parses role, keywords, and requirements from raw text', () => {
    const parser = new JobDescriptionParser();
    const rawJd = `
      Position: Senior Backend Engineer
      Company: Stripe
      We need strong experience with Node.js, TypeScript, PostgreSQL, and Docker.
      Must be proficient in microservices and distributed systems.
    `;
    const parsed = parser.parse(rawJd);

    assert.strictEqual(parsed.roleTitle.toLowerCase().includes('backend engineer'), true);
    assert.strictEqual(parsed.keywords.includes('node.js'), true);
    assert.strictEqual(parsed.keywords.includes('typescript'), true);
    assert.strictEqual(parsed.keywords.includes('postgresql'), true);
    assert.strictEqual(parsed.keywords.includes('docker'), true);
  });

  // Test 3: SemanticMatcher Compatibility Scoring
  test('SemanticMatcher computes higher scores for matching tech stack components', () => {
    const matcher = new SemanticMatcher();
    const parsedJd = {
      keywords: ['react', 'node.js', 'docker', 'postgresql']
    };

    const matchingProj = {
      id: 'p1',
      title: 'Finance App',
      techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker'],
      highlights: ['Full stack dashboard']
    };

    const nonMatchingProj = {
      id: 'p2',
      title: 'Hardware Sensor Script',
      techStack: ['C++', 'Arduino'],
      highlights: ['Embedded telemetry']
    };

    const matchEval = matcher.scoreComponent(matchingProj, parsedJd);
    const nonMatchEval = matcher.scoreComponent(nonMatchingProj, parsedJd);

    assert.strictEqual(matchEval.score > nonMatchEval.score, true);
    assert.strictEqual(matchEval.score >= 70, true);
    assert.strictEqual(matchEval.suitabilityTier.includes('Highly Recommended') || matchEval.suitabilityTier.includes('Strong Match'), true);
  });

  // Test 4: ResumeOptimizer Selection State & Finalization
  test('ResumeOptimizer allows ticking/unticking and finalizes tailored resume', () => {
    const profile = new CandidateProfile({ name: 'Jane Dev', email: 'jane@dev.com' });
    const p1 = profile.addProject({ id: 'p1', title: 'React Storefront', techStack: ['React'] });
    const p2 = profile.addProject({ id: 'p2', title: 'Python Pipeline', techStack: ['Python'] });

    const optimizer = new ResumeOptimizer(profile);
    optimizer.dropJobDescription('Role: Frontend React Engineer at Vercel. Requires React, JavaScript, CSS.');

    // User explicitly ticks p1 and unticks p2
    optimizer.setItemSelected('project', 'p1', true);
    optimizer.setItemSelected('project', 'p2', false);

    const finalized = optimizer.finalize();
    assert.strictEqual(finalized.selectedProjects.length, 1);
    assert.strictEqual(finalized.selectedProjects[0].title, 'React Storefront');
    assert.strictEqual(typeof finalized.summary, 'string');
    assert.strictEqual(finalized.summary.length > 20, true);
  });

  // Test 5: ResumeRenderer Formats
  test('ResumeRenderer outputs Markdown and HTML without crashing', () => {
    const mockResume = {
      contact: { name: 'Sai Teja', email: 'sai@test.com' },
      targetRole: 'Full Stack Engineer',
      targetCompany: 'Google',
      summary: 'Experienced software engineer.',
      skills: { languages: ['TypeScript'], frameworks: ['React'] },
      selectedProjects: [{ title: 'AI Assistant', role: 'Lead', bullets: ['Built LLM agent'] }],
      selectedExperiences: [{ role: 'Software Intern', company: 'Acme Corp', bullets: ['Optimized DB'] }],
      education: [{ degree: 'B.Tech', field: 'CSE', institution: 'University', graduationDate: '2026' }],
      certifications: []
    };

    const md = ResumeRenderer.toMarkdown(mockResume);
    const html = ResumeRenderer.toHtml(mockResume);

    assert.strictEqual(md.includes('# Sai Teja'), true);
    assert.strictEqual(md.includes('Target Role: Full Stack Engineer'), true);
    assert.strictEqual(html.includes('<!DOCTYPE html>'), true);
    assert.strictEqual(html.includes('Sai Teja'), true);
  });

  console.log(`\n📊 Test Run Completed: ${passed} / ${total} tests passed.`);
  if (passed !== total) {
    process.exit(1);
  }
}

runTests();

