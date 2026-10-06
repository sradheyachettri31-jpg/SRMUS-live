/**
 * Header UI Component
 * Displays App branding, personalized greeting, student avatar and notifications
 */

export class HeaderComponent {
  constructor(student, onLogoutClick, onNotifyClick) {
    this.student = student;
    this.onLogoutClick = onLogoutClick;
    this.onNotifyClick = onNotifyClick;
  }

  getGreeting() {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  }

  render() {
    const greeting = this.getGreeting();
    const firstName = this.student?.getFirstName ? this.student.getFirstName() : 'Anup';

    return `
      <header class="app-header">
        <div class="header-left">
          <div class="header-brand-tag">
            <div class="brand-crest" title="SRM University Sikkim">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <span class="brand-title">SRM US Live</span>
            <div class="brand-live-dot" title="Live University Feed"></div>
          </div>
          <h1 class="greeting-text">${greeting}, ${firstName}</h1>
          <p class="subtitle-text">Stay updated with your university</p>
        </div>

        <div class="header-right">
          <button class="header-action-btn" id="btn-header-notif" aria-label="Notifications" title="Notifications">
            <i data-lucide="bell" style="width: 18px; height: 18px;"></i>
            <span class="btn-badge"></span>
          </button>
          
          <button class="header-action-btn btn-logout" id="btn-header-logout" title="Sign Out / Switch User" aria-label="Sign Out">
            <i data-lucide="log-out" style="width: 17px; height: 17px;"></i>
          </button>
        </div>
      </header>
    `;
  }

  bindEvents(container) {
    const notifBtn = container.querySelector('#btn-header-notif');
    if (notifBtn && this.onNotifyClick) {
      notifBtn.addEventListener('click', this.onNotifyClick);
    }

    const logoutBtn = container.querySelector('#btn-header-logout');
    if (logoutBtn && this.onLogoutClick) {
      logoutBtn.addEventListener('click', this.onLogoutClick);
    }
  }
}
