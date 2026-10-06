/**
 * SRM US Live - Role Gateway Screen
 * Dedicated screen featuring ONLY 3 sections in a horizontal line:
 * [ Student ]  [ Teacher ]  [ Other ]
 * Powered by slow wavy color animations matching the university theme.
 */

import { authService } from '../services/authService.js';

export class RoleGatewayScreen {
  constructor({ onSelectRole, onNavigate }) {
    this.onSelectRole = onSelectRole;
    this.onNavigate = onNavigate;
    this.currentUser = authService.getCurrentUser();
    this.isOtherModalOpen = false;
  }

  render() {
    const u = this.currentUser;

    return `
      <div class="screen-role-gateway animate-fade-in">
        <!-- Slow Wavy Color Animated Background Canvas -->
        <div class="wavy-bg-canvas" aria-hidden="true">
          <!-- Ambient gradient color blur orbs -->
          <div class="wavy-orb wavy-orb-1"></div>
          <div class="wavy-orb wavy-orb-2"></div>
          <div class="wavy-orb wavy-orb-3"></div>
          <div class="wavy-orb wavy-orb-4"></div>

          <!-- Multi-layered slow wavy SVG paths -->
          <svg class="wavy-svg-layer wave-layer-back" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path class="wave-path wave-path-1" d="M0,192L48,208C96,224,192,256,288,245.3C384,235,480,181,576,181.3C672,181,768,235,864,245.3C960,256,1056,224,1152,192C1248,160,1344,128,1392,112L1440,96L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z"></path>
          </svg>

          <svg class="wavy-svg-layer wave-layer-middle" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path class="wave-path wave-path-2" d="M0,128L48,149.3C96,171,192,213,288,208C384,203,480,149,576,149.3C672,149,768,203,864,224C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z"></path>
          </svg>

          <svg class="wavy-svg-layer wave-layer-front" viewBox="0 0 1440 600" preserveAspectRatio="none">
            <path class="wave-path wave-path-3" d="M0,256L48,245.3C96,235,192,213,288,218.7C384,224,480,256,576,266.7C672,277,768,267,864,240C960,213,1056,171,1152,165.3C1248,160,1344,192,1392,208L1440,224L1440,600L1392,600C1344,600,1248,600,1152,600C1056,600,960,600,864,600C768,600,672,600,576,600C480,600,384,600,288,600C192,600,96,600,48,600L0,600Z"></path>
          </svg>
        </div>

        <!-- Foreground Content Wrapper -->
        <div class="gateway-content-wrap">
          <!-- Top Header Brand -->
          <header class="gateway-top-bar">
            <div class="brand-corner-left" title="SRMUS Live">
              <div class="brand-crest-box">
                <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
              </div>
              <div class="brand-name-title">
                <span>SRMUS Live</span>
                <span class="brand-live-tag">Online</span>
              </div>
            </div>

            ${u ? `
              <div class="gateway-logged-pill" title="Active Session">
                <i data-lucide="check-circle" style="width: 12px; height: 12px; color: #10b981;"></i>
                <span>${u.name.split(' ')[0]} (${u.role})</span>
              </div>
            ` : `
              <button class="gateway-signin-link" id="btn-gateway-quick-login" title="Sign In Directly">
                <i data-lucide="log-in" style="width: 13px; height: 13px;"></i>
                <span>Sign In</span>
              </button>
            `}
          </header>

          <!-- Gateway Hero Title -->
          <div class="gateway-hero-header">
            <div class="gateway-tagline">
              <i data-lucide="sparkles" style="width: 13px; height: 13px; color: #ea580c;"></i>
              <span>University Portal Gateway</span>
            </div>
            <h1 class="gateway-main-title">Select Your Gateway</h1>
            <p class="gateway-main-desc">
              Choose your role to enter the SRM University Sikkim academic and administrative systems.
            </p>
          </div>

          <!-- THE 3 SECTIONS IN A HORIZONTAL LINE -->
          <div class="horizontal-three-sections-wrapper">
            <div class="horizontal-three-grid">
              
              <!-- 1. STUDENT SECTION -->
              <div class="horizontal-role-card role-card-student" id="btn-role-student" tabindex="0" role="button" aria-label="Student Portal">
                <div class="role-card-glow-halo"></div>
                <div class="role-icon-bubble bubble-student">
                  <i data-lucide="user-check" class="role-icon"></i>
                </div>
                <div class="role-card-body">
                  <h2 class="role-card-title">Student</h2>
                  <span class="role-card-badge badge-student-pill">Portal</span>
                  <p class="role-card-caption">BCA Profile & Grades</p>
                </div>
                <div class="role-card-action-cue">
                  <span>Enter</span>
                  <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
                </div>
              </div>

              <!-- 2. TEACHER SECTION -->
              <div class="horizontal-role-card role-card-teacher" id="btn-role-teacher" tabindex="0" role="button" aria-label="Teacher Portal">
                <div class="role-card-glow-halo"></div>
                <div class="role-icon-bubble bubble-teacher">
                  <i data-lucide="graduation-cap" class="role-icon"></i>
                </div>
                <div class="role-card-body">
                  <h2 class="role-card-title">Teacher</h2>
                  <span class="role-card-badge badge-teacher-pill">Faculty</span>
                  <p class="role-card-caption">Advisor & Records</p>
                </div>
                <div class="role-card-action-cue">
                  <span>Enter</span>
                  <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
                </div>
              </div>

              <!-- 3. OTHER SECTION -->
              <div class="horizontal-role-card role-card-other" id="btn-role-other" tabindex="0" role="button" aria-label="Other Services & Guests">
                <div class="role-card-glow-halo"></div>
                <div class="role-icon-bubble bubble-other">
                  <i data-lucide="compass" class="role-icon"></i>
                </div>
                <div class="role-card-body">
                  <h2 class="role-card-title">Other</h2>
                  <span class="role-card-badge badge-other-pill">Public</span>
                  <p class="role-card-caption">Guests & Circulars</p>
                </div>
                <div class="role-card-action-cue">
                  <span>View</span>
                  <i data-lucide="chevron-right" style="width: 12px; height: 12px;"></i>
                </div>
              </div>

            </div>
          </div>

          <!-- Bottom University Badge -->
          <div class="gateway-footer-credit">
            <div class="footer-crest-small">
              <img src="assets/images/srm_logo.jpg" alt="SRM" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <span>SRM University Sikkim • Department of Computer Applications</span>
          </div>
        </div>

        <!-- OTHER / GUEST PORTAL MODAL SHEET -->
        <div id="modal-other-services" class="modal-other-backdrop" style="display: none;">
          <div class="modal-other-sheet animate-slide-up">
            <div class="modal-sheet-handle"></div>
            
            <div class="modal-other-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="role-icon-bubble bubble-other" style="width: 38px; height: 38px;">
                  <i data-lucide="compass" style="width: 18px; height: 18px; color: #0284c7;"></i>
                </div>
                <div>
                  <h3 style="font-size: 16px; font-weight: 800; color: var(--srm-navy); margin: 0;">University Services & Guests</h3>
                  <p style="font-size: 11px; color: var(--srm-muted); margin-top: 2px;">Campus Key Information • Visitors • Enquiries</p>
                </div>
              </div>
              <button class="modal-close-btn" id="btn-close-other-modal" title="Close sheet">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
              </button>
            </div>

            <div class="modal-other-body">
              <!-- Service 1: University Directory & Location -->
              <div class="other-service-tile">
                <div class="other-tile-icon">
                  <i data-lucide="map-pin" style="width: 16px; height: 16px; color: #ea580c;"></i>
                </div>
                <div class="other-tile-text">
                  <strong>Campus Location</strong>
                  <span>5th Mile, Tadong, Gangtok, East Sikkim - 737102</span>
                </div>
              </div>

              <!-- Service 2: Helpline & Admissions -->
              <div class="other-service-tile">
                <div class="other-tile-icon">
                  <i data-lucide="phone-call" style="width: 16px; height: 16px; color: #059669;"></i>
                </div>
                <div class="other-tile-text">
                  <strong>Admissions & Helpdesk</strong>
                  <span>+91 3592 231122 • helpdesk@srmus.edu.in</span>
                </div>
              </div>

              <!-- Service 3: Accreditations -->
              <div class="other-service-tile">
                <div class="other-tile-icon">
                  <i data-lucide="award" style="width: 16px; height: 16px; color: #8a1538;"></i>
                </div>
                <div class="other-tile-text">
                  <strong>Affiliation & Accreditations</strong>
                  <span>UGC Recognized • NAAC Accredited • AIU Member</span>
                </div>
              </div>

              <!-- Service 4: Academic Resources -->
              <div class="other-service-tile">
                <div class="other-tile-icon">
                  <i data-lucide="book-open" style="width: 16px; height: 16px; color: #0284c7;"></i>
                </div>
                <div class="other-tile-text">
                  <strong>Department of Computer Applications</strong>
                  <span>BCA (2025 - 2028) Even Semester Curriculums & Laboratories</span>
                </div>
              </div>

              <div style="margin-top: 14px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <button class="btn-primary-action" id="btn-other-to-login" style="margin-top: 0; padding: 10px 12px; font-size: 12px;">
                  <i data-lucide="log-in" style="width: 14px; height: 14px;"></i>
                  <span>Sign In as User</span>
                </button>
                <button class="btn-back-home" id="btn-other-to-notes" style="margin-top: 0; padding: 10px 12px; font-size: 12px;">
                  <i data-lucide="file-text" style="width: 14px; height: 14px;"></i>
                  <span>Public Notes</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const btnStudent = container.querySelector('#btn-role-student');
    const btnTeacher = container.querySelector('#btn-role-teacher');
    const btnOther = container.querySelector('#btn-role-other');
    const quickLoginBtn = container.querySelector('#btn-gateway-quick-login');

    const modalOther = container.querySelector('#modal-other-services');
    const closeOtherBtn = container.querySelector('#btn-close-other-modal');
    const otherLoginBtn = container.querySelector('#btn-other-to-login');
    const otherNotesBtn = container.querySelector('#btn-other-to-notes');

    // Student selection
    if (btnStudent) {
      btnStudent.addEventListener('click', () => {
        if (this.currentUser && this.currentUser.role === 'student') {
          this.onNavigate('home');
        } else {
          this.onNavigate('student-login');
        }
      });
    }

    // Teacher selection
    if (btnTeacher) {
      btnTeacher.addEventListener('click', () => {
        if (this.currentUser && this.currentUser.role === 'teacher') {
          this.onNavigate('teacher-portal');
        } else {
          if (this.onSelectRole) {
            this.onSelectRole('teacher');
          } else {
            this.onNavigate('login');
          }
        }
      });
    }

    // Other selection -> Opens Bottom Modal Sheet
    if (btnOther) {
      btnOther.addEventListener('click', () => {
        if (modalOther) {
          modalOther.style.display = 'flex';
          if (window.lucide) window.lucide.createIcons();
        }
      });
    }

    // Close Other Modal
    if (closeOtherBtn && modalOther) {
      closeOtherBtn.addEventListener('click', () => {
        modalOther.style.display = 'none';
      });
    }
    if (modalOther) {
      modalOther.addEventListener('click', (e) => {
        if (e.target === modalOther) {
          modalOther.style.display = 'none';
        }
      });
    }

    if (otherLoginBtn) {
      otherLoginBtn.addEventListener('click', () => {
        if (modalOther) modalOther.style.display = 'none';
        this.onNavigate('login');
      });
    }

    if (otherNotesBtn) {
      otherNotesBtn.addEventListener('click', () => {
        if (modalOther) modalOther.style.display = 'none';
        this.onNavigate('notes');
      });
    }

    if (quickLoginBtn) {
      quickLoginBtn.addEventListener('click', () => {
        this.onNavigate('student-login');
      });
    }
  }
}
