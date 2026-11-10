/**
 * SemanticMatcher.js
 * Analyzes semantic and keyword compatibility between candidate component pool and JD requirements
 */

class SemanticMatcher {
  /**
   * Score an individual component (Project or Experience) against parsed JD
   * @param {Object} component - ProjectItem or ExperienceItem
   * @param {Object} parsedJd - Output from JobDescriptionParser
   * @returns {Object} Score details, matched keywords, and recommendation tier
   */
  scoreComponent(component, parsedJd) {
    const jdKeywords = parsedJd.keywords || [];
    if (jdKeywords.length === 0) {
      return {
        score: 75,
        matchedKeywords: [],
        suitabilityTier: '⭐ Strong Match',
        rationale: 'Solid baseline project alignment'
      };
    }

    // Component text representation
    const textCorpus = [
      component.title || component.role || '',
      component.description || component.company || '',
      ...(component.techStack || []),
      ...(component.highlights || []),
      ...(component.tags || []),
      ...(component.metrics || [])
    ].join(' ').toLowerCase();

    const matchedKeywords = [];
    for (const kw of jdKeywords) {
      const escaped = kw.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
      if (regex.test(textCorpus)) {
        matchedKeywords.push(kw);
      }
    }

    // Direct tech stack overlap
    const techStackLower = (component.techStack || []).map(t => t.toLowerCase());
    const directTechMatches = jdKeywords.filter(kw => techStackLower.includes(kw));

    // Weighted scoring formula
    const keywordCoverage = matchedKeywords.length / Math.max(1, jdKeywords.length);
    const techStackBonus = Math.min(30, directTechMatches.length * 10);
    const rawScore = Math.round((keywordCoverage * 60) + techStackBonus + 15);
    const finalScore = Math.min(100, Math.max(20, rawScore));

    let suitabilityTier = '💡 Moderate / Optional';
    if (finalScore >= 75) {
      suitabilityTier = '🔥 Highly Recommended';
    } else if (finalScore >= 50) {
      suitabilityTier = '⭐ Strong Match';
    }

    return {
      componentId: component.id,
      title: component.title || `${component.role} at ${component.company}`,
      type: component.type || 'project',
      score: finalScore,
      matchedKeywords,
      directTechMatches,
      suitabilityTier,
      rationale: matchedKeywords.length > 0
        ? `Aligns with key job requirements: ${matchedKeywords.slice(0, 4).join(', ')}`
        : 'Broad foundational alignment with engineering best practices'
    };
  }

  /**
   * Evaluate entire candidate profile against parsed JD
   * @param {CandidateProfile} candidateProfile
   * @param {Object} parsedJd
   * @returns {Object} Comprehensive evaluation with recommendations
   */
  evaluateProfile(candidateProfile, parsedJd) {
    const jdKeywords = parsedJd.keywords || [];

    // Score all projects
    const projectSuggestions = candidateProfile.projects.map(proj => {
      const evaluation = this.scoreComponent(proj, parsedJd);
      return {
        ...proj,
        evaluation
      };
    }).sort((a, b) => b.evaluation.score - a.evaluation.score);

    // Score all experiences / internships
    const experienceSuggestions = candidateProfile.experiences.map(exp => {
      const evaluation = this.scoreComponent(exp, parsedJd);
      return {
        ...exp,
        evaluation
      };
    }).sort((a, b) => b.evaluation.score - a.evaluation.score);

    // Skills analysis
    const candidateSkills = candidateProfile.getAllSkillsList();
    const candidateSkillsLower = candidateSkills.map(s => s.toLowerCase());

    const matchedSkills = jdKeywords.filter(k => candidateSkillsLower.includes(k));
    const missingSkills = jdKeywords.filter(k => !candidateSkillsLower.includes(k));

    // Overall candidate compatibility index
    const totalPotential = (projectSuggestions[0]?.evaluation.score || 50) * 0.4
      + (experienceSuggestions[0]?.evaluation.score || 50) * 0.4
      + (matchedSkills.length / Math.max(1, jdKeywords.length) * 100) * 0.2;

    const overallMatchScore = Math.min(100, Math.round(totalPotential));

    return {
      parsedJd,
      overallMatchScore,
      projectSuggestions,
      experienceSuggestions,
      matchedSkills,
      missingSkills,
      evaluatedAt: new Date().toISOString()
    };
  }
}

module.exports = { SemanticMatcher };
