/**
 * ResumeRenderer.js
 * Renders finalized customized resume into ATS-friendly Markdown, responsive HTML, and JSON.
 */

class ResumeRenderer {
  /**
   * Render resume to ATS-Compliant Markdown
   * @param {Object} resume
   * @returns {string} Markdown string
   */
  static toMarkdown(resume) {
    const { contact, summary, selectedProjects, selectedExperiences, skills, education, certifications, targetRole, targetCompany } = resume;

    let md = '';
    md += `# ${contact.name || 'Candidate Name'}\n`;
    const contactLine = [
      contact.email,
      contact.phone,
      contact.location,
      contact.linkedin ? `[LinkedIn](${contact.linkedin})` : null,
      contact.github ? `[GitHub](${contact.github})` : null,
      contact.portfolio ? `[Portfolio](${contact.portfolio})` : null
    ].filter(Boolean).join(' | ');
    md += `${contactLine}\n\n`;

    md += `### Target Role: ${targetRole} | ${targetCompany}\n\n`;

    // Summary
    if (summary) {
      md += `## Professional Summary\n`;
      md += `${summary}\n\n`;
    }

    // Technical Skills
    if (skills) {
      md += `## Technical Skills\n`;
      if (skills.languages?.length) md += `- **Languages**: ${skills.languages.join(', ')}\n`;
      if (skills.frameworks?.length) md += `- **Frameworks & Libraries**: ${skills.frameworks.join(', ')}\n`;
      if (skills.cloudAndDevOps?.length) md += `- **Cloud & DevOps**: ${skills.cloudAndDevOps.join(', ')}\n`;
      if (skills.databases?.length) md += `- **Databases & Storage**: ${skills.databases.join(', ')}\n`;
      if (skills.tools?.length) md += `- **Developer Tools**: ${skills.tools.join(', ')}\n`;
      md += `\n`;
    }

    // Experience / Internships
    if (selectedExperiences?.length) {
      md += `## Professional Experience & Internships\n`;
      selectedExperiences.forEach(exp => {
        md += `### ${exp.role} — **${exp.company}**\n`;
        md += `*${exp.location} | ${exp.period}*\n`;
        if (exp.techStack?.length) {
          md += `*Tech Stack: ${exp.techStack.join(', ')}*\n`;
        }
        exp.bullets.forEach(b => {
          md += `- ${b}\n`;
        });
        md += `\n`;
      });
    }

    // Tailored Projects
    if (selectedProjects?.length) {
      md += `## Tailored Technical Projects\n`;
      selectedProjects.forEach(proj => {
        const linkStr = proj.link ? ` ([Link](${proj.link}))` : '';
        md += `### ${proj.title}${linkStr} — *${proj.role}*\n`;
        if (proj.techStack?.length) {
          md += `*Tech Stack: ${proj.techStack.join(', ')}*\n`;
        }
        proj.bullets.forEach(b => {
          md += `- ${b}\n`;
        });
        md += `\n`;
      });
    }

    // Education
    if (education?.length) {
      md += `## Education\n`;
      education.forEach(edu => {
        md += `### ${edu.degree} in ${edu.field} — **${edu.institution}**\n`;
        md += `*Graduation: ${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}*\n`;
        if (edu.honors?.length) {
          md += `- Honors: ${edu.honors.join(', ')}\n`;
        }
        md += `\n`;
      });
    }

    // Certifications
    if (certifications?.length) {
      md += `## Certifications\n`;
      certifications.forEach(cert => {
        md += `- **${cert.name}** — ${cert.issuer} (${cert.date})\n`;
      });
      md += `\n`;
    }

    return md.trim();
  }

  /**
   * Render resume to Modern, Printable HTML/CSS
   * @param {Object} resume
   * @returns {string} HTML string
   */
  static toHtml(resume) {
    const { contact, summary, selectedProjects, selectedExperiences, skills, education, certifications, targetRole, targetCompany } = resume;

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${contact.name || 'Candidate'} - Tailored Resume</title>
  <style>
    @page { margin: 0.5in; size: letter; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      line-height: 1.45;
      margin: 0;
      padding: 24px;
      background: #f8fafc;
    }
    .resume-container {
      max-width: 800px;
      margin: 0 auto;
      background: #ffffff;
      padding: 40px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    header { text-align: center; border-bottom: 2px solid #2563eb; padding-bottom: 16px; margin-bottom: 20px; }
    h1 { margin: 0 0 6px 0; font-size: 26px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
    .contact-links { font-size: 13px; color: #475569; }
    .contact-links a { color: #2563eb; text-decoration: none; }
    .target-tag { display: inline-block; background: #eff6ff; color: #1d4ed8; font-weight: 600; font-size: 12px; padding: 4px 10px; border-radius: 12px; margin-top: 8px; }
    h2 { font-size: 15px; color: #1e40af; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; margin-top: 18px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px; }
    .summary-text { font-size: 13.5px; color: #334155; margin-bottom: 14px; }
    .skills-grid { font-size: 13px; display: grid; gap: 4px; }
    .item-header { display: flex; justify-content: space-between; align-items: baseline; }
    .item-title { font-size: 14px; font-weight: 700; color: #0f172a; }
    .item-company { font-weight: 600; color: #2563eb; }
    .item-meta { font-size: 12px; color: #64748b; font-style: italic; }
    .tech-stack { font-size: 12px; color: #475569; font-weight: 500; margin: 2px 0 6px 0; }
    ul { margin: 4px 0 12px 18px; padding: 0; font-size: 13px; color: #334155; }
    li { margin-bottom: 3px; }
    @media print {
      body { background: #ffffff; padding: 0; }
      .resume-container { box-shadow: none; padding: 0; max-width: 100%; }
    }
  </style>
</head>
<body>
  <div class="resume-container">
    <header>
      <h1>${contact.name || 'Candidate Name'}</h1>
      <div class="contact-links">
        ${[contact.email, contact.phone, contact.location, contact.linkedin ? `<a href="${contact.linkedin}">LinkedIn</a>` : null, contact.github ? `<a href="${contact.github}">GitHub</a>` : null].filter(Boolean).join(' &bull; ')}
      </div>
      <div class="target-tag">Tailored for: ${targetRole} @ ${targetCompany}</div>
    </header>

    ${summary ? `<h2>Professional Summary</h2><p class="summary-text">${summary}</p>` : ''}

    <h2>Technical Skills</h2>
    <div class="skills-grid">
      ${skills.languages?.length ? `<div><strong>Languages:</strong> ${skills.languages.join(', ')}</div>` : ''}
      ${skills.frameworks?.length ? `<div><strong>Frameworks:</strong> ${skills.frameworks.join(', ')}</div>` : ''}
      ${skills.cloudAndDevOps?.length ? `<div><strong>Cloud & DevOps:</strong> ${skills.cloudAndDevOps.join(', ')}</div>` : ''}
      ${skills.databases?.length ? `<div><strong>Databases:</strong> ${skills.databases.join(', ')}</div>` : ''}
      ${skills.tools?.length ? `<div><strong>Tools:</strong> ${skills.tools.join(', ')}</div>` : ''}
    </div>

    ${selectedExperiences?.length ? `
      <h2>Experience & Internships</h2>
      ${selectedExperiences.map(exp => `
        <div style="margin-bottom: 12px;">
          <div class="item-header">
            <span class="item-title">${exp.role} <span class="item-company">&bull; ${exp.company}</span></span>
            <span class="item-meta">${exp.location} | ${exp.period}</span>
          </div>
          ${exp.techStack?.length ? `<div class="tech-stack">Tech: ${exp.techStack.join(', ')}</div>` : ''}
          <ul>${exp.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
      `).join('')}
    ` : ''}

    ${selectedProjects?.length ? `
      <h2>Selected Technical Projects</h2>
      ${selectedProjects.map(proj => `
        <div style="margin-bottom: 12px;">
          <div class="item-header">
            <span class="item-title">${proj.title} <span class="item-meta">(${proj.role})</span></span>
            ${proj.link ? `<span class="item-meta"><a href="${proj.link}">View Project</a></span>` : ''}
          </div>
          ${proj.techStack?.length ? `<div class="tech-stack">Stack: ${proj.techStack.join(', ')}</div>` : ''}
          <ul>${proj.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        </div>
      `).join('')}
    ` : ''}

    ${education?.length ? `
      <h2>Education</h2>
      ${education.map(edu => `
        <div class="item-header" style="margin-bottom: 4px;">
          <span class="item-title">${edu.degree} in ${edu.field} <span class="item-company">&bull; ${edu.institution}</span></span>
          <span class="item-meta">${edu.graduationDate}${edu.gpa ? ` | GPA: ${edu.gpa}` : ''}</span>
        </div>
      `).join('')}
    ` : ''}
  </div>
</body>
</html>`;
  }
}

module.exports = { ResumeRenderer };
