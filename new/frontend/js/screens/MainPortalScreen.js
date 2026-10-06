/**
 * SRMUS Live - Main Portal Page
 * Consistent dark theme with slow ambient animations.
 * Features:
 * 1. Top sliding animation of upcoming university events sliding slowly every 3 seconds
 * 2. Dedicated interactive sections:
 *    - ERP LOGIN
 *    - NOTES ASSIGNMENTS
 *    - NOTIFICATIONS
 * 3. 5-6 informative lines about SRM University Sikkim at the end
 */

import { authService } from '../services/authService.js';
import { MOCK_DATA } from '../services/mockData.js';

export class MainPortalScreen {
  constructor({ user, onSignOut, onBack }) {
    this.user = user || authService.getCurrentUser() || MOCK_DATA.student;
    this.onSignOut = onSignOut;
    this.onBack = onBack;
    this.slideInterval = null;
    this.currentSlideIndex = 0;

    // Upcoming University Events for 3-Second Sliding Banner
    this.events = [
      {
        id: 1,
        tag: "ANNUAL CULTURAL FEST",
        title: "MERAKI 2026: Music, Dance & Fashion Gala",
        date: "March 28 – 30, 2026",
        venue: "Valley Auditorium & Main Amphitheatre",
        badgeColor: "#ea580c",
        icon: "sparkles",
        highlight: "Battle of bands, runway fashion show & celebrity artist evening."
      },
      {
        id: 2,
        tag: "DEPARTMENT HACKATHON",
        title: "Himalayan Hackfest 2026: 24-Hr Code Sprint",
        date: "April 10 – 11, 2026",
        venue: "Computing Labs 1 & 2 • BCA Dept",
        badgeColor: "#0284c7",
        icon: "code",
        highlight: "Build groundbreaking AI, Web3 and mobile solutions with cash prizes."
      },
      {
        id: 3,
        tag: "UNIVERSITY SPORTS MEET",
        title: "Inter-Department Badminton & Table Tennis Tournament",
        date: "April 22 – 24, 2026",
        venue: "SRMUS Indoor Sports Complex",
        badgeColor: "#10b981",
        icon: "trophy",
        highlight: "Annual campus championships for men and women singles & doubles."
      },
      {
        id: 4,
        tag: "GUEST KEYNOTE",
        title: "TechSphere: AI & Cloud Computing Seminar",
        date: "May 05, 2026",
        venue: "Seminar Hall 3 • Academic Block",
        badgeColor: "#8b5cf6",
        icon: "cpu",
        highlight: "Industry tech leads talk on distributed systems and generative AI."
      }
    ];

    // Track active modal
    this.activeModal = null; // 'erp' | 'notes-assignments' | 'notifications'
  }

  render() {
    const u = this.user;
    const studentName = u.name || 'ANUP SAPKOTA';
    const regNo = u.student_id || u.reg_no || '25IT102020';

    return `
      <div class="screen-main-portal animate-fade-in">
        <!-- Slow Animated Ambient Background (Consistent with Login) -->
        <div class="dark-ambient-backdrop" aria-hidden="true">
          <div class="ambient-glow-orb glow-orb-cyan"></div>
          <div class="ambient-glow-orb glow-orb-maroon"></div>
          <div class="ambient-glow-orb glow-orb-blue"></div>
          <div class="ambient-subtle-grid"></div>
        </div>

        <!-- Main Scrollable Content -->
        <div class="main-portal-content">
          <!-- Top Navigation Header -->
          <header class="portal-dark-navbar">
            <div class="portal-brand-left" title="SRMUS Live">
              <div class="portal-brand-crest" title="SRM University Sikkim">
                <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
              </div>
              <div class="portal-brand-text">
                <div class="portal-brand-title">SRMUS Live</div>
                <div class="portal-brand-sub">University Portal</div>
              </div>
            </div>

            <div class="portal-nav-actions">
              <button class="btn-back" id="btn-portal-back" title="Back to Gateway" style="color: rgba(255,255,255,0.9); background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.25);">
                <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
                <span>Back</span>
              </button>
              <div class="portal-student-pill">
                <span class="pulse-dot"></span>
                <span class="portal-reg-badge">${regNo}</span>
              </div>
              <button class="portal-btn-signout" id="btn-portal-signout" title="Sign Out">
                <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
                <span>Exit</span>
              </button>
            </div>
          </header>

          <!-- Student Welcome Banner -->
          <div class="portal-welcome-strip">
            <div class="welcome-text-wrap">
              <span class="welcome-greeting">Welcome back,</span>
              <h2 class="welcome-name">${studentName}</h2>
              <span class="welcome-course-tag">BCA • Department of Computer Applications</span>
            </div>
            <div class="welcome-avatar-box">
              <i data-lucide="user-check" style="width: 22px; height: 22px; color: #38bdf8;"></i>
            </div>
          </div>

          <!-- TOP SLIDING ANIMATION: UPCOMING UNIVERSITY EVENTS (Auto 3 Seconds) -->
          <section class="events-carousel-section">
            <div class="carousel-section-header">
              <div class="carousel-header-left">
                <i data-lucide="calendar-days" style="width: 15px; height: 15px; color: #38bdf8;"></i>
                <span class="carousel-title">Upcoming University Events</span>
              </div>
              <div class="carousel-timer-tag">
                <i data-lucide="clock" style="width: 11px; height: 11px;"></i>
                <span>Slides every 3s</span>
              </div>
            </div>

            <!-- Slide Track Wrapper -->
            <div class="events-carousel-viewport" id="events-carousel-viewport">
              <div class="events-carousel-track" id="events-carousel-track">
                ${this.events.map((evt, idx) => `
                  <div class="event-slide-card ${idx === 0 ? 'is-active' : ''}" data-index="${idx}">
                    <div class="event-card-inner">
                      <div class="event-card-top">
                        <span class="event-tag-pill" style="color: ${evt.badgeColor}; background: ${evt.badgeColor}18; border: 1px solid ${evt.badgeColor}40;">
                          <i data-lucide="${evt.icon}" style="width: 11px; height: 11px;"></i>
                          <span>${evt.tag}</span>
                        </span>
                        <span class="event-date-chip">
                          <i data-lucide="calendar" style="width: 11px; height: 11px;"></i>
                          <span>${evt.date}</span>
                        </span>
                      </div>

                      <h3 class="event-card-title">${evt.title}</h3>
                      <p class="event-card-desc">${evt.highlight}</p>

                      <div class="event-card-footer">
                        <div class="event-venue-text">
                          <i data-lucide="map-pin" style="width: 12px; height: 12px; color: #94a3b8;"></i>
                          <span>${evt.venue}</span>
                        </div>
                        <span class="event-slide-number">${idx + 1} / ${this.events.length}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Carousel Pagination Dots -->
            <div class="carousel-dots-container" id="carousel-dots-container">
              ${this.events.map((_, idx) => `
                <button 
                  type="button" 
                  class="carousel-dot ${idx === 0 ? 'active' : ''}" 
                  data-slide="${idx}" 
                  aria-label="Go to slide ${idx + 1}">
                </button>
              `).join('')}
            </div>
          </section>

          <!-- CORE PORTAL SECTIONS: ERP LOGIN, NOTES ASSIGNMENTS, NOTIFICATIONS -->
          <section class="portal-sections-grid">
            
            <!-- SECTION 1: ERP LOGIN -->
            <div class="portal-action-tile tile-erp" id="tile-action-erp" tabindex="0" role="button">
              <div class="tile-icon-bubble bubble-erp">
                <i data-lucide="shield-check" class="tile-lucide-icon"></i>
              </div>
              <div class="tile-content">
                <div class="tile-badge-row">
                  <span class="tile-kicker kicker-erp">University ERP</span>
                  <span class="tile-status-dot green">88% Attendance</span>
                </div>
                <h3 class="tile-title">ERP LOGIN</h3>
                <p class="tile-desc">Access SRM Evarsity student portal, exam hall ticket, attendance tracker & fees.</p>
              </div>
              <div class="tile-arrow-wrap">
                <span class="tile-action-label">Open</span>
                <i data-lucide="chevron-right" class="tile-arrow-icon"></i>
              </div>
            </div>

            <!-- SECTION 2: NOTES ASSIGNMENTS -->
            <div class="portal-action-tile tile-notes-assignments" id="tile-action-notes-assignments" tabindex="0" role="button">
              <div class="tile-icon-bubble bubble-notes">
                <i data-lucide="book-marked" class="tile-lucide-icon"></i>
              </div>
              <div class="tile-content">
                <div class="tile-badge-row">
                  <span class="tile-kicker kicker-notes">Academic Desk</span>
                  <span class="tile-status-dot blue">4 Course Units</span>
                </div>
                <h3 class="tile-title">NOTES ASSIGNMENTS</h3>
                <p class="tile-desc">Download BCA lecture notes, study materials, view active assignments & submit tasks.</p>
              </div>
              <div class="tile-arrow-wrap">
                <span class="tile-action-label">View</span>
                <i data-lucide="chevron-right" class="tile-arrow-icon"></i>
              </div>
            </div>

            <!-- SECTION 3: NOTIFICATIONS -->
            <div class="portal-action-tile tile-notifications" id="tile-action-notifications" tabindex="0" role="button">
              <div class="tile-icon-bubble bubble-notifications">
                <i data-lucide="bell" class="tile-lucide-icon"></i>
              </div>
              <div class="tile-content">
                <div class="tile-badge-row">
                  <span class="tile-kicker kicker-notifications">Live Circulars</span>
                  <span class="tile-status-dot orange">4 New Notices</span>
                </div>
                <h3 class="tile-title">NOTIFICATIONS</h3>
                <p class="tile-desc">Official university circulars, mid-term timetables, fee deadlines & event alerts.</p>
              </div>
              <div class="tile-arrow-wrap">
                <span class="tile-action-label">Read</span>
                <i data-lucide="chevron-right" class="tile-arrow-icon"></i>
              </div>
            </div>

          </section>

          <!-- 5-6 LINES ABOUT SRM UNIVERSITY SIKKIM AT END -->
          <footer class="srm-sikkim-about-card">
            <div class="about-card-header">
              <div class="about-crest-box" title="SRM University Sikkim">
                <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
              </div>
              <div>
                <h4 class="about-card-title">About SRM University Sikkim</h4>
                <p class="about-card-subtitle">5th Mile, Tadong, Gangtok, East Sikkim • 737102</p>
              </div>
            </div>

            <div class="about-lines-container">
              <p class="about-line">
                <span class="about-num">1.</span>
                <span>SRM University Sikkim was established in 2013 under the SRM University, Sikkim Act to impart high-quality, industry-relevant higher education in the serene Eastern Himalayas.</span>
              </p>
              <p class="about-line">
                <span class="about-num">2.</span>
                <span>Situated at 5th Mile Tadong in Gangtok, the campus provides state-of-the-art computer laboratories, advanced research facilities, and an inspiring mountain learning environment.</span>
              </p>
              <p class="about-line">
                <span class="about-num">3.</span>
                <span>The university offers specialized undergraduate, postgraduate, and doctoral degrees in Computer Applications, Information Technology, Management, and Hospitality.</span>
              </p>
              <p class="about-line">
                <span class="about-num">4.</span>
                <span>With an industry-aligned curriculum and experienced faculty mentorship, students gain practical engineering and computing skills to thrive in the global tech landscape.</span>
              </p>
              <p class="about-line">
                <span class="about-num">5.</span>
                <span>Campus life thrives through signature cultural festivals like Meraki, technical hackathons, entrepreneurship summits, sports meets, and mountain treks.</span>
              </p>
              <p class="about-line">
                <span class="about-num">6.</span>
                <span>Recognized by the UGC and accredited with excellence, SRM University Sikkim continues its commitment to academic distinction, innovation, and holistic student growth.</span>
              </p>
            </div>

            <div class="about-card-footer">
              <span>Department of Computer Applications • BCA 2025 - 2028</span>
              <span class="accreditation-pill">UGC Recognized</span>
            </div>
          </footer>
        </div>

        <!-- ================================================================
             INTERACTIVE MODAL SHEETS FOR THE 3 SECTIONS
             ================================================================ -->

        <!-- 1. ERP LOGIN MODAL -->
        <div id="modal-erp-portal" class="dark-modal-overlay" style="display: none;">
          <div class="dark-modal-sheet animate-slide-up">
            <div class="modal-drag-pill"></div>
            <div class="dark-modal-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="tile-icon-bubble bubble-erp" style="width: 36px; height: 36px;">
                  <i data-lucide="shield-check" style="width: 18px; height: 18px; color: #10b981;"></i>
                </div>
                <div>
                  <h3 class="modal-heading">SRM Evarsity ERP Portal</h3>
                  <p class="modal-subheading">Student ID: ${regNo} • Academic Year 2025-26</p>
                </div>
              </div>
              <button class="modal-close-icon" id="btn-close-erp-modal" title="Close">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
              </button>
            </div>

            <div class="dark-modal-body">
              <div class="erp-stats-grid">
                <div class="erp-stat-card">
                  <span class="stat-title">Overall Attendance</span>
                  <div class="stat-value text-emerald">88.0%</div>
                  <span class="stat-badge">Eligible for Exams</span>
                </div>
                <div class="erp-stat-card">
                  <span class="stat-title">Semester CGPA</span>
                  <div class="stat-value text-cyan">8.90</div>
                  <span class="stat-badge">First Class with Distinction</span>
                </div>
              </div>

              <div class="erp-info-list">
                <div class="erp-info-item">
                  <i data-lucide="file-check" style="width: 16px; height: 16px; color: #38bdf8;"></i>
                  <div style="flex: 1;">
                    <strong>Examination Hall Ticket</strong>
                    <span>BCA Even Semester End Exams 2026</span>
                  </div>
                  <button class="btn-erp-mini" id="btn-download-hallticket">Download</button>
                </div>
                <div class="erp-info-item">
                  <i data-lucide="credit-card" style="width: 16px; height: 16px; color: #10b981;"></i>
                  <div style="flex: 1;">
                    <strong>Semester Tuition Fee</strong>
                    <span>Cleared • Receipt: SRM-2026-8812</span>
                  </div>
                  <span class="status-pill-paid">Paid</span>
                </div>
                <div class="erp-info-item">
                  <i data-lucide="calendar" style="width: 16px; height: 16px; color: #f59e0b;"></i>
                  <div style="flex: 1;">
                    <strong>Class Timetable & Schedule</strong>
                    <span>BCA Section A (Room Lab 204)</span>
                  </div>
                  <button class="btn-erp-mini" id="btn-view-timetable">View</button>
                </div>
              </div>

              <button class="btn-erp-external" id="btn-launch-erp-site">
                <i data-lucide="external-link" style="width: 15px; height: 15px;"></i>
                <span>Launch Full SRM Evarsity ERP Portal</span>
              </button>
            </div>
          </div>
        </div>

        <!-- 2. NOTES ASSIGNMENTS MODAL -->
        <div id="modal-notes-assignments" class="dark-modal-overlay" style="display: none;">
          <div class="dark-modal-sheet animate-slide-up">
            <div class="modal-drag-pill"></div>
            <div class="dark-modal-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="tile-icon-bubble bubble-notes" style="width: 36px; height: 36px;">
                  <i data-lucide="book-marked" style="width: 18px; height: 18px; color: #38bdf8;"></i>
                </div>
                <div>
                  <h3 class="modal-heading">Notes & Assignments</h3>
                  <p class="modal-subheading">BCA Even Semester • Dept of Computer Applications</p>
                </div>
              </div>
              <button class="modal-close-icon" id="btn-close-na-modal" title="Close">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
              </button>
            </div>

            <!-- Tab Switcher -->
            <div class="modal-tab-switcher">
              <button class="tab-btn active" id="btn-tab-notes">
                <i data-lucide="file-text" style="width: 13px; height: 13px;"></i>
                <span>Lecture Notes</span>
              </button>
              <button class="tab-btn" id="btn-tab-assignments">
                <i data-lucide="clipboard-list" style="width: 13px; height: 13px;"></i>
                <span>Assignments (4)</span>
              </button>
            </div>

            <div class="dark-modal-body">
              <!-- Tab 1: Notes List -->
              <div id="tab-content-notes" class="tab-panel active">
                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA201</span>
                    <span class="file-size-tag">PDF • 3.8 MB</span>
                  </div>
                  <h4 class="item-title">Data Structures using C++: Stacks, Trees & Graphs</h4>
                  <p class="item-faculty">Prof. S. R. Raman • Department of Computer Applications</p>
                  <button class="btn-download-action" data-item="Data Structures Notes">
                    <i data-lucide="download" style="width: 13px; height: 13px;"></i>
                    <span>Download PDF Notes</span>
                  </button>
                </div>

                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA202</span>
                    <span class="file-size-tag">PDF • 4.2 MB</span>
                  </div>
                  <h4 class="item-title">DBMS: Relational Algebra, SQL Triggers & Indexing</h4>
                  <p class="item-faculty">Dr. V. Meenakshi • Department of Computer Applications</p>
                  <button class="btn-download-action" data-item="DBMS Notes">
                    <i data-lucide="download" style="width: 13px; height: 13px;"></i>
                    <span>Download PDF Notes</span>
                  </button>
                </div>

                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA203</span>
                    <span class="file-size-tag">PDF • 5.6 MB</span>
                  </div>
                  <h4 class="item-title">Web Technologies: ES6 JavaScript & DOM Architecture</h4>
                  <p class="item-faculty">Dr. K. Senthil Kumar • Class Advisor</p>
                  <button class="btn-download-action" data-item="Web Tech Notes">
                    <i data-lucide="download" style="width: 13px; height: 13px;"></i>
                    <span>Download PDF Notes</span>
                  </button>
                </div>

                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA204</span>
                    <span class="file-size-tag">PDF • 2.9 MB</span>
                  </div>
                  <h4 class="item-title">Computer Networks: Subnetting & Routing Protocols</h4>
                  <p class="item-faculty">Prof. Ananya Sen • Department of Computer Applications</p>
                  <button class="btn-download-action" data-item="Computer Networks Notes">
                    <i data-lucide="download" style="width: 13px; height: 13px;"></i>
                    <span>Download PDF Notes</span>
                  </button>
                </div>
              </div>

              <!-- Tab 2: Assignments List -->
              <div id="tab-content-assignments" class="tab-panel" style="display: none;">
                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA201</span>
                    <span class="status-pill-submitted">Submitted • 19/20</span>
                  </div>
                  <h4 class="item-title">Assignment 1: Linked List & Binary Search Trees</h4>
                  <p class="item-faculty">Due: 15 March 2026 • Verified by Faculty</p>
                </div>

                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA202</span>
                    <span class="status-pill-pending">Due: 22 March 2026</span>
                  </div>
                  <h4 class="item-title">Assignment 2: SQL Joins, Normalization & ER Diagrams</h4>
                  <p class="item-faculty">Database Management Systems</p>
                  <button class="btn-upload-action" data-assignment="Assignment 2">
                    <i data-lucide="upload-cloud" style="width: 13px; height: 13px;"></i>
                    <span>Submit Solution (.sql / .pdf)</span>
                  </button>
                </div>

                <div class="academic-item-card">
                  <div class="item-header">
                    <span class="subject-badge">BCA203</span>
                    <span class="status-pill-progress">In Progress</span>
                  </div>
                  <h4 class="item-title">Mini Project: Responsive Student Portal UI</h4>
                  <p class="item-faculty">Due: 30 March 2026 • Web Technologies</p>
                  <button class="btn-upload-action" data-assignment="Web Tech Mini Project">
                    <i data-lucide="code" style="width: 13px; height: 13px;"></i>
                    <span>Submit Project Code / Repo</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. NOTIFICATIONS MODAL -->
        <div id="modal-notifications" class="dark-modal-overlay" style="display: none;">
          <div class="dark-modal-sheet animate-slide-up">
            <div class="modal-drag-pill"></div>
            <div class="dark-modal-header">
              <div style="display: flex; align-items: center; gap: 10px;">
                <div class="tile-icon-bubble bubble-notifications" style="width: 36px; height: 36px;">
                  <i data-lucide="bell" style="width: 18px; height: 18px; color: #f59e0b;"></i>
                </div>
                <div>
                  <h3 class="modal-heading">University Notifications</h3>
                  <p class="modal-subheading">SRM University Sikkim Official Circulars</p>
                </div>
              </div>
              <button class="modal-close-icon" id="btn-close-notif-modal" title="Close">
                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
              </button>
            </div>

            <div class="dark-modal-body">
              <div class="notif-card-item">
                <div class="notif-meta-row">
                  <span class="notif-tag tag-urgent">Urgent</span>
                  <span class="notif-date">14 March 2026</span>
                </div>
                <h4 class="notif-item-title">Even Semester Mid-Term Examination Timetable Released</h4>
                <p class="notif-item-desc">The Office of the Controller of Examinations has published the theory and practical exam schedule for BCA & MCA Even Semester 2026.</p>
              </div>

              <div class="notif-card-item">
                <div class="notif-meta-row">
                  <span class="notif-tag tag-academic">Academic</span>
                  <span class="notif-date">12 March 2026</span>
                </div>
                <h4 class="notif-item-title">Distinguished Guest Lecture: AI in Cloud Environments</h4>
                <p class="notif-item-desc">Special session scheduled on Friday at 2:30 PM in Seminar Hall 3 by Dr. S. Ramanathan. All BCA 2nd semester students are required to attend.</p>
              </div>

              <div class="notif-card-item">
                <div class="notif-meta-row">
                  <span class="notif-tag tag-library">Library</span>
                  <span class="notif-date">10 March 2026</span>
                </div>
                <h4 class="notif-item-title">Central Library Book Renewal & Digital Archive Access</h4>
                <p class="notif-item-desc">IEEE and ACM digital libraries are now accessible from student portal logins across campus Wi-Fi networks.</p>
              </div>

              <div class="notif-card-item">
                <div class="notif-meta-row">
                  <span class="notif-tag tag-fest">MERAKI</span>
                  <span class="notif-date">08 March 2026</span>
                </div>
                <h4 class="notif-item-title">MERAKI 2026 Student Volunteer Registration</h4>
                <p class="notif-item-desc">Student Council is inviting applications for event coordinators, stage management, and technical committee for the annual fest.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    `;
  }

  bindEvents(container) {
    // 1. Setup Back to Gateway
    const backBtn = container.querySelector('#btn-portal-back');
    if (backBtn && this.onBack) {
      backBtn.addEventListener('click', this.onBack);
    }

    // 2. Setup Sign Out
    const signoutBtn = container.querySelector('#btn-portal-signout');
    if (signoutBtn && this.onSignOut) {
      signoutBtn.addEventListener('click', this.onSignOut);
    }

    // 2. Setup 3-Second Auto-Sliding Events Carousel
    this.setupEventsCarousel(container);

    // 3. Setup Interactive Section Modals
    this.setupSectionModals(container);
  }

  setupEventsCarousel(container) {
    const track = container.querySelector('#events-carousel-track');
    const dots = container.querySelectorAll('.carousel-dot');
    if (!track) return;

    const totalSlides = this.events.length;
    this.currentSlideIndex = 0;

    const goToSlide = (index) => {
      this.currentSlideIndex = (index + totalSlides) % totalSlides;
      track.style.transform = `translateX(-${this.currentSlideIndex * 100}%)`;

      // Update dots
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === this.currentSlideIndex);
      });

      // Update slide cards
      const slides = track.querySelectorAll('.event-slide-card');
      slides.forEach((s, idx) => {
        s.classList.toggle('is-active', idx === this.currentSlideIndex);
      });
    };

    // Manual click on dots
    dots.forEach((dot) => {
      dot.addEventListener('click', () => {
        const targetIdx = parseInt(dot.getAttribute('data-slide'), 10) || 0;
        goToSlide(targetIdx);
        restartTimer();
      });
    });

    // Auto-advance sliding animation every 3000ms (3 seconds)
    const startTimer = () => {
      if (this.slideInterval) clearInterval(this.slideInterval);
      this.slideInterval = setInterval(() => {
        goToSlide(this.currentSlideIndex + 1);
      }, 3000);
    };

    const restartTimer = () => {
      if (this.slideInterval) clearInterval(this.slideInterval);
      startTimer();
    };

    startTimer();
  }

  setupSectionModals(container) {
    // ERP Modal Elements
    const tileErp = container.querySelector('#tile-action-erp');
    const modalErp = container.querySelector('#modal-erp-portal');
    const closeErpBtn = container.querySelector('#btn-close-erp-modal');
    const launchErpBtn = container.querySelector('#btn-launch-erp-site');
    const downloadHallticketBtn = container.querySelector('#btn-download-hallticket');
    const viewTimetableBtn = container.querySelector('#btn-view-timetable');

    // Notes Assignments Modal Elements
    const tileNA = container.querySelector('#tile-action-notes-assignments');
    const modalNA = container.querySelector('#modal-notes-assignments');
    const closeNABtn = container.querySelector('#btn-close-na-modal');
    const tabNotesBtn = container.querySelector('#btn-tab-notes');
    const tabAssignmentsBtn = container.querySelector('#btn-tab-assignments');
    const tabContentNotes = container.querySelector('#tab-content-notes');
    const tabContentAssignments = container.querySelector('#tab-content-assignments');
    const downloadBtns = container.querySelectorAll('.btn-download-action');
    const uploadBtns = container.querySelectorAll('.btn-upload-action');

    // Notifications Modal Elements
    const tileNotif = container.querySelector('#tile-action-notifications');
    const modalNotif = container.querySelector('#modal-notifications');
    const closeNotifBtn = container.querySelector('#btn-close-notif-modal');

    // Helper functions for showing/hiding modals
    const openModal = (modal) => {
      if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      }
    };

    const closeModal = (modal) => {
      if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
      }
    };

    // ERP Click Handlers
    if (tileErp) tileErp.addEventListener('click', () => openModal(modalErp));
    if (closeErpBtn) closeErpBtn.addEventListener('click', () => closeModal(modalErp));
    if (modalErp) {
      modalErp.addEventListener('click', (e) => {
        if (e.target === modalErp) closeModal(modalErp);
      });
    }

    if (launchErpBtn) {
      launchErpBtn.addEventListener('click', () => {
        window.open('https://evarsity.srmist.edu.in/srmvei/', '_blank');
      });
    }

    if (downloadHallticketBtn) {
      downloadHallticketBtn.addEventListener('click', () => {
        this.triggerToast('📥 Downloading BCA Semester 2 Exam Hall Ticket...');
      });
    }

    if (viewTimetableBtn) {
      viewTimetableBtn.addEventListener('click', () => {
        this.triggerToast('📅 BCA-A Class Schedule: Mon-Fri 09:00 AM - 04:30 PM');
      });
    }

    // Notes & Assignments Click Handlers
    if (tileNA) tileNA.addEventListener('click', () => openModal(modalNA));
    if (closeNABtn) closeNABtn.addEventListener('click', () => closeModal(modalNA));
    if (modalNA) {
      modalNA.addEventListener('click', (e) => {
        if (e.target === modalNA) closeModal(modalNA);
      });
    }

    if (tabNotesBtn && tabAssignmentsBtn) {
      tabNotesBtn.addEventListener('click', () => {
        tabNotesBtn.classList.add('active');
        tabAssignmentsBtn.classList.remove('active');
        if (tabContentNotes) tabContentNotes.style.display = 'block';
        if (tabContentAssignments) tabContentAssignments.style.display = 'none';
      });

      tabAssignmentsBtn.addEventListener('click', () => {
        tabAssignmentsBtn.classList.add('active');
        tabNotesBtn.classList.remove('active');
        if (tabContentAssignments) tabContentAssignments.style.display = 'block';
        if (tabContentNotes) tabContentNotes.style.display = 'none';
      });
    }

    downloadBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const item = btn.getAttribute('data-item') || 'PDF Notes';
        this.triggerToast(`📥 Downloading ${item}...`);
      });
    });

    uploadBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const asg = btn.getAttribute('data-assignment') || 'Assignment';
        this.triggerToast(`📤 Upload dialog opened for ${asg}. Solution submitted!`);
      });
    });

    // Notifications Click Handlers
    if (tileNotif) tileNotif.addEventListener('click', () => openModal(modalNotif));
    if (closeNotifBtn) closeNotifBtn.addEventListener('click', () => closeModal(modalNotif));
    if (modalNotif) {
      modalNotif.addEventListener('click', (e) => {
        if (e.target === modalNotif) closeModal(modalNotif);
      });
    }
  }

  triggerToast(msg) {
    const container = document.getElementById('app-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast-message success';
    toast.textContent = msg;
    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }

  destroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
      this.slideInterval = null;
    }
  }
}
