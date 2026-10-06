/**
 * Teacher Portal Screen - SRMUS Live
 * Displays Faculty dashboard for Department of Computer Applications (BCA)
 */

export class TeacherPortalScreen {
  constructor({ faculty, onSignOut, onNavigate }) {
    this.faculty = faculty || {
      name: 'Dr. K. Senthil Kumar',
      designation: 'BCA Class Advisor & Assistant Professor',
      department: 'Dept. of Computer Applications • BCA (2025 - 2028)'
    };
    this.onSignOut = onSignOut;
    this.onNavigate = onNavigate;
  }

  render() {
    const f = this.faculty;

    return `
      <div class="screen-teacher-portal animate-fade-in">
        <!-- Top Navbar with SRMUS Live in Top Left -->
        <header class="top-navbar">
          <div class="brand-corner-left" id="brand-fac-home" title="Return to SRMUS Live Home">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title" style="color: #0f172a;">
              <span>SRMUS Live</span>
              <span class="brand-live-tag" style="background: #e2e8f0; color: #334155; border-color: #cbd5e1;">Faculty</span>
            </div>
          </div>
          <button class="btn-back" id="btn-fac-back" title="Back to Gateway">
            <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
            <span>Back</span>
          </button>
          <button class="nav-home-btn" id="btn-fac-signout" title="Sign Out">
            <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            <span>Sign Out</span>
          </button>
        </header>

        <!-- Faculty Welcome Card -->
        <div style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%); color: white; border-radius: 18px; padding: 18px; margin-bottom: 16px;">
          <div style="font-size: 11px; color: #94a3b8; text-transform: uppercase; font-weight: 700;">Faculty Advisor Portal</div>
          <h2 style="font-size: 18px; font-weight: 800; margin-top: 2px;">${f.name}</h2>
          <p style="font-size: 12px; color: #cbd5e1;">${f.department || 'Dept. of Computer Applications • BCA (2025 - 2028)'}</p>
        </div>

        <!-- Class Quick Stats -->
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 16px;">
          <div style="background: white; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; color: var(--srm-muted); font-weight: 700; text-transform: uppercase;">Total Students</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--srm-navy);">64</div>
          </div>
          <div style="background: white; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; color: var(--srm-muted); font-weight: 700; text-transform: uppercase;">Class Avg.</div>
            <div style="font-size: 18px; font-weight: 800; color: #059669;">86.4%</div>
          </div>
          <div style="background: white; border: 1px solid var(--border-light); border-radius: 12px; padding: 12px; text-align: center;">
            <div style="font-size: 10px; color: var(--srm-muted); font-weight: 700; text-transform: uppercase;">Active Tasks</div>
            <div style="font-size: 18px; font-weight: 800; color: #d97706;">4</div>
          </div>
        </div>

        <!-- Student Roster Preview -->
        <div class="info-breakdown-card">
          <div class="info-card-heading">
            <i data-lucide="users" style="width: 16px; height: 16px; color: #0f172a;"></i>
            <span>BCA Section A - Enrolled Students</span>
          </div>

          <div class="info-grid-list">
            <div class="info-grid-row" style="background: #f8fafc; padding: 8px 10px; border-radius: 8px;">
              <div>
                <strong style="color: var(--srm-navy); font-size: 13px;">ANUP SAPKOTA</strong>
                <div style="font-size: 11px; color: var(--srm-muted);">RA2511003010089 • Roll 24</div>
              </div>
              <div style="text-align: right;">
                <span style="background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">85% Attd</span>
                <div style="font-size: 11px; color: #d97706; font-weight: 700; margin-top: 2px;">CGPA: 8.7</div>
              </div>
            </div>

            <div class="info-grid-row" style="padding: 8px 10px;">
              <div>
                <strong style="color: var(--srm-navy); font-size: 13px;">Priya Sundaram</strong>
                <div style="font-size: 11px; color: var(--srm-muted);">RA2511003010090 • Roll 25</div>
              </div>
              <div style="text-align: right;">
                <span style="background: #d1fae5; color: #065f46; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">88% Attd</span>
                <div style="font-size: 11px; color: #d97706; font-weight: 700; margin-top: 2px;">CGPA: 8.9</div>
              </div>
            </div>

            <div class="info-grid-row" style="padding: 8px 10px;">
              <div>
                <strong style="color: var(--srm-navy); font-size: 13px;">Rahul Verma</strong>
                <div style="font-size: 11px; color: var(--srm-muted);">RA2511003010091 • Roll 26</div>
              </div>
              <div style="text-align: right;">
                <span style="background: #fef3c7; color: #b45309; font-size: 11px; font-weight: 800; padding: 2px 7px; border-radius: 4px;">81% Attd</span>
                <div style="font-size: 11px; color: #d97706; font-weight: 700; margin-top: 2px;">CGPA: 8.3</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  bindEvents(container) {
    const signoutBtn = container.querySelector('#btn-fac-signout');
    const backBtn = container.querySelector('#btn-fac-back');
    const brandLink = container.querySelector('#brand-fac-home');

    if (backBtn && this.onNavigate) backBtn.addEventListener('click', () => this.onNavigate('gateway'));
    if (signoutBtn && this.onSignOut) signoutBtn.addEventListener('click', this.onSignOut);
    if (brandLink && this.onNavigate) brandLink.addEventListener('click', () => this.onNavigate('gateway'));
  }
}
