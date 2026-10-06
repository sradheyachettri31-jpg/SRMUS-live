/**
 * NOTES Screen - SRMUS Live
 * Displays BCA Course study materials, unit notes and lecture PDFs
 */

export class NotesScreen {
  constructor({ notes = [], onNavigate, onBack, onDownload }) {
    this.notes = notes;
    this.onNavigate = onNavigate;
    this.onBack = onBack;
    this.onDownload = onDownload;
  }

  handleBack() {
    if (this.onBack) {
      this.onBack();
    } else if (this.onNavigate) {
      this.onNavigate('home');
    }
  }

  render() {
    return `
      <div class="screen-notes animate-fade-in">
        <!-- Top Navbar with SRMUS Live in Top Left -->
        <header class="top-navbar">
          <div class="brand-corner-left" id="brand-notes-home" title="Return to SRMUS Live Home">
            <div class="brand-crest-box">
              <img src="assets/images/srm_logo.jpg" alt="SRM University Sikkim" class="brand-crest-img" onerror="this.onerror=null;this.src='https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg'" />
            </div>
            <div class="brand-name-title">
              <span>SRMUS Live</span>
            </div>
          </div>
          <button class="btn-back" id="btn-notes-home" title="Go Back">
            <i data-lucide="arrow-left" style="width: 13px; height: 13px;"></i>
            <span>Back</span>
          </button>
        </header>

        <div style="margin-bottom: 14px;">
          <h2 style="font-size: 19px; font-weight: 800; color: var(--srm-navy);">Lecture Notes &amp; Study Material</h2>
          <p style="font-size: 12px; color: var(--srm-muted);">Download syllabus, unit handbooks &amp; lab manuals for BCA</p>
        </div>

        <!-- Notes List -->
        <div class="notes-list">
          ${this.notes.map(note => `
            <div class="note-item-card">
              <div class="note-left">
                <div class="note-icon-box">
                  <i data-lucide="file-text" style="width: 20px; height: 20px;"></i>
                </div>
                <div class="note-info">
                  <h3 class="note-title">${note.title}</h3>
                  <div class="note-meta">
                    <strong>${note.code}</strong> • ${note.unit} • ${note.size}
                  </div>
                </div>
              </div>
              <button class="btn-download-note" data-note-id="${note.id}">
                <i data-lucide="download" style="width: 13px; height: 13px;"></i>
                <span>PDF</span>
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const homeBtn = container.querySelector('#btn-notes-home');
    const brandLink = container.querySelector('#brand-notes-home');
    const downloadBtns = container.querySelectorAll('.btn-download-note');

    if (homeBtn) homeBtn.addEventListener('click', () => this.handleBack());
    if (brandLink) brandLink.addEventListener('click', () => this.handleBack());

    downloadBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const noteId = btn.getAttribute('data-note-id');
        if (this.onDownload) this.onDownload(noteId);
      });
    });
  }
}
