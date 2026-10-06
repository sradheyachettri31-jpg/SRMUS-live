/**
 * Profile Screen
 * Student Identity, Academic Standing, Enrolled Program, and Faculty Advisor Details
 */

export class ProfileScreen {
  constructor({ student, academics, callbacks }) {
    this.student = student;
    this.academics = academics || {};
    this.callbacks = callbacks || {};
  }

  render() {
    const s = this.student;
    const adv = s.advisor || {};

    return `
      <div class="screen-profile animate-fade-in">
        <!-- Student Identity Card -->
        <div class="profile-card">
          <div class="profile-card-top">
            <img src="${s.profile_image}" alt="${s.name}" class="profile-img-large" />
            <div>
              <h2 class="profile-name">${s.name}</h2>
              <div class="profile-reg">${s.student_id}</div>
              <div style="font-size: 11px; color: rgba(255, 255, 255, 0.9); margin-top: 2px;">
                ${s.course}
              </div>
            </div>
          </div>

          <div class="profile-stats-row">
            <div>
              <div class="stat-item-label">Semester</div>
              <div class="stat-item-value">${s.semester}th</div>
            </div>
            <div>
              <div class="stat-item-label">CGPA</div>
              <div class="stat-item-value" style="color: #fef08a;">${s.cgpa}</div>
            </div>
            <div>
              <div class="stat-item-label">Attendance</div>
              <div class="stat-item-value" style="color: #bbf7d0;">${s.attendance_rate}%</div>
            </div>
          </div>
        </div>

        <!-- Academic Information Box -->
        <div style="background: white; border: 1px solid var(--border-light); border-radius: 16px; padding: 16px; margin-bottom: 14px;">
          <h3 style="font-size: 13px; font-weight: 800; color: var(--srm-navy); margin-bottom: 12px; text-transform: uppercase; letter-spacing: 0.5px;">
            Academic Profile
          </h3>

          <div style="display: flex; flex-direction: column; gap: 10px; font-size: 12px;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <span style="color: var(--srm-muted);">Specialization</span>
              <span style="font-weight: 700; color: var(--srm-navy); text-align: right;">${s.specialization}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <span style="color: var(--srm-muted);">Batch</span>
              <span style="font-weight: 700; color: var(--srm-navy);">${s.batch}</span>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 8px;">
              <span style="color: var(--srm-muted);">Section / Roll No</span>
              <span style="font-weight: 700; color: var(--srm-navy);">${s.section} (Roll ${s.roll_no})</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: var(--srm-muted);">Official Email</span>
              <span style="font-weight: 700; color: var(--srm-maroon); font-family: monospace;">${s.email}</span>
            </div>
          </div>
        </div>

        <!-- Faculty Academic Advisor -->
        <div style="background: white; border: 1px solid var(--border-light); border-radius: 16px; padding: 16px; margin-bottom: 14px;">
          <h3 style="font-size: 13px; font-weight: 800; color: var(--srm-navy); margin-bottom: 10px; text-transform: uppercase; letter-spacing: 0.5px;">
            Faculty Academic Advisor
          </h3>
          <div style="display: flex; gap: 12px; align-items: center;">
            <div style="width: 40px; height: 40px; border-radius: 10px; background: var(--srm-maroon-soft); color: var(--srm-maroon); display: flex; align-items: center; justify-content: center;">
              <i data-lucide="graduation-cap" style="width: 22px; height: 22px;"></i>
            </div>
            <div style="flex: 1;">
              <div style="font-size: 13px; font-weight: 700; color: var(--srm-navy);">${adv.name || 'Dr. Ramesh Krishnan'}</div>
              <div style="font-size: 11px; color: var(--srm-muted);">${adv.designation || 'Dept. of Computing Technologies'}</div>
              <div style="font-size: 11px; color: var(--srm-maroon); font-weight: 600; margin-top: 2px;">${adv.email || 'ramesh.k@srmist.edu.in'}</div>
            </div>
          </div>
        </div>

        <!-- Version & Capstone Badge -->
        <div style="text-align: center; padding: 16px 0 24px; color: var(--srm-muted); font-size: 11px;">
          <strong>SRM US Live App • Prototype Version 1.0.0</strong><br />
          <span>Department of Computing Technologies • Capstone 2026</span>
        </div>
      </div>
    `;
  }

  bindEvents() {}
}
