/**
 * Teacher Login Screen - SRMUS Live
 * Staff & Faculty Portal for BCA Department
 */

export class TeacherLoginScreen {
  constructor({ onLoginSuccess, onBackHome }) {
    this.onLoginSuccess = onLoginSuccess;
    this.onBackHome = onBackHome;
  }

  render() {
    return `
      <div class="screen-teacher-login animate-vertical-slide">
        <!-- Top Navbar with SRMUS Live in Top Left -->
        <header class="top-navbar">
          <div class="brand-corner-left" id="brand-teacher-back" title="Return to SRMUS Live Home">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title">
              <span>SRMUS Live</span>
            </div>
          </div>
          <button class="btn-back" id="btn-teacher-home-top" title="Back to Gateway">
            <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
            <span>Back</span>
          </button>
        </header>

        <div class="login-screen-box">
          <h2 class="login-form-title">Teacher & Faculty Login</h2>
          <p class="login-form-subtitle">Staff portal for attendance marking, assignment evaluations and class records</p>

          <form id="teacher-login-form" onsubmit="return false;">
            <div class="form-group">
              <label for="teacher-id-input" class="form-label">FACULTY ID / STAFF EMP CODE</label>
              <div class="input-wrapper">
                <i data-lucide="briefcase" class="input-icon"></i>
                <input 
                  type="text" 
                  id="teacher-id-input" 
                  class="form-input" 
                  value="SRM-FAC-88219" 
                  placeholder="e.g. SRM-FAC-88219" 
                  required 
                />
              </div>
            </div>

            <div class="form-group">
              <label for="teacher-pass-input" class="form-label">PASSWORD</label>
              <div class="input-wrapper">
                <i data-lucide="lock" class="input-icon"></i>
                <input 
                  type="password" 
                  id="teacher-pass-input" 
                  class="form-input" 
                  value="faculty2026" 
                  placeholder="••••••••" 
                  required 
                />
              </div>
            </div>

            <div style="background: #f1f5f9; border: 1px solid #cbd5e1; border-radius: 8px; padding: 10px 12px; margin-bottom: 14px; font-size: 12px; color: #334155; display: flex; align-items: center; gap: 8px;">
              <i data-lucide="shield-check" style="width: 16px; height: 16px; color: #475569; flex-shrink: 0;"></i>
              <span>Faculty: <strong>Dr. K. Senthil Kumar</strong> (BCA Class Advisor)</span>
            </div>

            <button type="submit" class="btn-primary-action" id="btn-submit-teacher-login" style="background: #0f172a;">
              <span>Sign In as Faculty</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>

            <button type="button" class="btn-back-home" id="btn-teacher-cancel-home">
              <i data-lucide="arrow-left" style="width: 15px; height: 15px;"></i>
              <span>Back to Portal Home</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const form = container.querySelector('#teacher-login-form');
    const submitBtn = container.querySelector('#btn-submit-teacher-login');
    const backBtn = container.querySelector('#btn-teacher-cancel-home');
    const topHomeBtn = container.querySelector('#btn-teacher-home-top');
    const brandLink = container.querySelector('#brand-teacher-back');

    const handleLogin = (e) => {
      if (e) e.preventDefault();
      if (this.onLoginSuccess) {
        this.onLoginSuccess();
      }
    };

    if (form) form.addEventListener('submit', handleLogin);
    if (submitBtn) submitBtn.addEventListener('click', handleLogin);

    if (backBtn && this.onBackHome) backBtn.addEventListener('click', this.onBackHome);
    if (topHomeBtn && this.onBackHome) topHomeBtn.addEventListener('click', this.onBackHome);
    if (brandLink && this.onBackHome) brandLink.addEventListener('click', this.onBackHome);
  }
}
