/**
 * ASSIGNMENT Screen - SRMUS Live
 * Displays BCA Course assignments with status, due dates & marks
 */

export class AssignmentScreen {
  constructor({ assignments = [], onNavigate, onBack }) {
    this.assignments = assignments;
    this.onNavigate = onNavigate;
    this.onBack = onBack;
  }

  handleBack() {
    if (this.onBack) {
      this.onBack();
    } else if (this.onNavigate) {
      this.onNavigate('home');
    }
  }

  render() {
    return `
      <div class="screen-assignments animate-fade-in">
        <!-- Top Navbar with SRMUS Live in Top Left -->
        <header class="top-navbar">
          <div class="brand-corner-left" id="brand-asg-home" title="Return to SRMUS Live Home">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title">
              <span>SRMUS Live</span>
            </div>
          </div>
          <button class="btn-back" id="btn-asg-home" title="Go Back">
            <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
            <span>Back</span>
          </button>
        </header>

        <div style="margin-bottom: 14px;">
          <h2 style="font-size: 19px; font-weight: 800; color: var(--srm-navy);">Course Assignments</h2>
          <p style="font-size: 12px; color: var(--srm-muted);">Department of Computer Applications • BCA 2025-2028</p>
        </div>

        <!-- Assignments List -->
        <div class="assignments-list">
          ${this.assignments.map(asg => `
            <div class="assignment-item-card">
              <div class="asg-top-row">
                <span class="asg-subject-badge">${asg.code}: ${asg.subject}</span>
                <span class="asg-status-badge ${asg.statusClass}">${asg.status}</span>
              </div>
              <h3 class="asg-title">${asg.title}</h3>
              <div class="asg-footer-row">
                <span>📅 Due: <strong>${asg.dueDate}</strong></span>
                <span>Score: <strong>${asg.marks}</strong></span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const homeBtn = container.querySelector('#btn-asg-home');
    const brandLink = container.querySelector('#brand-asg-home');

    if (homeBtn) homeBtn.addEventListener('click', () => this.handleBack());
    if (brandLink) brandLink.addEventListener('click', () => this.handleBack());
  }
}
