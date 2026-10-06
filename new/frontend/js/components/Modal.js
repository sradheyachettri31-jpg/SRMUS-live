/**
 * Reusable Interactive Modal & Sheet Component
 */

export class ModalComponent {
  constructor() {
    this.modalEl = null;
    this.titleEl = null;
    this.bodyEl = null;
    this.closeBtn = null;
    this.init();
  }

  init() {
    let overlay = document.getElementById('app-global-modal');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'app-global-modal';
      overlay.className = 'modal-overlay';
      overlay.innerHTML = `
        <div class="modal-sheet">
          <div class="modal-drag-handle"></div>
          <div class="modal-header">
            <h3 class="modal-title" id="modal-global-title">Details</h3>
            <button class="modal-close-btn" id="modal-global-close" aria-label="Close">&times;</button>
          </div>
          <div class="modal-body" id="modal-global-body">
            <!-- Dynamic Content Injected Here -->
          </div>
        </div>
      `;
      document.querySelector('.device-shell')?.appendChild(overlay);
    }

    this.modalEl = overlay;
    this.titleEl = overlay.querySelector('#modal-global-title');
    this.bodyEl = overlay.querySelector('#modal-global-body');
    this.closeBtn = overlay.querySelector('#modal-global-close');

    this.closeBtn.addEventListener('click', () => this.close());
    this.modalEl.addEventListener('click', (e) => {
      if (e.target === this.modalEl) {
        this.close();
      }
    });
  }

  open(title, htmlContent) {
    if (!this.modalEl) this.init();
    this.titleEl.textContent = title;
    this.bodyEl.innerHTML = htmlContent;
    this.modalEl.classList.add('open');
    if (window.lucide) window.lucide.createIcons();
  }

  close() {
    if (this.modalEl) {
      this.modalEl.classList.remove('open');
    }
  }

  /**
   * Render Attendance Breakdown Modal
   */
  showAttendance(academics) {
    const overall = academics.overall_attendance || 88.5;
    const required = academics.required_attendance || 75.0;
    const subjects = academics.subjects || [];

    const html = `
      <div>
        <div style="background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); border: 1px solid #bbf7d0; border-radius: 16px; padding: 16px; margin-bottom: 18px; text-align: center;">
          <span style="font-size: 11px; font-weight: 700; color: #166534; text-transform: uppercase;">Aggregate Attendance</span>
          <div style="font-size: 36px; font-weight: 800; color: #15803d; line-height: 1.1; margin: 4px 0;">${overall}%</div>
          <p style="font-size: 12px; color: #166534; font-weight: 600;">
            ✓ Safe Zone (University Minimum Requirement: ${required}%)
          </p>
          <div style="display: flex; justify-content: center; gap: 20px; margin-top: 10px; font-size: 11px; color: #14532d;">
            <span>Attended: <strong>${academics.attended_classes || 283}</strong></span>
            <span>Total Conducted: <strong>${academics.total_classes || 320}</strong></span>
          </div>
        </div>

        <h4 style="font-size: 13px; font-weight: 800; color: var(--srm-navy); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
          Course Wise Breakdown
        </h4>

        ${subjects.map(s => {
          const statusClass = s.percentage >= 85 ? 'safe' : (s.percentage >= 75 ? 'warning' : 'danger');
          return `
            <div class="subject-row">
              <div class="subject-header">
                <span class="subject-name">${s.name}</span>
                <span class="subject-pct ${statusClass}">${s.percentage}%</span>
              </div>
              <div class="subject-meta">
                <span>Code: ${s.code}</span> • <span>Faculty: ${s.faculty}</span> • <span>${s.attended}/${s.total} Hours</span>
              </div>
              <div class="progress-track">
                <div class="progress-fill ${statusClass}" style="width: ${s.percentage}%;"></div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;

    this.open('Attendance Overview', html);
  }

  /**
   * Render Timetable Schedule Modal
   */
  showTimetable(academics) {
    const timetable = academics.today_timetable || [];

    const html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; background: var(--srm-maroon-soft); padding: 10px 14px; border-radius: 12px; border: 1px solid var(--srm-maroon-border);">
          <div>
            <div style="font-size: 11px; font-weight: 700; color: var(--srm-maroon); text-transform: uppercase;">Current Day Schedule</div>
            <div style="font-size: 13px; font-weight: 800; color: var(--srm-navy);">Wednesday (Day Order 3)</div>
          </div>
          <span style="font-size: 11px; font-weight: 700; background: var(--srm-maroon); color: white; padding: 2px 8px; border-radius: 999px;">CSE-AIML-B</span>
        </div>

        ${timetable.map(p => `
          <div class="timetable-period-card">
            <div class="period-badge-col">
              <span class="period-number">Slot ${p.period}</span>
              <div class="period-time">${p.time.split('-')[0].trim()}</div>
            </div>
            <div class="period-details">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <h4 class="period-subject">${p.subject}</h4>
                <span style="font-size: 10px; font-weight: 700; padding: 1px 6px; border-radius: 4px; ${p.status === 'Completed' ? 'background: #f1f5f9; color: #64748b;' : 'background: #dbeafe; color: #1e40af;'}">${p.status}</span>
              </div>
              <div class="period-room">
                <span>📍 ${p.room}</span> • <span>📚 ${p.code}</span> • <span>${p.type}</span>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    this.open('Today’s Timetable', html);
  }

  /**
   * Show Full Notice Detail
   */
  showNoticeDetail(notice) {
    const catClass = notice.getCategoryClass ? notice.getCategoryClass() : 'cat-academic';
    const date = notice.getFormattedDate ? notice.getFormattedDate() : notice.created_at;

    const html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="category-tag ${catClass}">${notice.category}</span>
          <span style="font-size: 12px; color: var(--srm-muted);">${date}</span>
        </div>

        <h3 style="font-size: 16px; font-weight: 800; color: var(--srm-navy); margin-bottom: 12px; line-height: 1.35;">
          ${notice.title}
        </h3>

        <div style="background: var(--bg-subtle); border-left: 3px solid var(--srm-maroon); padding: 12px 14px; border-radius: 0 10px 10px 0; margin-bottom: 16px; font-size: 13px; color: var(--srm-slate); line-height: 1.6;">
          ${notice.description}
        </div>

        <div style="border-top: 1px solid var(--border-light); padding-top: 14px; font-size: 12px; color: var(--srm-muted);">
          <div style="margin-bottom: 4px;"><strong>Issued By:</strong> ${notice.department || 'University Office'}</div>
          <div><strong>Priority:</strong> <span style="color: ${notice.priority === 'High' ? '#dc2626' : '#2563eb'}; font-weight: 700;">${notice.priority}</span></div>
        </div>

        <button onclick="document.getElementById('modal-global-close').click()" style="margin-top: 20px; width: 100%; background: var(--srm-maroon); color: white; border: none; padding: 12px; border-radius: 12px; font-weight: 700; cursor: pointer;">
          Acknowledge Circular
        </button>
      </div>
    `;

    this.open('University Notice', html);
  }

  /**
   * Show Event Detail
   */
  showEventDetail(event, onRsvpToggle) {
    const html = `
      <div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <span class="event-cat-badge" style="background: var(--srm-maroon-soft); color: var(--srm-maroon); font-weight: 700; font-size: 12px; padding: 2px 10px;">${event.category}</span>
          <span style="font-size: 12px; color: var(--srm-muted); font-weight: 600;">${event.attendees_count} Students Registered</span>
        </div>

        <h3 style="font-size: 18px; font-weight: 800; color: var(--srm-navy); margin-bottom: 10px;">
          ${event.title}
        </h3>

        <div style="background: var(--bg-subtle); border: 1px solid var(--border-light); border-radius: 12px; padding: 12px 14px; margin-bottom: 16px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; color: var(--srm-slate);">
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="calendar" style="width: 14px; height: 14px; color: var(--srm-maroon);"></i>
            <strong>Date:</strong> ${event.date_formatted || event.date}
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="clock" style="width: 14px; height: 14px; color: var(--srm-maroon);"></i>
            <strong>Time:</strong> ${event.time}
          </div>
          <div style="display: flex; align-items: center; gap: 8px;">
            <i data-lucide="map-pin" style="width: 14px; height: 14px; color: var(--srm-maroon);"></i>
            <strong>Venue:</strong> ${event.location}
          </div>
        </div>

        <p style="font-size: 13px; color: var(--srm-slate); line-height: 1.6; margin-bottom: 20px;">
          ${event.description}
        </p>

        <button id="modal-btn-rsvp-confirm" style="width: 100%; background: ${event.is_registered ? '#10b981' : 'var(--srm-maroon)'}; color: white; border: none; padding: 12px; border-radius: 12px; font-weight: 800; cursor: pointer; font-size: 14px; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
          ${event.is_registered ? '✓ You Are Registered (Cancel RSVP)' : 'Register For This Event'}
        </button>
      </div>
    `;

    this.open('Event Details', html);

    const rsvpBtn = document.getElementById('modal-btn-rsvp-confirm');
    if (rsvpBtn && onRsvpToggle) {
      rsvpBtn.addEventListener('click', () => {
        onRsvpToggle(event);
        this.close();
      });
    }
  }
}
