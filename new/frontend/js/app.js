/**
 * SRMUS Live - Main Application Controller & Router
 * Core Sections:
 * 1. Role Gateway Screen (3 horizontal sections: Student, Teacher, Other with slow wavy animations)
 * 2. Authentication & Persistent Login System
 * 3. Profile Setup Completion Verification
 * 4. Dashboards (Student Details, Teacher Portal, Assignments, Notes)
 */

import { apiService } from './services/apiService.js';
import { authService } from './services/authService.js';
import { MOCK_DATA } from './services/mockData.js';
import { RoleGatewayScreen } from './screens/RoleGatewayScreen.js';
import { HomeScreen } from './screens/HomeScreen.js';
import { LoginScreen } from './screens/LoginScreen.js';
import { StudentLoginScreen } from './screens/StudentLoginScreen.js';
import { ProfileSetupScreen } from './screens/ProfileSetupScreen.js';
import { TeacherPortalScreen } from './screens/TeacherPortalScreen.js';
import { AssignmentScreen } from './screens/AssignmentScreen.js';
import { NotesScreen } from './screens/NotesScreen.js';

class AppController {
  constructor() {
    this.currentScreen = 'gateway'; // 'gateway' | 'student-login' | 'home' | 'login'
    this.selectedRole = 'student';
    this.student = null;
    this.assignments = [];
    this.notes = [];
    this.slides = [];
    this.campusInfo = {};
    this.screenContainer = null;
    this.screenHistory = []; // stack of previous screens powering the Back button

    // Human-readable title shown in the persistent app bar for each module
    this.moduleTitles = {
      gateway: 'Role Gateway',
      'student-login': 'Student Login',
      login: 'Sign In',
      'teacher-login': 'Sign In',
      home: 'Home',
      'main-portal': 'Home',
      'teacher-portal': 'Teacher Portal',
      assignment: 'Assignments',
      notes: 'Notes',
      'profile-setup': 'Profile Setup'
    };
  }

  async init() {
    console.log('🚀 Initializing SRMUS Live Portal...');
    this.screenContainer = document.getElementById('app-screen-root');

    // Setup live phone status clock
    this.setupPhoneClock();

    // Bind persistent navigation controls (back button + sidebar drawer)
    this.setupNavigationControls();

    // Check backend connection
    await apiService.checkBackendHealth();

    // Fetch initial student & academic data
    await this.loadData();

    // Determine initial entry screen:
    // If not logged in -> Role Gateway screen
    // If student logged in -> Home page directly
    // If teacher logged in -> Teacher Portal screen
    const user = authService.getCurrentUser();
    if (!user) {
      this.currentScreen = 'gateway';
    } else if (user.role === 'teacher') {
      this.currentScreen = 'teacher-portal';
    } else {
      this.currentScreen = 'home';
    }

    // Render screen
    this.renderScreen();

    // Initialize Lucide icons
    if (window.lucide) window.lucide.createIcons();
  }

  setupPhoneClock() {
    const clockEl = document.getElementById('phone-clock-display');
    const updateTime = () => {
      const now = new Date();
      if (clockEl) {
        clockEl.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
      }
    };
    updateTime();
    setInterval(updateTime, 10000);
  }

  async loadData() {
    try {
      this.student = await apiService.getStudent();
      this.assignments = MOCK_DATA.assignments || [];
      this.notes = MOCK_DATA.notes || [];
      this.slides = MOCK_DATA.campusSlides || [];
      this.campusInfo = MOCK_DATA.campusInfo || {};
    } catch (err) {
      console.error('Error loading data:', err);
      this.student = MOCK_DATA.student;
      this.assignments = MOCK_DATA.assignments;
      this.notes = MOCK_DATA.notes;
      this.slides = MOCK_DATA.campusSlides;
      this.campusInfo = MOCK_DATA.campusInfo;
    }
    // Initialize sidebar active state
    this.updateSidebarActive();
  }

  navigateTo(screenName, options = {}) {
    const { pushHistory = true } = options;

    // Ignore duplicate navigations (keeps the history stack clean)
    if (screenName === this.currentScreen) return;

    // Only record navigations that start from a known module screen
    if (pushHistory && this.currentScreen && this.moduleTitles[this.currentScreen]) {
      this.screenHistory.push(this.currentScreen);
      // Cap history so long sessions never leak memory
      if (this.screenHistory.length > 30) this.screenHistory.shift();
    }

    this.currentScreen = screenName;
    this.renderScreen();
    if (this.screenContainer) {
      this.screenContainer.scrollTop = 0;
    }
  }

  /**
   * Global Back action shared by every module.
   * Walks one step back through the navigation history, falling back to a
   * sensible root screen when there is no history left.
   */
  goBack() {
    if (this.currentScreen === 'gateway') return;

    let previousScreen = this.screenHistory.pop();
    while (
      previousScreen &&
      (previousScreen === this.currentScreen || !this.moduleTitles[previousScreen])
    ) {
      previousScreen = this.screenHistory.pop();
    }

    if (!previousScreen) {
      // No history left -> fall back to the app root (Role Gateway)
      previousScreen = 'gateway';
    }

    this.navigateTo(previousScreen, { pushHistory: false });
  }

  handleLogout() {
    authService.logout();
    this.screenHistory = [];
    this.showToast('Signed out of SRMUS Live session', 'info');
    if (this.currentScreen === 'gateway') {
      // Already on the root screen: just refresh sidebar/session state
      this.refreshNavigation();
    } else {
      this.navigateTo('gateway', { pushHistory: false });
    }
  }

  /* ------------------------------------------------------------------
     Persistent app bar: back button + sidebar toggle wiring
     ------------------------------------------------------------------ */
  setupNavigationControls() {
    const openBtn = document.getElementById('btn-sidebar-open');
    const closeBtn = document.getElementById('btn-sidebar-close');
    const backdrop = document.getElementById('sidebar-backdrop');
    const backBtn = document.getElementById('back-btn');

    if (openBtn) openBtn.addEventListener('click', () => this.toggleSidebar(true));
    if (closeBtn) closeBtn.addEventListener('click', () => this.toggleSidebar(false));
    if (backdrop) backdrop.addEventListener('click', () => this.toggleSidebar(false));
    if (backBtn) backBtn.addEventListener('click', () => this.goBack());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.toggleSidebar(false);
    });
  }

  toggleSidebar(forceOpen) {
    const frame = document.getElementById('app-phone-frame');
    if (!frame) return;

    const shouldOpen = typeof forceOpen === 'boolean'
      ? forceOpen
      : !frame.classList.contains('sidebar-open');

    frame.classList.toggle('sidebar-open', shouldOpen);
    if (shouldOpen) this.updateSidebarActive();
  }

  /* ------------------------------------------------------------------
     Sidebar: organises every module into grouped, role-aware links
     ------------------------------------------------------------------ */
  getSidebarSections() {
    const user = authService.getCurrentUser();

    const moduleItems = user && user.role === 'teacher'
      ? [
          { screen: 'teacher-portal', icon: 'presentation', label: 'Teacher Portal', desc: 'Faculty dashboard & records' },
          { screen: 'notes', icon: 'book-open', label: 'Notes', desc: 'Syllabus & study material' }
        ]
      : [
          { screen: 'home', icon: 'layout-dashboard', label: 'Home', desc: 'Campus feed & alerts' },
          { screen: 'assignment', icon: 'clipboard-list', label: 'Assignments', desc: 'Tasks, due dates & scores' },
          { screen: 'notes', icon: 'book-open', label: 'Notes', desc: 'Lecture PDFs & units' }
        ];

    const accountItems = [];
    if (user) {
      accountItems.push({ screen: 'profile-setup', icon: 'user-cog', label: 'Profile Setup', desc: 'Review your account details' });
      accountItems.push({ screen: 'gateway', icon: 'shuffle', label: 'Switch Role', desc: 'Back to the role gateway' });
    } else {
      accountItems.push({ screen: 'student-login', icon: 'user-check', label: 'Student Login', desc: 'Enter the student portal' });
      accountItems.push({ screen: 'login', icon: 'graduation-cap', label: 'Teacher Login', desc: 'Enter the faculty portal' });
      accountItems.push({ screen: 'gateway', icon: 'layout-grid', label: 'Role Gateway', desc: 'Choose your gateway' });
    }

    return [
      { title: 'Modules', items: moduleItems },
      { title: 'Account', items: accountItems }
    ];
  }

  renderSidebar() {
    const navList = document.getElementById('sidebar-nav-list');
    const footer = document.getElementById('sidebar-footer');
    if (!navList) return;

    const user = authService.getCurrentUser();
    const sections = this.getSidebarSections();

    navList.innerHTML = sections.map(section => `
      <div class="sidebar-section">
        <span class="sidebar-section-title">${section.title}</span>
        ${section.items.map(item => `
          <a href="#" class="sidebar-link" data-screen="${item.screen}">
            <span class="sidebar-link-icon"><i data-lucide="${item.icon}" style="width: 16px; height: 16px;"></i></span>
            <span class="sidebar-link-text">
              <span class="sidebar-link-label">${item.label}</span>
              <span class="sidebar-link-desc">${item.desc}</span>
            </span>
            <i data-lucide="chevron-right" class="sidebar-link-chevron" style="width: 14px; height: 14px;"></i>
          </a>
        `).join('')}
      </div>
    `).join('');

    navList.querySelectorAll('.sidebar-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const screen = link.getAttribute('data-screen');
        this.toggleSidebar(false);
        if (screen) this.navigateTo(screen);
      });
    });

    if (footer) {
      if (user) {
        const displayName = user.name || 'SRM User';
        const initials = displayName
          .split(' ')
          .filter(Boolean)
          .slice(0, 2)
          .map(part => part[0].toUpperCase())
          .join('');

        footer.innerHTML = `
          <div class="sidebar-user-row">
            <span class="sidebar-user-avatar">${initials || 'U'}</span>
            <span class="sidebar-user-info">
              <span class="sidebar-user-name">${displayName}</span>
              <span class="sidebar-user-role">${user.role === 'teacher' ? 'Faculty' : 'Student'}</span>
            </span>
          </div>
          <button class="sidebar-signout-btn" id="btn-sidebar-logout" type="button">
            <i data-lucide="log-out" style="width: 14px; height: 14px;"></i>
            <span>Sign Out</span>
          </button>
        `;

        const logoutBtn = footer.querySelector('#btn-sidebar-logout');
        if (logoutBtn) {
          logoutBtn.addEventListener('click', () => {
            this.toggleSidebar(false);
            this.handleLogout();
          });
        }
      } else {
        footer.innerHTML = `
          <p class="sidebar-guest-note">Sign in to reach your personalized university dashboard, notices and results.</p>
        `;
      }
    }
  }

  toggleBackButton() {
    const backBtn = document.getElementById('back-btn');
    if (!backBtn) return;
    backBtn.style.display = this.currentScreen === 'gateway' ? 'none' : 'flex';
  }

  updateModuleTitle() {
    const titleEl = document.getElementById('app-module-title');
    if (!titleEl) return;
    titleEl.textContent = this.moduleTitles[this.currentScreen] || 'SRMUS Live';
  }

  updateSidebarActive() {
    const activeScreen = this.currentScreen === 'main-portal' ? 'home' : this.currentScreen;
    const links = document.querySelectorAll('#app-sidebar a');
    links.forEach(link => {
      if (link.getAttribute('data-screen') === activeScreen) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  refreshNavigation() {
    this.renderSidebar();
    this.updateSidebarActive();
    this.updateModuleTitle();
    this.toggleBackButton();
  }

  renderScreen() {
    if (!this.screenContainer) return;

    let screenInstance;

    switch (this.currentScreen) {
      case 'gateway':
        screenInstance = new RoleGatewayScreen({
          onSelectRole: (role) => {
            this.selectedRole = role;
            if (role === 'student') {
              this.navigateTo('student-login');
            } else {
              this.navigateTo('login');
            }
          },
          onNavigate: (screen) => this.navigateTo(screen)
        });
        break;

      case 'student-login':
        screenInstance = new StudentLoginScreen({
          onLoginSuccess: (user) => {
            const firstName = (user.name || 'Student').split(' ')[0];
            this.showToast(`Welcome, ${firstName}!`, 'success');
            // Fresh authenticated session: start history from the root
            this.screenHistory = [];
            setTimeout(() => {
              this.navigateTo('home', { pushHistory: false });
            }, 250);
          },
          onBackGateway: () => this.goBack()
        });
        break;

      case 'home':
      case 'main-portal':
        screenInstance = new HomeScreen({
          currentUser: authService.getCurrentUser() || this.student,
          onNavigate: (screen) => this.navigateTo(screen),
          onSignOut: () => this.handleLogout(),
          onBack: () => this.goBack()
        });
        break;

      case 'login':
      case 'teacher-login':
        screenInstance = new LoginScreen({
          prefilledRole: this.selectedRole || 'student',
          onBackToGateway: () => this.goBack(),
          onLoginSuccess: (user) => {
            const firstName = (user.name || 'User').split(' ')[0];
            this.showToast(`Welcome, ${firstName}!`, 'success');
            // Fresh authenticated session: start history from the root
            this.screenHistory = [];
            setTimeout(() => {
              if (user.role === 'teacher') {
                this.navigateTo('teacher-portal', { pushHistory: false });
              } else {
                this.navigateTo('home', { pushHistory: false });
              }
            }, 300);
          }
        });
        break;

      case 'profile-setup':
        screenInstance = new ProfileSetupScreen({
          user: authService.getCurrentUser(),
          onSetupComplete: (completedUser) => {
            this.showToast('Profile setup complete! Loading home...', 'success');
            this.screenHistory = [];
            setTimeout(() => {
              if (completedUser.role === 'teacher') {
                this.navigateTo('teacher-portal', { pushHistory: false });
              } else {
                this.navigateTo('home', { pushHistory: false });
              }
            }, 350);
          },
          onSignOut: () => this.handleLogout(),
          onBack: () => this.goBack()
        });
        break;

      case 'teacher-portal':
        const activeFaculty = authService.getCurrentUser();
        screenInstance = new TeacherPortalScreen({
          faculty: activeFaculty,
          onNavigate: (screen) => this.navigateTo(screen),
          onSignOut: () => this.handleLogout(),
          onBack: () => this.goBack()
        });
        break;

      case 'assignment':
        screenInstance = new AssignmentScreen({
          assignments: this.assignments,
          onNavigate: (screen) => this.navigateTo(screen),
          onBack: () => this.goBack()
        });
        break;

      case 'notes':
        screenInstance = new NotesScreen({
          notes: this.notes,
          onNavigate: (screen) => this.navigateTo(screen),
          onBack: () => this.goBack(),
          onDownload: (noteId) => {
            const note = this.notes.find(n => n.id === noteId);
            this.showToast(`📥 Downloading ${note ? note.title : 'Lecture Note PDF'}...`, 'success');
          }
        });
        break;

      default:
        // Fallback to gateway if unauthenticated, else main-portal
        if (!authService.isLoggedIn()) {
          this.navigateTo('gateway');
          return;
        }
        const activeUser = authService.getCurrentUser();
        if (activeUser && activeUser.role === 'teacher') {
          this.navigateTo('teacher-portal');
          return;
        }
        this.navigateTo('main-portal');
        return;
    }

    this.screenContainer.innerHTML = screenInstance.render();
    screenInstance.bindEvents(this.screenContainer);

    // Keep sidebar, module title & global back button in sync with the screen
    this.refreshNavigation();

    if (window.lucide) window.lucide.createIcons();
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('app-toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast-message ${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(-10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2800);
  }
}

// Bootstrap application on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new AppController();
  app.init();
});
