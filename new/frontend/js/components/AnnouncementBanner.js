/**
 * Announcement Banner UI Component
 */

export class AnnouncementBannerComponent {
  constructor(announcements = [], onClick) {
    this.announcements = announcements;
    this.onClick = onClick;
  }

  render() {
    if (!this.announcements || this.announcements.length === 0) return '';
    const activeAnnouncement = this.announcements[0];

    return `
      <div class="announcement-banner" id="active-announcement-banner" data-id="${activeAnnouncement.id}">
        <div class="announcement-icon-box">
          <i data-lucide="megaphone" style="width: 18px; height: 18px;"></i>
        </div>
        <div class="announcement-content">
          <div class="announcement-badge-row">
            <span class="announcement-priority-badge">${activeAnnouncement.priority}</span>
            <span class="announcement-time">Campus Alert</span>
          </div>
          <h4 class="announcement-title">${activeAnnouncement.title}</h4>
          <p class="announcement-message">${activeAnnouncement.message}</p>
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const banner = container.querySelector('#active-announcement-banner');
    if (banner && this.onClick) {
      banner.addEventListener('click', () => {
        const id = banner.getAttribute('data-id');
        const item = this.announcements.find(a => a.id === id) || this.announcements[0];
        this.onClick(item);
      });
    }
  }
}
