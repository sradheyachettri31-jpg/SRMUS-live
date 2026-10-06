/**
 * SRM US Live - Profile Setup Screen
 * Displayed when user logs in with an incomplete profile (profileCompleted = false).
 * Collects required university profile information and transitions user to their dashboard.
 */

import { authService } from '../services/authService.js';

export class ProfileSetupScreen {
  constructor({ user, onSetupComplete, onSignOut, onBack }) {
    this.user = user || authService.getCurrentUser() || {};
    this.onSetupComplete = onSetupComplete;
    this.onSignOut = onSignOut;
    this.onBack = onBack;
  }

  render() {
    const u = this.user;
    const isTeacher = u.role === 'teacher';

    return `
      <div class="screen-profile-setup animate-vertical-slide">
        <!-- Top Navbar -->
        <header class="top-navbar">
          <div class="brand-corner-left" title="SRMUS Live">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title">
              <span>SRMUS Live</span>
            </div>
          </div>
          <button class="btn-back" id="btn-setup-back" title="Go Back">
            <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
            <span>Back</span>
          </button>
          <button class="nav-home-btn" id="btn-setup-signout" title="Sign Out">
            <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            <span>Sign Out</span>
          </button>
        </header>

        <div class="profile-setup-container">
          <!-- Setup Header & Progress -->
          <div class="setup-header-card">
            <div class="setup-step-pill">
              <i data-lucide="sparkles" style="width: 13px; height: 13px; color: #f59e0b;"></i>
              <span>First-Time Setup Required</span>
            </div>
            <h1 class="setup-title">Complete Your Profile</h1>
            <p class="setup-subtitle">
              Welcome to SRMUS Live! Please confirm your academic profile details to access your dashboard.
            </p>

            <!-- Completion Tracker -->
            <div class="setup-progress-bar-wrap">
              <div class="setup-progress-labels">
                <span>Profile Completion</span>
                <span class="setup-pct-text">65%</span>
              </div>
              <div class="setup-progress-track">
                <div class="setup-progress-fill" style="width: 65%;"></div>
              </div>
            </div>
          </div>

          <!-- Profile Setup Form -->
          <form id="form-profile-setup" class="setup-form-box" onsubmit="return false;">
            <!-- Full Name -->
            <div class="form-group">
              <label for="setup-name-input" class="form-label">Full Name *</label>
              <div class="input-wrapper">
                <i data-lucide="user" class="input-icon"></i>
                <input 
                  type="text" 
                  id="setup-name-input" 
                  class="form-input" 
                  value="${u.name || ''}" 
                  placeholder="e.g. Suman Shrestha" 
                  required 
                />
              </div>
            </div>

            <!-- University ID (Readonly) -->
            <div class="form-group">
              <label for="setup-id-input" class="form-label">University ID / Registration No</label>
              <div class="input-wrapper">
                <i data-lucide="id-card" class="input-icon"></i>
                <input 
                  type="text" 
                  id="setup-id-input" 
                  class="form-input" 
                  value="${u.student_id || u.faculty_id || ''}" 
                  readonly 
                  style="background: #f1f5f9; cursor: not-allowed;" 
                />
              </div>
            </div>

            <!-- Program / Course -->
            <div class="form-group">
              <label for="setup-course-input" class="form-label">${isTeacher ? 'Assigned Department' : 'Degree & Course'} *</label>
              <div class="input-wrapper">
                <i data-lucide="book-open" class="input-icon"></i>
                <input 
                  type="text" 
                  id="setup-course-input" 
                  class="form-input" 
                  value="${u.course || 'BCA'}" 
                  placeholder="e.g. BCA (Bachelor of Computer Applications)" 
                  required 
                />
              </div>
            </div>

            <!-- Semester & Batch Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label for="setup-semester-select" class="form-label">${isTeacher ? 'Class Batch' : 'Current Semester'} *</label>
                <div class="input-wrapper">
                  <i data-lucide="calendar" class="input-icon"></i>
                  <select id="setup-semester-select" class="form-input" style="padding-left: 36px; -webkit-appearance: none;">
                    <option value="1" ${u.semester == 1 ? 'selected' : ''}>1st Semester</option>
                    <option value="2" ${u.semester == 2 ? 'selected' : ''}>2nd Semester</option>
                    <option value="3" ${u.semester == 3 ? 'selected' : ''}>3rd Semester</option>
                    <option value="4" ${u.semester == 4 ? 'selected' : ''}>4th Semester</option>
                    <option value="5" ${u.semester == 5 ? 'selected' : ''}>5th Semester</option>
                    <option value="6" ${u.semester == 6 ? 'selected' : ''}>6th Semester</option>
                  </select>
                </div>
              </div>

              <div class="form-group">
                <label for="setup-batch-input" class="form-label">Academic Batch *</label>
                <div class="input-wrapper">
                  <i data-lucide="award" class="input-icon"></i>
                  <input 
                    type="text" 
                    id="setup-batch-input" 
                    class="form-input" 
                    value="${u.batch || '2025 - 2028'}" 
                    placeholder="2025 - 2028" 
                    required 
                  />
                </div>
              </div>
            </div>

            <!-- Date of Birth & Phone Grid -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
              <div class="form-group">
                <label for="setup-dob-input" class="form-label">DOB (DD/MM/YYYY) *</label>
                <div class="input-wrapper">
                  <i data-lucide="calendar-days" class="input-icon"></i>
                  <input 
                    type="text" 
                    id="setup-dob-input" 
                    class="form-input" 
                    value="${u.dob || '15/08/2006'}" 
                    placeholder="DD/MM/YYYY" 
                    required 
                  />
                </div>
              </div>

              <div class="form-group">
                <label for="setup-phone-input" class="form-label">Contact Phone</label>
                <div class="input-wrapper">
                  <i data-lucide="phone" class="input-icon"></i>
                  <input 
                    type="tel" 
                    id="setup-phone-input" 
                    class="form-input" 
                    value="${u.phone || '+91 98123 45678'}" 
                    placeholder="+91 98000 00000" 
                  />
                </div>
              </div>
            </div>

            <!-- Department Section -->
            <div class="form-group">
              <label for="setup-dept-input" class="form-label">Department / School</label>
              <div class="input-wrapper">
                <i data-lucide="building" class="input-icon"></i>
                <input 
                  type="text" 
                  id="setup-dept-input" 
                  class="form-input" 
                  value="${u.department || 'Department of Computer Applications'}" 
                  readonly
                  style="background: #f8fafc;"
                />
              </div>
            </div>

            <!-- Submit Action -->
            <button type="submit" class="btn-primary-action" id="btn-save-profile" style="margin-top: 14px;">
              <i data-lucide="check-circle" style="width: 17px; height: 17px;"></i>
              <span>Save & Complete Profile Setup</span>
            </button>

            <!-- Cancel / Sign Out -->
            <button type="button" class="btn-back-home" id="btn-setup-cancel">
              <i data-lucide="log-out" style="width: 15px; height: 15px;"></i>
              <span>Sign Out and Return Later</span>
            </button>
          </form>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const form = container.querySelector('#form-profile-setup');
    const saveBtn = container.querySelector('#btn-save-profile');
    const signoutTopBtn = container.querySelector('#btn-setup-signout');
    const cancelBtn = container.querySelector('#btn-setup-cancel');

    const handleSave = (e) => {
      if (e) e.preventDefault();

      const nameInput = container.querySelector('#setup-name-input');
      const courseInput = container.querySelector('#setup-course-input');
      const semSelect = container.querySelector('#setup-semester-select');
      const batchInput = container.querySelector('#setup-batch-input');
      const dobInput = container.querySelector('#setup-dob-input');
      const phoneInput = container.querySelector('#setup-phone-input');

      const name = nameInput ? nameInput.value.trim() : '';
      const course = courseInput ? courseInput.value.trim() : '';
      const semester = semSelect ? parseInt(semSelect.value, 10) || 1 : 1;
      const batch = batchInput ? batchInput.value.trim() : '2025 - 2028';
      const dob = dobInput ? dobInput.value.trim() : '';
      const dob_raw = dob.replace(/\D/g, '');
      const phone = phoneInput ? phoneInput.value.trim() : '';

      if (!name) {
        alert('Please provide your Full Name.');
        return;
      }

      const updatedFields = {
        name,
        course,
        semester,
        batch,
        dob,
        dob_raw,
        phone,
        // Set attendance & cgpa defaults if missing
        attendance_rate: this.user.attendance_rate || 82.0,
        cgpa: this.user.cgpa || 8.4
      };

      try {
        const completedUser = authService.completeProfile(updatedFields);
        if (this.onSetupComplete) {
          this.onSetupComplete(completedUser);
        }
      } catch (err) {
        console.error('Error saving profile setup:', err);
      }
    };

    if (form) form.addEventListener('submit', handleSave);
    if (saveBtn) saveBtn.addEventListener('click', handleSave);

    const backNavBtn = container.querySelector('#btn-setup-back');
    if (backNavBtn && this.onBack) {
      backNavBtn.addEventListener('click', this.onBack);
    }

    if (signoutTopBtn && this.onSignOut) {
      signoutTopBtn.addEventListener('click', this.onSignOut);
    }
    if (cancelBtn && this.onSignOut) {
      cancelBtn.addEventListener('click', this.onSignOut);
    }
  }
}
