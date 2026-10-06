/**
 * Announcement Data Model
 */
export class Announcement {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.message = data.message || '';
    this.created_at = data.created_at || new Date().toISOString();
    this.priority = data.priority || 'Normal';
    this.type = data.type || 'general';
    this.active = data.active !== undefined ? data.active : true;
  }
}
