import fs from 'fs';
import path from 'path';

export interface JobListing {
  sNo: number;
  organization: string;
  position: string;
  skills: string[];
  experience: string;
  package: string;
  applyUrl: string;
  location?: string;
  postedDate?: string;
}

export interface CandidateProfile {
  name: string;
  title: string;
  totalExperience: string;
  email: string;
  phone: string;
  location: string;
  primarySkills: string[];
  targetRoles: string[];
}

export function generateNaukriHtmlReport(
  jobs: JobListing[],
  outputPath: string,
  profileInfo: CandidateProfile
): string {
  const reportsDir = path.dirname(outputPath);
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }

  const generatedAt = new Date().toLocaleString('en-US', {
    dateStyle: 'full',
    timeStyle: 'medium',
  });

  const totalJobs = jobs.length;
  const uniqueCompanies = new Set(jobs.map((j) => j.organization.trim())).size;
  const hyderabadJobs = jobs.filter((j) =>
    (j.location || '').toLowerCase().includes('hyderabad')
  ).length;
  const remoteJobs = jobs.filter((j) =>
    (j.location || '').toLowerCase().includes('remote')
  ).length;

  const rowsHtml = jobs
    .map((job) => {
      const skillsBadges = job.skills
        .slice(0, 8)
        .map(
          (skill) =>
            `<span class="skill-badge">${escapeHtml(skill)}</span>`
        )
        .join(' ');

      const applyButton = job.applyUrl && job.applyUrl !== '#'
        ? `<a href="${escapeHtml(job.applyUrl)}" target="_blank" rel="noopener noreferrer" class="apply-btn">Apply Now &nearr;</a>`
        : `<span class="no-link">Link Unavailable</span>`;

      return `
        <tr class="job-row" data-search="${escapeHtml(
          `${job.organization} ${job.position} ${job.skills.join(' ')} ${job.experience} ${job.location || ''}`
        ).toLowerCase()}">
          <td class="col-sno">${job.sNo}</td>
          <td class="col-org">
            <div class="org-container">
              <div class="org-avatar">${escapeHtml(job.organization.charAt(0).toUpperCase())}</div>
              <div class="org-details">
                <span class="org-name">${escapeHtml(job.organization)}</span>
                ${job.location ? `<span class="org-loc"><i class="loc-icon">&#128205;</i> ${escapeHtml(job.location)}</span>` : ''}
              </div>
            </div>
          </td>
          <td class="col-role">
            <div class="role-title">${escapeHtml(job.position)}</div>
            ${job.postedDate ? `<span class="posted-badge">${escapeHtml(job.postedDate)}</span>` : ''}
          </td>
          <td class="col-skills">
            <div class="skills-container">${skillsBadges}</div>
          </td>
          <td class="col-exp">
            <span class="exp-badge">${escapeHtml(job.experience)}</span>
          </td>
          <td class="col-package">
            <span class="package-badge">${escapeHtml(job.package)}</span>
          </td>
          <td class="col-apply">
            ${applyButton}
          </td>
        </tr>
      `;
    })
    .join('\n');

  const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Naukri Job Matches Report | ${escapeHtml(profileInfo.name)}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-gradient: linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%);
      --card-bg: rgba(30, 41, 59, 0.7);
      --card-border: rgba(255, 255, 255, 0.1);
      --text-main: #f8fafc;
      --text-muted: #94a3b8;
      --primary-accent: #6366f1;
      --primary-glow: #818cf8;
      --secondary-accent: #06b6d4;
      --success-accent: #10b981;
      --warning-accent: #f59e0b;
      --table-header-bg: #1e293b;
      --table-row-hover: rgba(99, 102, 241, 0.12);
      --table-row-alt: rgba(15, 23, 42, 0.4);
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
      background: var(--bg-gradient);
      color: var(--text-main);
      min-height: 100vh;
      padding: 2rem 1.5rem;
      line-height: 1.5;
    }

    .container {
      max-width: 1440px;
      margin: 0 auto;
    }

    /* Header Profile Card */
    .header-card {
      background: var(--card-bg);
      backdrop-filter: blur(16px);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 2rem;
      align-items: center;
    }

    .profile-title-area h1 {
      font-size: 2.2rem;
      font-weight: 800;
      background: linear-gradient(90deg, #38bdf8, #818cf8, #c084fc);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      margin-bottom: 0.5rem;
    }

    .subtitle {
      font-size: 1.05rem;
      color: var(--text-muted);
      margin-bottom: 1.25rem;
    }

    .pills-group {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 0.5rem;
    }

    .prof-pill {
      background: rgba(99, 102, 241, 0.18);
      border: 1px solid rgba(129, 140, 248, 0.3);
      color: #c7d2fe;
      padding: 0.3rem 0.8rem;
      border-radius: 9999px;
      font-size: 0.82rem;
      font-weight: 600;
    }

    .contact-meta {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
      font-size: 0.9rem;
      color: var(--text-muted);
      text-align: right;
    }

    .meta-item strong {
      color: var(--text-main);
    }

    .report-timestamp {
      font-size: 0.8rem;
      color: #64748b;
      margin-top: 0.5rem;
    }

    /* Analytics Dashboard Grid */
    .metrics-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin-bottom: 2rem;
    }

    .metric-card {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 1.25rem;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.25);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .metric-card:hover {
      transform: translateY(-3px);
      border-color: rgba(99, 102, 241, 0.4);
    }

    .metric-label {
      font-size: 0.85rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      font-weight: 600;
      margin-bottom: 0.4rem;
    }

    .metric-value {
      font-size: 1.9rem;
      font-weight: 800;
      color: var(--text-main);
    }

    .metric-val-highlight {
      color: #38bdf8;
    }

    /* Controls & Filter Bar */
    .controls-bar {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 14px;
      padding: 1.25rem 1.5rem;
      margin-bottom: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      align-items: center;
      justify-content: space-between;
    }

    .search-box {
      position: relative;
      flex: 1;
      min-width: 280px;
    }

    .search-input {
      width: 100%;
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid var(--card-border);
      border-radius: 10px;
      padding: 0.75rem 1rem 0.75rem 2.8rem;
      color: var(--text-main);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s ease;
    }

    .search-input:focus {
      border-color: var(--primary-accent);
      box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25);
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-muted);
      font-size: 1.1rem;
    }

    .quick-filters {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }

    .filter-chip {
      background: rgba(15, 23, 42, 0.6);
      border: 1px solid var(--card-border);
      color: var(--text-muted);
      padding: 0.4rem 0.9rem;
      border-radius: 8px;
      font-size: 0.85rem;
      cursor: pointer;
      transition: all 0.2s ease;
      font-weight: 500;
    }

    .filter-chip.active, .filter-chip:hover {
      background: var(--primary-accent);
      color: #ffffff;
      border-color: var(--primary-glow);
    }

    /* Table Component */
    .table-wrapper {
      background: var(--card-bg);
      border: 1px solid var(--card-border);
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 25px 50px rgba(0, 0, 0, 0.45);
    }

    .job-table {
      width: 100%;
      border-collapse: collapse;
      text-align: left;
      font-size: 0.92rem;
    }

    .job-table th {
      background: var(--table-header-bg);
      color: var(--text-muted);
      font-weight: 700;
      text-transform: uppercase;
      font-size: 0.78rem;
      letter-spacing: 0.06em;
      padding: 1.1rem 1.25rem;
      border-bottom: 2px solid var(--card-border);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .job-table td {
      padding: 1.1rem 1.25rem;
      border-bottom: 1px solid var(--card-border);
      vertical-align: middle;
    }

    .job-row:nth-child(even) {
      background: var(--table-row-alt);
    }

    .job-row:hover {
      background: var(--table-row-hover);
    }

    .col-sno {
      font-weight: 700;
      color: #94a3b8;
      width: 60px;
      text-align: center;
    }

    .col-org {
      min-width: 200px;
    }

    .org-container {
      display: flex;
      align-items: center;
      gap: 0.8rem;
    }

    .org-avatar {
      width: 38px;
      height: 38px;
      border-radius: 10px;
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.1rem;
      flex-shrink: 0;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.25);
    }

    .org-details {
      display: flex;
      flex-direction: column;
    }

    .org-name {
      font-weight: 700;
      color: var(--text-main);
      font-size: 0.98rem;
    }

    .org-loc {
      font-size: 0.8rem;
      color: var(--text-muted);
      display: flex;
      align-items: center;
      gap: 0.2rem;
    }

    .col-role {
      min-width: 220px;
    }

    .role-title {
      font-weight: 700;
      color: #38bdf8;
      font-size: 0.98rem;
    }

    .posted-badge {
      display: inline-block;
      font-size: 0.75rem;
      color: #94a3b8;
      margin-top: 0.2rem;
    }

    .col-skills {
      min-width: 260px;
      max-width: 380px;
    }

    .skills-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .skill-badge {
      background: rgba(15, 23, 42, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: #cbd5e1;
      padding: 0.2rem 0.55rem;
      border-radius: 6px;
      font-size: 0.78rem;
      font-weight: 500;
    }

    .col-exp {
      min-width: 110px;
    }

    .exp-badge {
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.3);
      color: #6ee7b7;
      padding: 0.3rem 0.7rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.82rem;
      display: inline-block;
    }

    .col-package {
      min-width: 140px;
    }

    .package-badge {
      background: rgba(245, 158, 11, 0.15);
      border: 1px solid rgba(245, 158, 11, 0.3);
      color: #fcd34d;
      padding: 0.3rem 0.7rem;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.82rem;
      display: inline-block;
    }

    .col-apply {
      min-width: 130px;
      text-align: center;
    }

    .apply-btn {
      display: inline-block;
      background: linear-gradient(135deg, #6366f1, #4f46e5);
      color: #ffffff;
      text-decoration: none;
      padding: 0.55rem 1.1rem;
      border-radius: 8px;
      font-weight: 700;
      font-size: 0.85rem;
      transition: all 0.2s ease;
      box-shadow: 0 4px 12px rgba(99, 102, 241, 0.35);
    }

    .apply-btn:hover {
      background: linear-gradient(135deg, #4f46e5, #4338ca);
      transform: scale(1.04);
      box-shadow: 0 6px 16px rgba(99, 102, 241, 0.5);
    }

    .no-link {
      color: var(--text-muted);
      font-size: 0.8rem;
      font-style: italic;
    }

    .no-results {
      padding: 3rem;
      text-align: center;
      color: var(--text-muted);
      font-size: 1.1rem;
      display: none;
    }

    /* Footer */
    .report-footer {
      margin-top: 2rem;
      text-align: center;
      font-size: 0.85rem;
      color: var(--text-muted);
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Profile & Report Header -->
    <header class="header-card">
      <div class="profile-title-area">
        <h1>Naukri Job Search Co-Pilot Report</h1>
        <div class="subtitle">Tailored Opportunities for <strong>${escapeHtml(profileInfo.name)}</strong> (${escapeHtml(profileInfo.totalExperience)})</div>
        <div class="pills-group">
          ${profileInfo.targetRoles.map((role) => `<span class="prof-pill">${escapeHtml(role)}</span>`).join('')}
        </div>
      </div>
      <div class="contact-meta">
        <div class="meta-item">📍 <strong>${escapeHtml(profileInfo.location)}</strong></div>
        <div class="meta-item">📧 ${escapeHtml(profileInfo.email)}</div>
        <div class="meta-item">📞 ${escapeHtml(profileInfo.phone)}</div>
        <div class="report-timestamp">Generated: ${generatedAt}</div>
      </div>
    </header>

    <!-- Metrics Summary Dashboard -->
    <section class="metrics-grid">
      <div class="metric-card">
        <div class="metric-label">Total Jobs Matched</div>
        <div class="metric-value metric-val-highlight" id="stat-total-jobs">${totalJobs}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Hiring Organizations</div>
        <div class="metric-value">${uniqueCompanies}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Hyderabad Openings</div>
        <div class="metric-value">${hyderabadJobs}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Remote / Hybrid</div>
        <div class="metric-value">${remoteJobs}</div>
      </div>
    </section>

    <!-- Controls Bar -->
    <div class="controls-bar">
      <div class="search-box">
        <span class="search-icon">&#128099;</span>
        <input type="text" id="table-search-input" class="search-input" placeholder="Search by organization, title, skill set, or location..." onkeyup="filterJobsTable()">
      </div>
      <div class="quick-filters">
        <button class="filter-chip active" onclick="setQuickFilter('all', this)">All Jobs (${totalJobs})</button>
        <button class="filter-chip" onclick="setQuickFilter('playwright', this)">Playwright</button>
        <button class="filter-chip" onclick="setQuickFilter('sdet', this)">SDET</button>
        <button class="filter-chip" onclick="setQuickFilter('quality analyst', this)">Quality Analyst</button>
        <button class="filter-chip" onclick="setQuickFilter('hyderabad', this)">Hyderabad</button>
      </div>
    </div>

    <!-- Complete Jobs Table -->
    <main class="table-wrapper">
      <table class="job-table" id="jobs-table">
        <thead>
          <tr>
            <th class="col-sno">S.No</th>
            <th class="col-org">Organization</th>
            <th class="col-role">Current Job Position</th>
            <th class="col-skills">Skill Set</th>
            <th class="col-exp">Experience</th>
            <th class="col-package">Package</th>
            <th class="col-apply">Link to Apply for Job</th>
          </tr>
        </thead>
        <tbody>
          ${rowsHtml}
        </tbody>
      </table>
      <div id="no-results-msg" class="no-results">
        No jobs matching your filter criteria. Try broadening your search query.
      </div>
    </main>

    <footer class="report-footer">
      <p>Report powered by Playwright MCP & Naukri Co-Pilot Agent for Bharath Reddy.</p>
    </footer>
  </div>

  <script>
    function filterJobsTable() {
      const input = document.getElementById('table-search-input');
      const filter = input.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.job-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const text = row.getAttribute('data-search') || '';
        if (text.includes(filter)) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const noResults = document.getElementById('no-results-msg');
      if (visibleCount === 0) {
        noResults.style.display = 'block';
      } else {
        noResults.style.display = 'none';
      }
      document.getElementById('stat-total-jobs').innerText = visibleCount;
    }

    function setQuickFilter(keyword, btnElement) {
      document.querySelectorAll('.filter-chip').forEach(btn => btn.classList.remove('active'));
      btnElement.classList.add('active');

      const input = document.getElementById('table-search-input');
      if (keyword === 'all') {
        input.value = '';
      } else {
        input.value = keyword;
      }
      filterJobsTable();
    }
  </script>
</body>
</html>`;

  fs.writeFileSync(outputPath, htmlContent, 'utf-8');
  return outputPath;
}

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
