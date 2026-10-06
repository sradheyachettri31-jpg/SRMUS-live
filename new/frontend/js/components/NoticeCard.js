/**
 * Notice Card Component
 * Renders university circulars with category tags, department and timestamp
 */

export class NoticeCardComponent {
  constructor(notice, onCardClick) {
    this.notice = notice;
    this.onCardClick = onCardClick;
  }

  render() {
    const n = this.notice;
    const catClass = n.getCategoryClass ? n.getCategoryClass() : 'cat-academic';
    const dateFormatted = n.getFormattedDate ? n.getFormattedDate() : n.created_at;

    return `
      <article class="notice-card ${n.is_read ? 'notice-read' : 'notice-unread'}" data-notice-id="${n.id}">
        <div class="notice-header">
          <span class="category-tag ${catClass}">
            <i data-lucide="tag" style="width: 10px; height: 10px;"></i>
            ${n.category}
          </span>
          <span class="notice-date">
            <i data-lucide="calendar" style="width: 11px; height: 11px;"></i>
            ${dateFormatted}
          </span>
        </div>
        
        <h3 class="notice-title">${n.title}</h3>
        <p class="notice-description">${n.description}</p>
        
        <div class="notice-footer">
          <span class="notice-dept">${n.department || 'University Office'}</span>
          <span class="notice-read-action">
            Read circular
            <i data-lucide="chevron-right" style="width: 13px; height: 13px;"></i>
          </span>
        </div>
      </article>
    `;
  }

  static renderList(notices, limit = 3, onCardClick) {
    const listToRender = limit > 0 ? notices.slice(0, limit) : notices;
    return `
      <div class="notices-list">
        ${listToRender.map(n => new NoticeCardComponent(n, onCardClick).render()).join('')}
      </div>
    `;
  }

  static bindEvents(container, notices, onCardClick) {
    const cards = container.querySelectorAll('.notice-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-notice-id');
        const notice = notices.find(n => n.id === id);
        if (notice && onCardClick) {
          onCardClick(notice);
        }
      });
    });
  }
}
