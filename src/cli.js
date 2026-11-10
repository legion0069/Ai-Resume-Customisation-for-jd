/**
 * cli.js
 * Interactive CLI runner showcasing AI Resume Optimization Agent workflow:
 * 1. Load / Enter Candidate Component Pool (Projects, Internships, Skills)
 * 2. Drop / Ingest Job Description (JD)
 * 3. AI Matches & Suggests Suited Components with Relevance Scores
 * 4. User Checks / Ticks Preferred Components
 * 5. Finalize & Generate Customized ATS Resume
 */

const { CandidateProfile } = require('./models/CandidateProfile');
const { ResumeOptimizer } = require('./optimizer/ResumeOptimizer');
const { ResumeRenderer } = require('./generator/ResumeRenderer');

function runDemo() {
  console.log('================================================================');
  console.log('🤖 AI RESUME OPTIMIZATION AGENT — AUTONOMOUS WORKFLOW DEMO');
  console.log('================================================================\n');

  // Step 1: Candidate enters component pool
  console.log('📝 STEP 1: Candidate Component Pool Initialized');
  const profile = new CandidateProfile({
    name: 'Sai Teja Verukonda',
    email: 'tejaverukonda@gmail.com',
    phone: '+91 98765 43210',
    location: 'Hyderabad, India',
    linkedin: 'https://linkedin.com/in/sai-teja-verukonda',
    github: 'https://github.com/legion0069'
  });

  // Skills
  ['JavaScript', 'TypeScript', 'Python', 'Java', 'SQL'].forEach(s => profile.addSkill('languages', s));
  ['React', 'Node.js', 'Express', 'Next.js', 'FastAPI'].forEach(s => profile.addSkill('frameworks', s));
  ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'CI/CD'].forEach(s => profile.addSkill('cloudAndDevOps', s));
  ['PostgreSQL', 'MongoDB', 'Redis'].forEach(s => profile.addSkill('databases', s));

  // Internships / Experiences in component pool
  profile.addExperience({
    id: 'exp-internship-1',
    role: 'Full Stack Engineering Intern',
    company: 'FinTech Innovations Inc.',
    type: 'internship',
    startDate: 'Jan 2026',
    endDate: 'May 2026',
    location: 'Bangalore, India',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    highlights: [
      'Engineered responsive customer onboarding portal in React and Node.js, reducing drop-off rates by 24%',
      'Architected PostgreSQL schema for real-time transaction processing handling 50k daily active events',
      'Automated CI/CD deployment pipelines using GitHub Actions and Docker, reducing release cycle time by 40%'
    ]
  });

  profile.addExperience({
    id: 'exp-internship-2',
    role: 'Machine Learning Research Intern',
    company: 'DataCore Labs',
    type: 'internship',
    startDate: 'Jun 2025',
    endDate: 'Dec 2025',
    location: 'Hyderabad, India',
    techStack: ['Python', 'FastAPI', 'PyTorch', 'MongoDB'],
    highlights: [
      'Developed high-throughput document intelligence service utilizing FastAPI and NLP models',
      'Boosted automated text classification accuracy to 94.2% on financial filings benchmark'
    ]
  });

  // Projects in component pool
  profile.addProject({
    id: 'proj-1',
    title: 'Personal Finance AI OS',
    role: 'Lead Architect',
    link: 'https://github.com/legion0069/Personal-Finance-AI',
    techStack: ['Node.js', 'React', 'Gemini AI', 'PostgreSQL', 'Docker', 'REST API'],
    highlights: [
      'Engineered an autonomous AI financial analytics platform parsing multi-bank CSV/PDF statements',
      'Integrated Google Gemini LLM for predictive expense forecasting and natural language transaction chat',
      'Implemented 50/30/20 budget recommendation engine with interactive financial health score'
    ],
    metrics: ['Sub-200ms API response time', '50,000 transactions processed']
  });

  profile.addProject({
    id: 'proj-2',
    title: 'Restaurant Ratings Tracker & Data Pipeline',
    role: 'Creator & Developer',
    link: 'https://github.com/legion0069/restaurant-ratings-tracker',
    techStack: ['Python', 'SerpAPI', 'Excel', 'GitHub Actions', 'SMTP'],
    highlights: [
      'Built automated daily web scraping pipeline capturing live Google Maps review metrics',
      'Configured automated ledger synchronization and daily email dispatch to restaurant management'
    ]
  });

  profile.addProject({
    id: 'proj-3',
    title: 'Distributed Microservices To-Do Task Engine',
    role: 'Full Stack Developer',
    link: 'https://github.com/legion0069/to-do-list',
    techStack: ['TypeScript', 'Express', 'Redis', 'Docker'],
    highlights: [
      'Engineered high-concurrency task management REST API with dynamic urgency priority queues',
      'Implemented distributed caching via Redis, lowering read latencies by 65%'
    ]
  });

  profile.addEducation({
    institution: 'Jawaharlal Nehru Technological University',
    degree: 'Bachelor of Technology',
    field: 'Computer Science and Engineering',
    graduationDate: '2026',
    gpa: '8.8 / 10'
  });

  console.log(`✅ Loaded: ${profile.projects.length} Projects, ${profile.experiences.length} Internships, ${profile.getAllSkillsList().length} Skills.\n`);

  // Step 2: Drop Job Description (JD)
  console.log('📥 STEP 2: Dropping Job Description (JD)...');
  const sampleJd = `
Role: Full Stack AI Engineer
Company: CloudScale AI
Location: Remote / Bengaluru

About the Role:
We are looking for a Full Stack AI Engineer to build next-generation intelligent applications.
You will architect scalable web services, integrate LLM agents, and deploy production pipelines.

Requirements:
- Strong proficiency in Node.js, TypeScript, React, and REST API development.
- Hands-on experience with Docker, AWS, and CI/CD pipelines (GitHub Actions).
- Experience integrating AI / LLM APIs or Machine Learning workflows is a huge plus.
- Solid database fundamentals in PostgreSQL and Redis.
- Excellent problem-solving skills and ability to lead end-to-end features.
  `;

  const optimizer = new ResumeOptimizer(profile);
  const result = optimizer.dropJobDescription(sampleJd);

  console.log(`🎯 Target Role Detected: ${result.parsedJd.roleTitle} at ${result.parsedJd.company}`);
  console.log(`📊 Candidate JD Compatibility Match Score: ${result.overallMatchScore}%\n`);

  // Step 3: AI Suggestions & Compatibility Match
  console.log('🤖 STEP 3: AI Intelligent Component Suitability Suggestions:');
  console.log('----------------------------------------------------------------');
  console.log('Projects in Candidate Pool:');
  result.projects.forEach((p, idx) => {
    const box = p.isSelected ? '[x]' : '[ ]';
    console.log(`  ${box} ${idx + 1}. ${p.title} (${p.evaluation.score}% Match | ${p.evaluation.suitabilityTier})`);
    console.log(`      Matched Keywords: ${p.evaluation.matchedKeywords.join(', ') || 'General'}`);
  });

  console.log('\nInternships / Experience in Candidate Pool:');
  result.experiences.forEach((e, idx) => {
    const box = e.isSelected ? '[x]' : '[ ]';
    console.log(`  ${box} ${idx + 1}. ${e.role} at ${e.company} (${e.evaluation.score}% Match | ${e.evaluation.suitabilityTier})`);
    console.log(`      Matched Keywords: ${e.evaluation.matchedKeywords.join(', ') || 'General'}`);
  });

  // Step 4: User Ticking / Adjusting Components
  console.log('\n✅ STEP 4: Candidate Ticking Selected Components for this JD:');
  console.log('  -> Ticked: Personal Finance AI OS (Matches React, Node, AI/LLM, PostgreSQL, Docker)');
  console.log('  -> Ticked: Distributed Microservices To-Do Task Engine (Matches TypeScript, Redis, Docker)');
  console.log('  -> Ticked: FinTech Innovations Inc. Internship (Matches Full Stack, React, AWS, CI/CD)');

  // Step 5: Finalize Resume
  console.log('\n🚀 STEP 5: Clicking "Finalize" -> Generating Customized ATS Resume...');
  const finalized = optimizer.finalize();
  const markdownOutput = ResumeRenderer.toMarkdown(finalized);

  console.log('\n================== FINALIZED CUSTOMIZED RESUME (MARKDOWN) ==================\n');
  console.log(markdownOutput);
  console.log('\n============================================================================');
  console.log('✨ Customized Resume Successfully Generated and ATS Optimized!');
}

if (require.main === module) {
  runDemo();
}

module.exports = { runDemo };

