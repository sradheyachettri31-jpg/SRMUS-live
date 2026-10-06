/**
 * SRM US Live - Unified API & Data Service Layer
 * Fetches from REST API backend with seamless fallback to mock data
 */

import { CONFIG } from '../config.js';
import { Student } from '../models/Student.js';
import { Notice } from '../models/Notice.js';
import { Event } from '../models/Event.js';
import { Announcement } from '../models/Announcement.js';
import { MOCK_DATA } from './mockData.js';

class ApiService {
  constructor() {
    this.isBackendOnline = false;
    this.storageKeyRsvps = 'srm_us_live_rsvps';
    this.storageKeyReadNotices = 'srm_us_live_read_notices';
  }

  /**
   * Check connection to backend REST API
   */
  async checkBackendHealth() {
    try {
      const res = await fetch(`${CONFIG.API_BASE_URL}/health`, { 
        method: 'GET',
        headers: { 'Accept': 'application/json' },
        signal: AbortSignal.timeout(1800)
      });
      if (res.ok) {
        this.isBackendOnline = true;
        console.log('✅ Connected to SRM US Live REST Backend Server');
        return true;
      }
    } catch (err) {
      this.isBackendOnline = false;
      console.warn('ℹ️ Running in Autonomous Client Mode (Local Mock Layer Active)');
    }
    return false;
  }

  /**
   * Fetch current authenticated student profile
   */
  async getStudent() {
    try {
      if (this.isBackendOnline) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/student`);
        if (res.ok) {
          const data = await res.json();
          return new Student(data.student);
        }
      }
    } catch (err) {
      console.error('API Error (getStudent), falling back to mock:', err);
    }
    return new Student(MOCK_DATA.student);
  }

  /**
   * Fetch university notices
   */
  async getNotices() {
    let rawNotices = [];
    try {
      if (this.isBackendOnline) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/notices`);
        if (res.ok) {
          const data = await res.json();
          rawNotices = data.notices || [];
        }
      }
    } catch (err) {
      console.error('API Error (getNotices), falling back to mock:', err);
    }

    if (!rawNotices || rawNotices.length === 0) {
      rawNotices = MOCK_DATA.notices;
    }

    // Merge read state from local storage
    const readIds = this.getReadNoticeIds();
    return rawNotices.map(n => {
      const notice = new Notice(n);
      if (readIds.includes(notice.id)) {
        notice.is_read = true;
      }
      return notice;
    });
  }

  /**
   * Fetch university events
   */
  async getEvents() {
    let rawEvents = [];
    try {
      if (this.isBackendOnline) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/events`);
        if (res.ok) {
          const data = await res.json();
          rawEvents = data.events || [];
        }
      }
    } catch (err) {
      console.error('API Error (getEvents), falling back to mock:', err);
    }

    if (!rawEvents || rawEvents.length === 0) {
      rawEvents = MOCK_DATA.events;
    }

    // Merge RSVP state from local storage
    const rsvpIds = this.getRsvpEventIds();
    return rawEvents.map(e => {
      const evt = new Event(e);
      if (rsvpIds.includes(evt.id)) {
        evt.is_registered = true;
      }
      return evt;
    });
  }

  /**
   * Fetch urgent announcements
   */
  async getAnnouncements() {
    try {
      if (this.isBackendOnline) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/announcements`);
        if (res.ok) {
          const data = await res.json();
          return (data.announcements || []).map(a => new Announcement(a));
        }
      }
    } catch (err) {
      console.error('API Error (getAnnouncements), falling back to mock:', err);
    }
    return (MOCK_DATA.announcements || []).map(a => new Announcement(a));
  }

  /**
   * Fetch academics (Attendance and Timetable)
   */
  async getAcademics() {
    try {
      if (this.isBackendOnline) {
        const res = await fetch(`${CONFIG.API_BASE_URL}/academics`);
        if (res.ok) {
          const data = await res.json();
          return data.academics || MOCK_DATA.academics;
        }
      }
    } catch (err) {
      console.error('API Error (getAcademics), falling back to mock:', err);
    }
    return MOCK_DATA.academics;
  }

  /**
   * RSVP for an event
   */
  async toggleEventRsvp(eventId) {
    const rsvpIds = this.getRsvpEventIds();
    const isCurrentlyRegistered = rsvpIds.includes(eventId);
    let updatedList;
    let newStatus = false;

    if (isCurrentlyRegistered) {
      updatedList = rsvpIds.filter(id => id !== eventId);
      newStatus = false;
    } else {
      updatedList = [...rsvpIds, eventId];
      newStatus = true;
    }

    localStorage.setItem(this.storageKeyRsvps, JSON.stringify(updatedList));

    // Try posting to backend if online
    if (this.isBackendOnline) {
      try {
        await fetch(`${CONFIG.API_BASE_URL}/events/rsvp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ eventId, isRegistered: newStatus })
        });
      } catch (e) {
        console.warn('RSVP backend sync error:', e);
      }
    }

    return newStatus;
  }

  getRsvpEventIds() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKeyRsvps) || '["evt_2026_101"]');
    } catch {
      return ['evt_2026_101'];
    }
  }

  getReadNoticeIds() {
    try {
      return JSON.parse(localStorage.getItem(this.storageKeyReadNotices) || '["not_2026_003","not_2026_004"]');
    } catch {
      return [];
    }
  }

  markNoticeRead(noticeId) {
    const readIds = this.getReadNoticeIds();
    if (!readIds.includes(noticeId)) {
      readIds.push(noticeId);
      localStorage.setItem(this.storageKeyReadNotices, JSON.stringify(readIds));
    }
  }
}

export const apiService = new ApiService();
