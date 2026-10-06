/**
 * Events Screen
 * Full Campus Event Calendar & RSVP Management
 */

import { EventCardComponent } from '../components/EventCard.js';
import { CONFIG } from '../config.js';

export class EventsScreen {
  constructor({ events, callbacks }) {
    this.allEvents = events || [];
    this.filteredEvents = [...this.allEvents];
    this.selectedCategory = 'All';
    this.callbacks = callbacks || {};
  }

  filterData() {
    this.filteredEvents = this.allEvents.filter(evt => {
      if (this.selectedCategory === 'All') return true;
      return evt.category.toLowerCase() === this.selectedCategory.toLowerCase();
    });
  }

  render() {
    this.filterData();

    return `
      <div class="screen-events animate-fade-in">
        <div style="margin-bottom: 14px; padding-top: 6px;">
          <h1 style="font-size: 22px; font-weight: 800; color: var(--srm-navy); letter-spacing: -0.5px;">Campus Events</h1>
          <p style="font-size: 12px; color: var(--srm-muted);">Hackathons, guest lectures, cultural fests & tournaments</p>
        </div>

        <!-- Category Filters -->
        <div class="filter-chips-bar" id="events-filter-bar">
          ${CONFIG.EVENT_CATEGORIES.map(cat => `
            <button class="filter-chip ${this.selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Events List -->
        <div id="events-items-container" style="margin-top: 6px;">
          ${this.filteredEvents.length > 0
            ? EventCardComponent.renderList(this.filteredEvents, -1, this.callbacks.onEventClick, this.callbacks.onRsvpClick)
            : `<div style="text-align: center; padding: 40px 20px; color: var(--srm-muted); background: white; border-radius: 16px; border: 1px dashed var(--border-light);">
                 <p style="font-weight: 600; font-size: 13px;">No events listed in this category</p>
               </div>`
          }
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    const chips = container.querySelectorAll('#events-filter-bar .filter-chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedCategory = chip.getAttribute('data-cat');
        this.filterData();
        this.updateListOnly(container);
      });
    });

    this.bindCardEvents(container);
  }

  updateListOnly(container) {
    const listContainer = container.querySelector('#events-items-container');
    if (listContainer) {
      listContainer.innerHTML = this.filteredEvents.length > 0 
        ? EventCardComponent.renderList(this.filteredEvents, -1, this.callbacks.onEventClick, this.callbacks.onRsvpClick)
        : `<div style="text-align: center; padding: 40px 20px; color: var(--srm-muted); background: white; border-radius: 16px; border: 1px dashed var(--border-light);">
             <p style="font-weight: 600; font-size: 13px;">No events listed in this category</p>
           </div>`;
      this.bindCardEvents(container);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  bindCardEvents(container) {
    EventCardComponent.bindEvents(container, this.filteredEvents, this.callbacks.onEventClick, this.callbacks.onRsvpClick);
  }
}
