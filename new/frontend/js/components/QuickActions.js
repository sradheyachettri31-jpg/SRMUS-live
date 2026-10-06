/**
 * Quick Actions Grid Component
 * Displays 4 primary action cards: Notices, Events, Attendance, Timetable
 */

export class QuickActionsComponent {
  constructor({ unreadNoticesCount = 2, upcomingEventsCount = 4, attendanceRate = 88.5, nextClassTime = '10:45 AM' }, onActionClick) {
    this.stats = {
      unreadNoticesCount,
      upcomingEventsCount,
      attendanceRate,
      nextClassTime
    };
    this.onActionClick = onActionClick;
  }

  render() {
    return `
      <section class="quick-actions-section">
        <div class="section-header" style="margin-top: 6px; margin-bottom: 10px;">
          <div class="section-title-group">
            <div class="section-indicator"></div>
            <h2 class="section-title">Quick Services</h2>
          </div>
          <span class="section-badge">Fast Access</span>
        </div>

        <div class="quick-actions-grid">
          <!-- 1. Notices Card -->
          <div class="quick-action-card" data-action="notices" id="qa-notices">
            <div class="quick-action-top">
              <div class="action-icon-circle action-icon-notices">
                <i data-lucide="bell-ring" style="width: 20px; height: 20px;"></i>
              </div>
              <span class="action-pill-info pill-count-badge">${this.stats.unreadNoticesCount} New</span>
            </div>
            <div>
              <h3 class="action-title">Notices</h3>
              <p class="action-desc">Circulars & exams</p>
            </div>
          </div>

          <!-- 2. Events Card -->
          <div class="quick-action-card" data-action="events" id="qa-events">
            <div class="quick-action-top">
              <div class="action-icon-circle action-icon-events">
                <i data-lucide="calendar-days" style="width: 20px; height: 20px;"></i>
              </div>
              <span class="action-pill-info pill-count-badge" style="background:#dbeafe; color:#1d4ed8;">${this.stats.upcomingEventsCount} Live</span>
            </div>
            <div>
              <h3 class="action-title">Events</h3>
              <p class="action-desc">Fests & workshops</p>
            </div>
          </div>

          <!-- 3. Attendance Card -->
          <div class="quick-action-card" data-action="attendance" id="qa-attendance">
            <div class="quick-action-top">
              <div class="action-icon-circle action-icon-attendance">
                <i data-lucide="user-check" style="width: 20px; height: 20px;"></i>
              </div>
              <span class="action-pill-info pill-attendance-high">${this.stats.attendanceRate}%</span>
            </div>
            <div>
              <h3 class="action-title">Attendance</h3>
              <p class="action-desc">Subject breakdown</p>
            </div>
          </div>

          <!-- 4. Timetable Card -->
          <div class="quick-action-card" data-action="timetable" id="qa-timetable">
            <div class="quick-action-top">
              <div class="action-icon-circle action-icon-timetable">
                <i data-lucide="clock-3" style="width: 20px; height: 20px;"></i>
              </div>
              <span class="action-pill-info pill-timetable-next">Next: ${this.stats.nextClassTime}</span>
            </div>
            <div>
              <h3 class="action-title">Timetable</h3>
              <p class="action-desc">Today's schedule</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  bindEvents(container) {
    const cards = container.querySelectorAll('.quick-action-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const action = card.getAttribute('data-action');
        if (this.onActionClick) {
          this.onActionClick(action);
        }
      });
    });
  }
}
