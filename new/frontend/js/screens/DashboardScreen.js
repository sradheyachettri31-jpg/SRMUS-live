/**
 * Dashboard Screen (Main Screen / Screen #1)
 * Primary focus of Version 1 Prototype
 */

import { HeaderComponent } from '../components/Header.js';
import { AnnouncementBannerComponent } from '../components/AnnouncementBanner.js';
import { QuickActionsComponent } from '../components/QuickActions.js';
import { NoticeCardComponent } from '../components/NoticeCard.js';
import { EventCardComponent } from '../components/EventCard.js';

export class DashboardScreen {
  constructor({ student, notices, events, announcements, academics, callbacks }) {
    this.student = student;
    this.notices = notices || [];
    this.events = events || [];
    this.announcements = announcements || [];
    this.academics = academics || {};
    this.callbacks = callbacks || {};

    this.headerComp = new HeaderComponent(
      this.student,
      this.callbacks.onLogoutClick,
      this.callbacks.onNotifyClick
    );

    this.announcementComp = new AnnouncementBannerComponent(
      this.announcements,
      this.callbacks.onAnnouncementClick
    );

    this.quickActionsComp = new QuickActionsComponent(
      {
        unreadNoticesCount: this.notices.filter(n => !n.is_read).length,
        upcomingEventsCount: this.events.length,
        attendanceRate: this.academics.overall_attendance || 88.5,
        nextClassTime: '10:45 AM'
      },
      this.callbacks.onQuickActionClick
    );
  }

  render() {
    return `
      <div class="screen-dashboard animate-fade-in">
        <!-- 1. Header Section -->
        ${this.headerComp.render()}

        <!-- 2. Urgent Announcement Bar -->
        ${this.announcementComp.render()}

        <!-- 3. Quick Actions 4-Grid -->
        ${this.quickActionsComp.render()}

        <!-- 4. Latest University Notices Section (3 notices) -->
        <section class="notices-section">
          <div class="section-header">
            <div class="section-title-group">
              <div class="section-indicator"></div>
              <h2 class="section-title">Latest Notices</h2>
            </div>
            <span class="section-badge">3 New</span>
          </div>

          ${NoticeCardComponent.renderList(this.notices, 3, this.callbacks.onNoticeClick)}
        </section>

        <!-- 5. Upcoming Events Section -->
        <section class="events-section" style="margin-top: 18px;">
          <div class="section-header">
            <div class="section-title-group">
              <div class="section-indicator"></div>
              <h2 class="section-title">Upcoming Events</h2>
            </div>
            <span class="section-badge">${this.events.length} Events</span>
          </div>

          ${EventCardComponent.renderList(this.events, 3, this.callbacks.onEventClick, this.callbacks.onRsvpClick)}
        </section>

        <!-- Basic Footer -->
        <footer class="app-basic-footer">
          <p><strong>SRM US Live</strong> • University Student Portal</p>
          <span>Logged in as <strong>${this.student?.name || 'Anup'}</strong> (${this.student?.student_id || 'RA2211003010142'})</span>
        </footer>
      </div>
    `;
  }

  bindEvents(container) {
    // Bind subcomponents
    this.headerComp.bindEvents(container);
    this.announcementComp.bindEvents(container);
    this.quickActionsComp.bindEvents(container);
    NoticeCardComponent.bindEvents(container, this.notices, this.callbacks.onNoticeClick);
    EventCardComponent.bindEvents(container, this.events, this.callbacks.onEventClick, this.callbacks.onRsvpClick);
  }
}
