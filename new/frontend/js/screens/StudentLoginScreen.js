/**
 * SRMUS Live - Student Login Screen
 * Theme: Bright Minimal Gradient Theme matching First Interface (Gateway Screen)
 * Strict Authentication:
 * - REGISTRATION NO: 25IT102020
 * - PASSWORD: 26022007
 * Features slow wavy ambient background, minimal glassmorphism card,
 * and campus fun highlights in small text at the bottom.
 */

import { authService } from '../services/authService.js';

export class StudentLoginScreen {
  constructor({ onLoginSuccess, onBackGateway }) {
    this.onLoginSuccess = onLoginSuccess;
    this.onBackGateway = onBackGateway;
  }

  render() {
    return `
      <div class="screen-student-bright-login animate-fade-in">
        <!-- Slow Wavy Ambient Background Canvas (Matching First Interface) -->
        <div class="wavy-bg-canvas" aria-hidden="true">
          <div class="wavy-orb wavy-orb-1"></div>
          <div class="wavy-orb wavy-orb-2"></div>
          <div class="wavy-orb wavy-orb-3"></div>
          <div class="wavy-orb wavy-orb-4"></div>
        </div>

        <!-- Foreground Minimal Content Container -->
        <div class="bright-login-content">
          <!-- Minimal Top Navigation Bar -->
          <header class="bright-top-nav">
            <div class="brand-corner-left" id="btn-login-brand-home" title="SRMUS Live">
              <div class="brand-crest-box">
                <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
              </div>
              <div class="brand-name-title">
                <span>SRMUS Live</span>
                <span class="brand-live-tag">Online</span>
              </div>
            </div>

            ${this.onBackGateway ? `
              <button class="nav-home-btn" id="btn-login-back-gateway" title="Back to Gateways">
                <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
                <span>Back</span>
              </button>
            ` : ''}
          </header>

          <!-- Minimal Center Card -->
          <div class="bright-card-wrapper">
            <div class="bright-login-glass-card">
              <!-- Header -->
              <div class="bright-card-header">
                <div class="role-icon-bubble bubble-student" style="width: 44px; height: 44px; margin-bottom: 12px;">
                  <i data-lucide="user-check" style="width: 22px; height: 22px; color: #ea580c;"></i>
                </div>
                <h1 class="bright-login-heading">Student Login</h1>
                <p class="bright-login-subheading">Enter your official university registration credentials</p>
              </div>

              <!-- Error Alert Message -->
              <div id="student-login-error" class="bright-error-banner" style="display: none;">
                <i data-lucide="alert-triangle" style="width: 16px; height: 16px; flex-shrink: 0; color: #dc2626;"></i>
                <span id="student-error-text">Invalid Registration No or Password.</span>
              </div>

              <!-- Minimal Login Form -->
              <form id="form-bright-student-login" class="bright-login-form" onsubmit="return false;" autocomplete="off">
                <!-- 1. REGISTRATION NO -->
                <div class="bright-form-group">
                  <label for="input-bright-reg" class="bright-form-label">REGISTRATION NO</label>
                  <div class="bright-input-box">
                    <i data-lucide="id-card" class="bright-input-icon"></i>
                    <input 
                      type="text" 
                      id="input-bright-reg" 
                      class="bright-form-input" 
                      placeholder="e.g. 25IT102020" 
                      autocomplete="off"
                      spellcheck="false"
                      required 
                    />
                  </div>
                </div>

                <!-- 2. PASSWORD -->
                <div class="bright-form-group">
                  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
                    <label for="input-bright-pass" class="bright-form-label" style="margin-bottom: 0;">PASSWORD</label>
                    <span style="font-size: 10.5px; color: var(--srm-muted);">Format: DDMMYYYY</span>
                  </div>
                  <div class="bright-input-box">
                    <i data-lucide="lock" class="bright-input-icon"></i>
                    <input 
                      type="password" 
                      id="input-bright-pass" 
                      class="bright-form-input" 
                      placeholder="••••••••" 
                      autocomplete="current-password"
                      required 
                    />
                    <button 
                      type="button" 
                      id="btn-toggle-bright-pass" 
                      class="bright-btn-eye" 
                      title="Show / Hide Password"
                      aria-label="Toggle password visibility"
                    >
                      <i data-lucide="eye" id="bright-eye-icon" style="width: 15px; height: 15px;"></i>
                    </button>
                  </div>
                </div>

                <!-- Submit Button -->
                <button type="submit" class="btn-primary-action" id="btn-bright-login-submit" style="margin-top: 16px; width: 100%; height: 46px;">
                  <span id="btn-bright-submit-text">Enter Portal</span>
                  <i data-lucide="arrow-right" style="width: 15px; height: 15px;"></i>
                </button>
              </form>
            </div>

            <!-- Small Campus Fun Things in Small Text at Bottom -->
            <div class="bright-campus-fun-footer">
              <i data-lucide="sparkles" class="fun-sparkle-icon" style="width: 13px; height: 13px;"></i>
              <p class="fun-footer-text">
                Campus fun & vibrant life: Meraki annual cultural fest, Himalayan treks & trail walks, 24-hr coding hackathons, photography club, esports tourneys & acoustic music nights under Sikkim stars.
              </p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const form = container.querySelector('#form-bright-student-login');
    const regInput = container.querySelector('#input-bright-reg');
    const passInput = container.querySelector('#input-bright-pass');
    const submitBtn = container.querySelector('#btn-bright-login-submit');
    const submitText = container.querySelector('#btn-bright-submit-text');
    const errorBanner = container.querySelector('#student-login-error');
    const errorText = container.querySelector('#student-error-text');
    const togglePassBtn = container.querySelector('#btn-toggle-bright-pass');
    const eyeIcon = container.querySelector('#bright-eye-icon');
    const backBtn = container.querySelector('#btn-login-back-gateway');
    const brandBtn = container.querySelector('#btn-login-brand-home');

    // Auto-focus registration number input
    if (regInput) {
      setTimeout(() => regInput.focus(), 150);
    }

    // Toggle Password Visibility
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

    // Handle Authentication Submission
    const handleLogin = (e) => {
      if (e) e.preventDefault();
      const reg = (regInput?.value || '').trim();
      const pass = (passInput?.value || '').trim();

      // Clear previous error
      if (errorBanner) errorBanner.style.display = 'none';

      if (!reg || !pass) {
        showError('Please enter both REGISTRATION NO and PASSWORD.');
        return;
      }

      // Check strictly against 25IT102020 and 26022007
      if (reg.toUpperCase() !== '25IT102020' || pass !== '26022007') {
        showError('Access Denied. Only Registration No: 25IT102020 and Password: 26022007 are authorized.');
        return;
      }

      // Submit loading state
      if (submitBtn) submitBtn.disabled = true;
      if (submitText) submitText.textContent = 'Verifying...';

      try {
        const user = authService.login(reg, pass);
        if (submitText) submitText.textContent = 'Welcome, Anup!';
        
        setTimeout(() => {
          if (this.onLoginSuccess) {
            this.onLoginSuccess(user);
          }
        }, 250);
      } catch (err) {
        if (submitBtn) submitBtn.disabled = false;
        if (submitText) submitText.textContent = 'Enter Portal';
        showError(err.message || 'Login failed. Please try again.');
      }
    };

    const showError = (msg) => {
      if (errorBanner && errorText) {
        errorText.textContent = msg;
        errorBanner.style.display = 'flex';
        errorBanner.classList.remove('animate-shake');
        void errorBanner.offsetWidth; // trigger reflow
        errorBanner.classList.add('animate-shake');
      }
    };

    if (form) form.addEventListener('submit', handleLogin);
    if (submitBtn) submitBtn.addEventListener('click', handleLogin);

    if (backBtn && this.onBackGateway) {
      backBtn.addEventListener('click', this.onBackGateway);
    }
    if (brandBtn && this.onBackGateway) {
      brandBtn.addEventListener('click', this.onBackGateway);
    }
  }
}
