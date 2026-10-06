/**
 * Event Card Component
 * Renders university events with date calendar tiles, venue, category, and RSVP interaction
 */

export class EventCardComponent {
  constructor(event, onCardClick, onRsvpClick) {
    this.event = event;
    this.onCardClick = onCardClick;
    this.onRsvpClick = onRsvpClick;
  }

  render() {
    const e = this.event;
    const month = e.getMonthAbbreviation ? e.getMonthAbbreviation() : 'APR';
    const day = e.getDayNumber ? e.getDayNumber() : '18';
    const isRegistered = e.is_registered;

    return `
      <article class="event-card" data-event-id="${e.id}">
        <div class="event-date-block">
          <span class="event-date-month">${month}</span>
          <span class="event-date-day">${day}</span>
        </div>

        <div class="event-details">
          <div>
            <div class="event-meta-top">
              <span class="event-cat-badge">${e.category}</span>
              <span class="event-attendees">
                <i data-lucide="users" style="width: 11px; height: 11px; vertical-align: middle;"></i>
                ${e.attendees_count} going
              </span>
            </div>
            <h3 class="event-title">${e.title}</h3>
          </div>

          <div class="event-info-row">
            <div class="event-info-item">
              <i data-lucide="map-pin" style="width: 12px; height: 12px; color: var(--srm-maroon);"></i>
              <span>${e.location}</span>
            </div>
            <div class="event-info-item">
              <i data-lucide="clock" style="width: 12px; height: 12px; color: var(--srm-muted);"></i>
              <span>${e.time}</span>
            </div>
          </div>

          <div class="event-actions-bar">
            <span style="font-size: 11px; color: var(--srm-maroon); font-weight: 700; cursor: pointer;" class="btn-event-details">
              View Details &rarr;
            </span>
            <button class="btn-rsvp ${isRegistered ? 'registered' : ''}" data-rsvp-id="${e.id}">
              ${isRegistered ? '✓ Registered' : 'RSVP'}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  static renderList(events, limit = 2, onCardClick, onRsvpClick) {
    const listToRender = limit > 0 ? events.slice(0, limit) : events;
    return `
      <div class="events-carousel">
        ${listToRender.map(e => new EventCardComponent(e, onCardClick, onRsvpClick).render()).join('')}
      </div>
    `;
  }

  static bindEvents(container, events, onCardClick, onRsvpClick) {
    const cards = container.querySelectorAll('.event-card');
    cards.forEach(card => {
      const id = card.getAttribute('data-event-id');
      const event = events.find(e => e.id === id);

      // Detail click
      const detailLink = card.querySelector('.btn-event-details');
      if (detailLink) {
        detailLink.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (event && onCardClick) onCardClick(event);
        });
      }

      card.addEventListener('click', (ev) => {
        if (!ev.target.closest('.btn-rsvp')) {
          if (event && onCardClick) onCardClick(event);
        }
      });

      // RSVP click
      const rsvpBtn = card.querySelector('.btn-rsvp');
      if (rsvpBtn) {
        rsvpBtn.addEventListener('click', (ev) => {
          ev.stopPropagation();
          if (event && onRsvpClick) onRsvpClick(event);
        });
      }
    });
  }
}
