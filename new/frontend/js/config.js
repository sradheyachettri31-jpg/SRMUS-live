/**
 * SRM US Live - Application Configuration
 */

const isLocalServer = window.location.protocol.startsWith('http');

export const CONFIG = {
  APP_NAME: 'SRM US Live',
  APP_SUBTITLE: 'Stay updated with your university',
  VERSION: '1.0.0 (Prototype)',
  UNIVERSITY: 'SRM University Sikkim',
  CAMPUS: '5th Mile, Tadong, Gangtok, East Sikkim',
  LOGO_URL: 'assets/images/srm_logo.jpg',
  LOGO_REMOTE_URL: 'https://www.iaspaper.net/wp-content/uploads/2018/10/SRM-University-Sikkim-150x150.jpg',
  
  // API endpoints config
  API_BASE_URL: isLocalServer ? `${window.location.origin}/api` : 'http://localhost:8080/api',
  USE_MOCK_FALLBACK: true, // Gracefully falls back to mock data if REST API is offline or opened via file://

  // UI Categories & Labels
  NOTICE_CATEGORIES: ['All', 'Academic', 'Examination', 'Placement', 'Campus Life'],
  EVENT_CATEGORIES: ['All', 'Hackathon', 'Workshop', 'Tech Fest', 'Sports'],

  // SRM Brand Palette
  COLORS: {
    maroon: '#8A1538',
    maroonDark: '#660C24',
    maroonLight: '#B51B45',
    gold: '#D97706',
    navy: '#0F172A',
    slate: '#334155'
  }
};
