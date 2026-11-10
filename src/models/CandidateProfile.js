/**
 * CandidateProfile.js
 * Comprehensive Candidate Component Pool Architecture for AI Resume Optimization
 */

class ProjectItem {
  constructor({
    id,
    title,
    role = 'Lead Developer',
    description = '',
    techStack = [],
    highlights = [],
    metrics = [],
    link = '',
    tags = []
  } = {}) {
    this.id = id || `proj_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.title = title || 'Untitled Project';
    this.role = role;
    this.description = description;
    this.techStack = Array.isArray(techStack) ? techStack : [];
    this.highlights = Array.isArray(highlights) ? highlights : [];
    this.metrics = Array.isArray(metrics) ? metrics : [];
    this.link = link;
    this.tags = Array.isArray(tags) ? tags : [];
  }
}

class ExperienceItem {
  constructor({
    id,
    role,
    company,
    type = 'internship', // 'internship' | 'full-time' | 'co-op' | 'contract'
    location = 'Remote',
    startDate = '',
    endDate = 'Present',
    highlights = [],
    techStack = [],
    achievements = []
  } = {}) {
    this.id = id || `exp_${Date.now()}_${Math.random().toString(36).substr(2, 6)}`;
    this.role = role || 'Software Engineering Intern';
    this.company = company || 'Tech Company';
    this.type = type;
    this.location = location;
    this.startDate = startDate;
    this.endDate = endDate;
    this.highlights = Array.isArray(highlights) ? highlights : [];
    this.techStack = Array.isArray(techStack) ? techStack : [];
    this.achievements = Array.isArray(achievements) ? achievements : [];
  }
}

class SkillCategory {
  constructor() {
    this.languages = [];
    this.frameworks = [];
    this.cloudAndDevOps = [];
    this.databases = [];
    this.tools = [];
    this.concepts = [];
  }
}

class CandidateProfile {
  constructor({
    name = '',
    email = '',
    phone = '',
    location = '',
    linkedin = '',
    github = '',
    portfolio = '',
    summary = ''
  } = {}) {
    this.contact = {
      name,
      email,
      phone,
      location,
      linkedin,
      github,
      portfolio
    };
    this.summary = summary;
    this.projects = [];
    this.experiences = []; // Includes internships & full-time roles
    this.skills = new SkillCategory();
    this.education = [];
    this.certifications = [];
  }

  addProject(projectData) {
    const project = new ProjectItem(projectData);
    this.projects.push(project);
    return project;
  }

  addExperience(expData) {
    const exp = new ExperienceItem(expData);
    this.experiences.push(exp);
    return exp;
  }

  addSkill(category, skillName) {
    if (!this.skills[category]) {
      this.skills[category] = [];
    }
    const clean = (skillName || '').trim();
    if (clean && !this.skills[category].includes(clean)) {
      this.skills[category].push(clean);
    }
  }

  addEducation({ institution, degree, field, graduationDate, gpa, honors = [] }) {
    this.education.push({
      id: `edu_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      institution,
      degree,
      field,
      graduationDate,
      gpa,
      honors: Array.isArray(honors) ? honors : []
    });
  }

  addCertification({ name, issuer, date, credentialUrl = '' }) {
    this.certifications.push({
      id: `cert_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
      name,
      issuer,
      date,
      credentialUrl
    });
  }

  getAllSkillsList() {
    const all = [];
    Object.values(this.skills).forEach(list => {
      if (Array.isArray(list)) all.push(...list);
    });
    return Array.from(new Set(all));
  }

  toJSON() {
    return {
      contact: this.contact,
      summary: this.summary,
      projects: this.projects,
      experiences: this.experiences,
      skills: this.skills,
      education: this.education,
      certifications: this.certifications
    };
  }

  static fromJSON(data = {}) {
    const profile = new CandidateProfile(data.contact || {});
    profile.summary = data.summary || '';
    if (Array.isArray(data.projects)) {
      data.projects.forEach(p => profile.addProject(p));
    }
    if (Array.isArray(data.experiences)) {
      data.experiences.forEach(e => profile.addExperience(e));
    }
    if (data.skills && typeof data.skills === 'object') {
      Object.keys(data.skills).forEach(cat => {
        if (Array.isArray(data.skills[cat])) {
          data.skills[cat].forEach(s => profile.addSkill(cat, s));
        }
      });
    }
    if (Array.isArray(data.education)) {
      data.education.forEach(edu => profile.addEducation(edu));
    }
    if (Array.isArray(data.certifications)) {
      data.certifications.forEach(cert => profile.addCertification(cert));
    }
    return profile;
  }
}

module.exports = {
  CandidateProfile,
  ProjectItem,
  ExperienceItem,
  SkillCategory
};
