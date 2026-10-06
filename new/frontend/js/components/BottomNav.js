/**
 * Bottom Navigation Component
 * 4 Primary Views: Home, Events, Notices, Profile
 */

export class BottomNavComponent {
  constructor(activeTab = 'home', onTabChange) {
    this.activeTab = activeTab;
    this.onTabChange = onTabChange;
    this.tabs = [
      { id: 'home', label: 'Home', icon: 'home' },
      { id: 'events', label: 'Events', icon: 'calendar' },
      { id: 'notices', label: 'Notices', icon: 'file-text' },
      { id: 'profile', label: 'Profile', icon: 'user' }
    ];
  }

  render() {
    return `
      <nav class="bottom-nav" id="app-bottom-nav">
        ${this.tabs.map(tab => `
          <div class="nav-item ${this.activeTab === tab.id ? 'active' : ''}" data-tab="${tab.id}">
            <div class="nav-active-pill"></div>
            <div class="nav-icon-container">
              <i data-lucide="${tab.icon}" style="width: 20px; height: 20px;"></i>
            </div>
            <span class="nav-label">${tab.label}</span>
          </div>
        `).join('')}
      </nav>
    `;
  }

  setActiveTab(tabId) {
    this.activeTab = tabId;
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      if (item.getAttribute('data-tab') === tabId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  bindEvents(container) {
    const items = container.querySelectorAll('.nav-item');
    items.forEach(item => {
      item.addEventListener('click', () => {
        const tab = item.getAttribute('data-tab');
        if (tab && this.onTabChange) {
          this.setActiveTab(tab);
          this.onTabChange(tab);
        }
      });
    });
  }
}
