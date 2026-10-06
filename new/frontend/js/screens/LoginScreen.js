/**
 * SRM US Live - Unified University Login Screen
 * ONE Login Screen for both Students and Faculty/Teachers.
 * Uses University ID / Registration No. / Faculty ID / Email + Password.
 */

import { authService } from '../services/authService.js';

export class LoginScreen {
  constructor({ prefilledRole = 'student', onLoginSuccess, onBackToGateway }) {
    this.prefilledRole = prefilledRole;
    this.onLoginSuccess = onLoginSuccess;
    this.onBackToGateway = onBackToGateway;
    this.demoAccounts = authService.getDemoCredentials();
    this.errorMessage = null;

    const defaultAcc = this.demoAccounts.find(a => a.role === prefilledRole) || this.demoAccounts[0];
    this.initialId = defaultAcc ? defaultAcc.id : 'RA2511003010089';
    this.initialPass = defaultAcc ? defaultAcc.password : '26022007';
  }

  render() {
    return `
      <div class="screen-unified-login animate-fade-in">
        <!-- Top University Header -->
        <header class="top-navbar" style="border-bottom: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.9);">
          <div class="brand-corner-left" id="brand-login-header-logo" title="SRMUS Live" style="cursor: pointer;">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title">
              <span>SRMUS Live</span>
              <span class="brand-live-tag">Online</span>
            </div>
          </div>
          <div style="display: flex; align-items: center; gap: 6px;">
            ${this.onBackToGateway ? `
              <button class="nav-home-btn" id="btn-back-gateway" title="View 3 Portals">
                <i data-lucide="layout-grid" style="width: 13px; height: 13px;"></i>
                <span>3 Portals</span>
              </button>
            ` : ''}
            <div style="font-size: 11px; font-weight: 700; color: var(--srm-maroon); background: var(--srm-maroon-soft); border: 1px solid var(--srm-maroon-border); padding: 4px 8px; border-radius: 6px;">
              Secure
            </div>
          </div>
        </header>

        <div class="login-unified-container">
          <!-- University Badge & Portal Banner -->
          <div class="login-unified-header">
            <div class="login-unified-crest" title="SRM University Sikkim">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <h1 class="login-unified-title">University Authentication</h1>
            <p class="login-unified-subtitle">
              Single sign-in gateway for SRM students, faculty members and academic staff.
            </p>
          </div>

          <!-- Error Feedback Container -->
          <div id="login-error-alert" class="login-error-alert" style="display: none;">
            <i data-lucide="alert-circle" style="width: 16px; height: 16px; flex-shrink: 0;"></i>
            <span id="login-error-text"></span>
          </div>

          <!-- Login Form -->
          <form id="form-unified-login" class="login-form-box" onsubmit="return false;">
            <!-- 1. University ID / Email -->
            <div class="form-group">
              <label for="login-id-input" class="form-label">
                <span>University ID / NetID / Email</span>
                <span style="font-size: 11px; color: var(--srm-muted); font-weight: 500;">(Student / Faculty)</span>
              </label>
              <div class="input-wrapper">
                <i data-lucide="user" class="input-icon"></i>
                <input 
                  type="text" 
                  id="login-id-input" 
                  class="form-input" 
                  value="${this.initialId}" 
                  placeholder="e.g. RA2511003010089 or senthil.k@srmist.edu.in" 
                  autocomplete="username"
                  required 
                />
              </div>
            </div>

            <!-- 2. Password -->
            <div class="form-group">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                <label for="login-pass-input" class="form-label" style="margin-bottom: 0;">Password</label>
                <span style="font-size: 11px; color: var(--srm-muted);">DOB (DDMMYYYY) or Password</span>
              </div>
              <div class="input-wrapper" style="position: relative;">
                <i data-lucide="lock" class="input-icon"></i>
                <input 
                  type="password" 
                  id="login-pass-input" 
                  class="form-input" 
                  value="${this.initialPass}" 
                  placeholder="••••••••" 
                  autocomplete="current-password"
                  required 
                />
                <button 
                  type="button" 
                  id="btn-toggle-password" 
                  class="btn-input-accessory" 
                  title="Show/Hide Password"
                  aria-label="Toggle password visibility"
                >
                  <i data-lucide="eye" id="icon-eye" style="width: 15px; height: 15px;"></i>
                </button>
              </div>
            </div>

            <!-- Sign In Submit Button -->
            <button type="submit" class="btn-primary-action" id="btn-login-submit" style="margin-top: 14px;">
              <span id="btn-login-label">Sign In to University Portal</span>
              <i data-lucide="arrow-right" style="width: 16px; height: 16px;"></i>
            </button>
          </form>

          <!-- 1-Click Demo Accounts Quick Selector -->
          <div class="demo-accounts-section">
            <div class="demo-accounts-title">
              <i data-lucide="zap" style="width: 13px; height: 13px; color: #f59e0b;"></i>
              <span>Quick Demo Accounts (1-Click Fill)</span>
            </div>

            <div class="demo-pills-list">
              ${this.demoAccounts.map((acc, i) => `
                <button 
                  type="button" 
                  class="demo-pill-btn ${i === 0 ? 'active-pill' : ''}" 
                  data-acc-id="${acc.id}" 
                  data-acc-pass="${acc.password}"
                  title="Click to fill credentials for ${acc.label}"
                >
                  <div class="demo-pill-info">
                    <span class="demo-pill-name">${acc.label}</span>
                    <span class="demo-pill-cred">${acc.id}</span>
                  </div>
                  <span class="demo-pill-badge ${acc.role === 'teacher' ? 'badge-teacher' : acc.badge === 'Needs Setup' ? 'badge-warning' : 'badge-student'}">
                    ${acc.badge}
                  </span>
                </button>
              `).join('')}
            </div>
          </div>

          <!-- University Security Note -->
          <div class="login-portal-footer">
            <i data-lucide="shield" style="width: 13px; height: 13px; color: var(--srm-muted);"></i>
            <span>SRM Institute of Science and Technology • Single Sign-On</span>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const form = container.querySelector('#form-unified-login');
    const submitBtn = container.querySelector('#btn-login-submit');
    const idInput = container.querySelector('#login-id-input');
    const passInput = container.querySelector('#login-pass-input');
    const togglePassBtn = container.querySelector('#btn-toggle-password');
    const eyeIcon = container.querySelector('#icon-eye');
    const alertBox = container.querySelector('#login-error-alert');
    const alertText = container.querySelector('#login-error-text');

    const showError = (msg) => {
      if (alertBox && alertText) {
        alertText.textContent = msg;
        alertBox.style.display = 'flex';
      }
    };

    const hideError = () => {
      if (alertBox) alertBox.style.display = 'none';
    };

    // Password visibility toggle
    if (togglePassBtn && passInput) {
      togglePassBtn.addEventListener('click', () => {
        const isPassword = passInput.type === 'password';
        passInput.type = isPassword ? 'text' : 'password';
        if (eyeIcon) {
          eyeIcon.setAttribute('data-lucide', isPassword ? 'eye-off' : 'eye');
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    // Demo pill 1-click filler
    const demoPills = container.querySelectorAll('.demo-pill-btn');
    demoPills.forEach(pill => {
      pill.addEventListener('click', () => {
        demoPills.forEach(p => p.classList.remove('active-pill'));
        pill.classList.add('active-pill');

        const accId = pill.getAttribute('data-acc-id');
        const accPass = pill.getAttribute('data-acc-pass');

        if (idInput && accId) idInput.value = accId;
        if (passInput && accPass) passInput.value = accPass;
        hideError();
      });
    });

    // Handle Form Submit
    const handleLogin = (e) => {
      if (e) e.preventDefault();
      hideError();

      const idVal = idInput ? idInput.value.trim() : '';
      const passVal = passInput ? passInput.value.trim() : '';

      if (!idVal || !passVal) {
        showError('Please enter both University ID/Email and Password.');
        return;
      }

      // Visual loading feedback
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
      }

      try {
        const authenticatedUser = authService.login(idVal, passVal);
        if (this.onLoginSuccess) {
          this.onLoginSuccess(authenticatedUser);
        }
      } catch (err) {
        showError(err.message || 'Authentication failed. Please verify your credentials.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.style.opacity = '1';
        }
      }
    };

    if (form) form.addEventListener('submit', handleLogin);
    if (submitBtn) submitBtn.addEventListener('click', handleLogin);

    const backGatewayBtn = container.querySelector('#btn-back-gateway');
    const brandLogo = container.querySelector('#brand-login-header-logo');
    if (backGatewayBtn && this.onBackToGateway) {
      backGatewayBtn.addEventListener('click', this.onBackToGateway);
    }
    if (brandLogo && this.onBackToGateway) {
      brandLogo.addEventListener('click', this.onBackToGateway);
    }
  }
}
