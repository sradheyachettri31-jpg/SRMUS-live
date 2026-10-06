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
  }

  async init() {
    console.log('🚀 Initializing SRMUS Live Portal...');
    this.screenContainer = document.getElementById('app-screen-root');

    // Setup live phone status clock
    this.setupPhoneClock();

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

  navigateTo(screenName) {
    if (this.currentScreen !== 'gateway') this.prevScreen = this.currentScreen;
    this.currentScreen = screenName;
    this.renderScreen();
    if (this.screenContainer) {
      this.screenContainer.scrollTop = 0;
    }
    this.updateSidebarActive();
    this.toggleBackButton();
  }

  handleLogout() {
    authService.logout();
    this.showToast('Signed out of SRMUS Live session', 'info');
    this.navigateTo('gateway');
  }

  toggleBackButton() {
    const backBtn = document.getElementById('back-btn');
    if (!backBtn) return;
    if (this.currentScreen === 'gateway') {
      backBtn.style.display = 'none';
    } else {
      backBtn.style.display = 'block';
    }
  }

  updateSidebarActive() {
    const links = document.querySelectorAll('#app-sidebar a');
    links.forEach(link => {
      if (link.dataset.screen === this.currentScreen) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
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
            setTimeout(() => {
              this.navigateTo('home');
            }, 250);
          },
          onBackGateway: () => this.navigateTo('gateway')
        });
        break;

      case 'home':
      case 'main-portal':
        screenInstance = new HomeScreen({
          currentUser: authService.getCurrentUser() || this.student,
          onNavigate: (screen) => this.navigateTo(screen),
          onSignOut: () => this.handleLogout()
        });
        break;

      case 'login':
      case 'teacher-login':
        screenInstance = new LoginScreen({
          prefilledRole: this.selectedRole || 'student',
          onBackToGateway: () => this.navigateTo('gateway'),
          onLoginSuccess: (user) => {
            const firstName = (user.name || 'User').split(' ')[0];
            this.showToast(`Welcome, ${firstName}!`, 'success');
            setTimeout(() => {
              if (user.role === 'teacher') {
                this.navigateTo('teacher-portal');
              } else {
                this.navigateTo('home');
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
            setTimeout(() => {
              if (completedUser.role === 'teacher') {
                this.navigateTo('teacher-portal');
              } else {
                this.navigateTo('home');
              }
            }, 350);
          },
          onSignOut: () => this.handleLogout()
        });
        break;

      case 'teacher-portal':
        const activeFaculty = authService.getCurrentUser();
        screenInstance = new TeacherPortalScreen({
          faculty: activeFaculty,
          onNavigate: (screen) => this.navigateTo(screen),
          onSignOut: () => this.handleLogout()
        });
        break;

      case 'assignment':
        screenInstance = new AssignmentScreen({
          assignments: this.assignments,
          onNavigate: (screen) => this.navigateTo(screen)
        });
        break;

      case 'notes':
        screenInstance = new NotesScreen({
          notes: this.notes,
          onNavigate: (screen) => this.navigateTo(screen),
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
