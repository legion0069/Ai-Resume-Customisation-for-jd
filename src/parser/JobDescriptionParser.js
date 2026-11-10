/**
 * JobDescriptionParser.js
 * Ingests, normalizes, and semantically analyzes raw Job Descriptions (JDs)
 */

class JobDescriptionParser {
  constructor() {
    this.techTaxonomy = [
      'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'go', 'golang', 'rust',
      'react', 'react.js', 'next.js', 'vue', 'angular', 'node.js', 'express', 'nestjs', 'fastapi', 'django', 'flask', 'spring boot',
      'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'k8s', 'terraform', 'ci/cd', 'github actions', 'jenkins',
      'postgresql', 'postgres', 'mysql', 'mongodb', 'redis', 'elasticsearch', 'graphql', 'rest api', 'kafka', 'rabbitmq',
      'microservices', 'distributed systems', 'system design', 'machine learning', 'ai', 'llm', 'nlp', 'pytorch', 'tensorflow',
      'agile', 'scrum', 'unit testing', 'jest', 'cypress', 'mocha', 'git'
    ];
  }

  /**
   * Parse raw text of a Job Description into a structured target profile
   * @param {string} rawText
   * @returns {Object} Parsed Job Description
   */
  parse(rawText = '') {
    if (!rawText || typeof rawText !== 'string') {
      throw new Error('Invalid Job Description: Expected non-empty text string');
    }

    const cleanText = rawText.trim();
    const lowerText = cleanText.toLowerCase();

    // 1. Role Title extraction heuristic
    const titleMatch = cleanText.match(/(?:title|role|position|looking for a|seeking an?)\s*[:\-–]?\s*([A-Za-z0-9\s\/\+\-#]+?)(?:\n|,|\.|\sat\s)/i)
      || cleanText.match(/^([A-Za-z0-9\s\/\+\-#]{3,50})(?:\n|$)/);
    const roleTitle = titleMatch ? titleMatch[1].trim() : 'Software Engineer';

    // 2. Company Name heuristic
    const companyMatch = cleanText.match(/(?:at|company|team at)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\sis|\sseeking|\shiring|\n|\.|\,)/);
    const company = companyMatch ? companyMatch[1].trim() : 'Target Company';

    // 3. Seniority level
    let seniority = 'Mid-Level';
    if (/\b(senior|sr\.?|lead|staff|principal|director|head of)\b/i.test(cleanText)) {
      seniority = 'Senior';
    } else if (/\b(junior|jr\.?|intern|internship|associate|entry level|graduate|freshers?)\b/i.test(cleanText)) {
      seniority = 'Early-Career / Intern';
    }

    // 4. Keyword & Tech Stack extraction
    const detectedKeywords = new Set();
    this.techTaxonomy.forEach(tech => {
      const escaped = tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
      if (regex.test(lowerText)) {
        detectedKeywords.add(tech);
      }
    });

    // 5. Responsibilities & Requirements line detection
    const lines = cleanText.split('\n').map(l => l.trim()).filter(Boolean);
    const responsibilities = [];
    const qualifications = [];
    let currentSection = null;

    for (const line of lines) {
      const lowerLine = line.toLowerCase();
      if (/responsibilit|what you('ll| will) do|duties|the role/i.test(lowerLine)) {
        currentSection = 'responsibilities';
        continue;
      } else if (/requirement|qualification|what you (bring|need)|skills/i.test(lowerLine)) {
        currentSection = 'qualifications';
        continue;
      }

      if (/^[-*•\d\.]+\s+/.test(line)) {
        const bullet = line.replace(/^[-*•\d\.]+\s+/, '').trim();
        if (currentSection === 'responsibilities') responsibilities.push(bullet);
        if (currentSection === 'qualifications') qualifications.push(bullet);
      }
    }

    return {
      rawText: cleanText,
      roleTitle,
      company,
      seniority,
      keywords: Array.from(detectedKeywords),
      responsibilities: responsibilities.length > 0 ? responsibilities : ['Design, develop, and deliver scalable software solutions'],
      qualifications: qualifications.length > 0 ? qualifications : ['Proficiency in modern programming languages and distributed systems'],
      parsedAt: new Date().toISOString()
    };
  }
}

module.exports = { JobDescriptionParser };
