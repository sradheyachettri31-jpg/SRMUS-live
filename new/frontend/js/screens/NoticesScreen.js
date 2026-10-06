/**
 * Notices Screen
 * Comprehensive Circulars and Announcements with Search & Category Filters
 */

import { NoticeCardComponent } from '../components/NoticeCard.js';
import { CONFIG } from '../config.js';

export class NoticesScreen {
  constructor({ notices, callbacks }) {
    this.allNotices = notices || [];
    this.filteredNotices = [...this.allNotices];
    this.selectedCategory = 'All';
    this.searchQuery = '';
    this.callbacks = callbacks || {};
  }

  filterData() {
    this.filteredNotices = this.allNotices.filter(notice => {
      const matchCat = (this.selectedCategory === 'All') || 
                       (notice.category.toLowerCase() === this.selectedCategory.toLowerCase());
      const matchQuery = !this.searchQuery || 
                         notice.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         notice.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                         (notice.department && notice.department.toLowerCase().includes(this.searchQuery.toLowerCase()));
      return matchCat && matchQuery;
    });
  }

  render() {
    this.filterData();

    return `
      <div class="screen-notices animate-fade-in">
        <div style="margin-bottom: 14px; padding-top: 6px;">
          <h1 style="font-size: 22px; font-weight: 800; color: var(--srm-navy); letter-spacing: -0.5px;">University Notices</h1>
          <p style="font-size: 12px; color: var(--srm-muted);">Official circulars, exam notifications, and placement alerts</p>
        </div>

        <!-- Search Bar -->
        <div class="search-bar-container">
          <i data-lucide="search" style="width: 16px; height: 16px; color: var(--srm-muted);"></i>
          <input type="text" id="notices-search-input" class="search-input" placeholder="Search notices, exams, circulars..." value="${this.searchQuery}" />
        </div>

        <!-- Category Filters -->
        <div class="filter-chips-bar" id="notices-filter-bar">
          ${CONFIG.NOTICE_CATEGORIES.map(cat => `
            <button class="filter-chip ${this.selectedCategory === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat}
            </button>
          `).join('')}
        </div>

        <!-- Notice Cards List -->
        <div id="notices-items-container">
          ${this.filteredNotices.length > 0 
            ? NoticeCardComponent.renderList(this.filteredNotices, -1, this.callbacks.onNoticeClick)
            : `<div style="text-align: center; padding: 40px 20px; color: var(--srm-muted); background: white; border-radius: 16px; border: 1px dashed var(--border-light); margin-top: 10px;">
                 <i data-lucide="file-question" style="width: 36px; height: 36px; margin: 0 auto 10px; color: #cbd5e1;"></i>
                 <p style="font-weight: 600; font-size: 13px;">No notices found for "${this.selectedCategory}"</p>
               </div>`
          }
        </div>
      </div>
    `;
  }

  bindEvents(container) {
    // Search input binding
    const searchInput = container.querySelector('#notices-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.searchQuery = e.target.value;
        this.filterData();
        this.updateListOnly(container);
      });
    }

    // Category chips binding
    const chips = container.querySelectorAll('#notices-filter-bar .filter-chip');
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
    const listContainer = container.querySelector('#notices-items-container');
    if (listContainer) {
      listContainer.innerHTML = this.filteredNotices.length > 0 
        ? NoticeCardComponent.renderList(this.filteredNotices, -1, this.callbacks.onNoticeClick)
        : `<div style="text-align: center; padding: 40px 20px; color: var(--srm-muted); background: white; border-radius: 16px; border: 1px dashed var(--border-light); margin-top: 10px;">
             <p style="font-weight: 600; font-size: 13px;">No notices match your criteria</p>
           </div>`;
      this.bindCardEvents(container);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  bindCardEvents(container) {
    NoticeCardComponent.bindEvents(container, this.filteredNotices, this.callbacks.onNoticeClick);
  }
}
