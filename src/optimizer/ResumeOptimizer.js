/**
 * ResumeOptimizer.js
 * Orchestrates Candidate Component Ingestion, JD Matching, Interactive Selection Checklist, and Finalization
 */

const { CandidateProfile } = require('../models/CandidateProfile');
const { JobDescriptionParser } = require('../parser/JobDescriptionParser');
const { SemanticMatcher } = require('../engine/SemanticMatcher');

class ResumeOptimizer {
  constructor(candidateProfile) {
    this.profile = candidateProfile instanceof CandidateProfile
      ? candidateProfile
      : CandidateProfile.fromJSON(candidateProfile || {});
    this.parser = new JobDescriptionParser();
    this.matcher = new SemanticMatcher();

    this.currentJd = null;
    this.analysis = null;
    this.selectionState = {
      projectIds: new Set(),
      experienceIds: new Set(),
      includedSkills: new Set()
    };
  }

  /**
   * Drop / input a job description to trigger analysis
   * @param {string} jdText - Raw Job Description text
   * @returns {Object} Analysis with recommendations and suggested selection
   */
  dropJobDescription(jdText) {
    this.currentJd = this.parser.parse(jdText);
    this.analysis = this.matcher.evaluateProfile(this.profile, this.currentJd);

    // Default smart pre-selection: Auto-select items scoring >= 50% (or top 2 projects & top 2 experiences)
    this.selectionState.projectIds.clear();
    this.selectionState.experienceIds.clear();
    this.selectionState.includedSkills.clear();

    const topProjects = this.analysis.projectSuggestions.slice(0, 3);
    topProjects.forEach(p => {
      if (p.evaluation.score >= 40) {
        this.selectionState.projectIds.add(p.id);
      }
    });

    const topExp = this.analysis.experienceSuggestions.slice(0, 3);
    topExp.forEach(e => {
      if (e.evaluation.score >= 40) {
        this.selectionState.experienceIds.add(e.id);
      }
    });

    this.profile.getAllSkillsList().forEach(s => this.selectionState.includedSkills.add(s));

    return {
      parsedJd: this.currentJd,
      overallMatchScore: this.analysis.overallMatchScore,
      projects: this.analysis.projectSuggestions.map(p => ({
        ...p,
        isSelected: this.selectionState.projectIds.has(p.id)
      })),
      experiences: this.analysis.experienceSuggestions.map(e => ({
        ...e,
        isSelected: this.selectionState.experienceIds.has(e.id)
      })),
      matchedSkills: this.analysis.matchedSkills,
      missingSkills: this.analysis.missingSkills
    };
  }

  /**
   * Toggle or set selection of a candidate component (by user ticking the box)
   * @param {'project'|'experience'|'skill'} type
   * @param {string} idOrName
   * @param {boolean} [forceState]
   */
  setItemSelected(type, idOrName, forceState) {
    let targetSet;
    if (type === 'project') targetSet = this.selectionState.projectIds;
    else if (type === 'experience') targetSet = this.selectionState.experienceIds;
    else if (type === 'skill') targetSet = this.selectionState.includedSkills;
    else throw new Error(`Unknown component type: ${type}`);

    const currentlyHas = targetSet.has(idOrName);
    const shouldInclude = typeof forceState === 'boolean' ? forceState : !currentlyHas;

    if (shouldInclude) {
      targetSet.add(idOrName);
    } else {
      targetSet.delete(idOrName);
    }

    return shouldInclude;
  }

  /**
   * Finalize and generate customized resume for the target JD
   * @param {Object} options
   * @returns {Object} Finalized Customized Resume payload
   */
  finalize(options = {}) {
    if (!this.currentJd) {
      throw new Error('Cannot finalize resume: Please drop a Job Description first.');
    }

    const targetCompany = options.targetCompany || this.currentJd.company || 'Hiring Team';
    const targetRole = options.targetRole || this.currentJd.roleTitle || 'Software Engineer';

    // 1. Filter selected projects and experiences
    const selectedProjects = this.profile.projects.filter(p => this.selectionState.projectIds.has(p.id));
    const selectedExperiences = this.profile.experiences.filter(e => this.selectionState.experienceIds.has(e.id));

    // 2. Synthesize JD-aligned professional summary
    const keyMatchedTech = (this.analysis?.matchedSkills || []).slice(0, 4).join(', ');
    const summaryStatement = `Target-driven ${targetRole} offering hands-on expertise in ${keyMatchedTech || 'full-stack engineering, scalable architecture, and distributed systems'}. Proven track record designing high-impact projects, accelerating delivery velocity, and aligning technical solutions with ${targetCompany}'s strategic goals.`;

    // 3. Assemble customized resume
    const customizedResume = {
      title: `${this.profile.contact.name || 'Candidate'} - Tailored Resume for ${targetCompany}`,
      targetRole,
      targetCompany,
      matchScore: this.analysis?.overallMatchScore || 85,
      contact: this.profile.contact,
      summary: summaryStatement,
      selectedProjects: selectedProjects.map(p => ({
        title: p.title,
        role: p.role,
        link: p.link,
        techStack: p.techStack,
        bullets: p.highlights.length > 0 ? p.highlights : [p.description],
        metrics: p.metrics
      })),
      selectedExperiences: selectedExperiences.map(e => ({
        role: e.role,
        company: e.company,
        type: e.type,
        location: e.location,
        period: `${e.startDate} – ${e.endDate}`,
        bullets: e.highlights.length > 0 ? e.highlights : e.achievements,
        techStack: e.techStack
      })),
      skills: this.profile.skills,
      education: this.profile.education,
      certifications: this.profile.certifications,
      generatedAt: new Date().toISOString()
    };

    return customizedResume;
  }
}

module.exports = { ResumeOptimizer };
