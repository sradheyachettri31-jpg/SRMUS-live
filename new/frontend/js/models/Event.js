/**
 * Event Data Model
 */
export class Event {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.date = data.date || '';
    this.date_formatted = data.date_formatted || '';
    this.time = data.time || '';
    this.location = data.location || '';
    this.category = data.category || 'General';
    this.attendees_count = data.attendees_count || 0;
    this.max_capacity = data.max_capacity || 500;
    this.is_registered = data.is_registered || false;
    this.tag = data.tag || 'Upcoming';
    this.banner_theme = data.banner_theme || 'maroon';
  }

  getMonthAbbreviation() {
    if (this.date_formatted) {
      const match = this.date_formatted.match(/^[A-Za-z]+/);
      if (match) return match[0].substring(0, 3).toUpperCase();
    }
    if (this.date) {
      const d = new Date(this.date);
      return d.toLocaleDateString('en-US', { month: 'short' }).toUpperCase();
    }
    return 'APR';
  }

  getDayNumber() {
    if (this.date_formatted) {
      const match = this.date_formatted.match(/\d+/);
      if (match) return match[0];
    }
    if (this.date) {
      const d = new Date(this.date);
      return d.getDate();
    }
    return '18';
  }
}
