/**
 * Notice Data Model
 */
export class Notice {
  constructor(data = {}) {
    this.id = data.id || '';
    this.title = data.title || '';
    this.description = data.description || '';
    this.category = data.category || 'Academic';
    this.department = data.department || 'SRM Administration';
    this.created_at = data.created_at || new Date().toISOString();
    this.priority = data.priority || 'Normal';
    this.attachment_url = data.attachment_url || '#';
    this.is_read = data.is_read || false;
  }

  getFormattedDate() {
    try {
      const date = new Date(this.created_at);
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return this.created_at;
    }
  }

  getCategoryClass() {
    const map = {
      'examination': 'cat-examination',
      'academic': 'cat-academic',
      'placement': 'cat-placement',
      'campus life': 'cat-campus-life'
    };
    return map[this.category.toLowerCase()] || 'cat-academic';
  }
}
