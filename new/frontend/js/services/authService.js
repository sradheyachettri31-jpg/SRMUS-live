/**
 * SRM US Live - Authentication & Session Management Service
 * Provides persistent login, role determination, and profile completion tracking
 */

const STORAGE_SESSION_KEY = 'srm_us_live_session';
const STORAGE_USERS_KEY = 'srm_us_live_users_db';

// Default seed accounts
const DEFAULT_USERS = [
  {
    id: 'std_25it102020',
    student_id: '25IT102020',
    reg_no: '25IT102020',
    email: 'anup.sapkota@srmist.edu.in',
    password: '26022007',
    name: 'ANUP SAPKOTA',
    role: 'student',
    course: 'BCA',
    department: 'Department of Computer Applications',
    batch: '2025 - 2028',
    semester: 2,
    dob: '26/02/2007',
    dob_raw: '26022007',
    phone: '+91 98765 43210',
    attendance_rate: 88.0,
    cgpa: 8.9,
    section: 'BCA-A',
    roll_no: '24',
    advisor: {
      name: 'Dr. K. Senthil Kumar',
      designation: 'Assistant Professor, Dept. of Computer Applications',
      email: 'senthil.k@srmist.edu.in'
    },
    profileCompleted: true
  },
  {
    id: 'std_089',
    student_id: 'RA2511003010089',
    email: 'anup.sapkota@srmist.edu.in',
    password: '26022007',
    name: 'ANUP SAPKOTA',
    role: 'student',
    course: 'BCA',
    department: 'Department of Computer Applications',
    batch: '2025 - 2028',
    semester: 2,
    dob: '26/02/2007',
    dob_raw: '26022007',
    phone: '+91 98765 43210',
    attendance_rate: 88.0,
    cgpa: 8.9,
    section: 'BCA-A',
    roll_no: '24',
    advisor: {
      name: 'Dr. K. Senthil Kumar',
      designation: 'Assistant Professor, Dept. of Computer Applications',
      email: 'senthil.k@srmist.edu.in'
    },
    profileCompleted: true
  },
  {
    id: 'fac_88219',
    student_id: 'SRM-FAC-88219',
    faculty_id: 'SRM-FAC-88219',
    email: 'senthil.k@srmist.edu.in',
    password: 'faculty2026',
    name: 'Dr. K. Senthil Kumar',
    role: 'teacher',
    designation: 'BCA Class Advisor & Assistant Professor',
    department: 'Department of Computer Applications',
    campus: 'SRM University Sikkim, Gangtok',
    email_display: 'senthil.k@srmist.edu.in',
    phone: '+91 3592 231122',
    profileCompleted: true
  }
];

class AuthService {
  constructor() {
    this.initUserDatabase();
  }

  /**
   * Initialize local user database from localStorage or seed with defaults
   */
  initUserDatabase() {
    const stored = localStorage.getItem(STORAGE_USERS_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
    } else {
      try {
        const users = JSON.parse(stored);
        if (!users.some(u => u.student_id === '25IT102020')) {
          localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
        }
      } catch {
        localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
      }
    }
  }

  /**
   * Get all registered users
   */
  getUsers() {
    try {
      const users = JSON.parse(localStorage.getItem(STORAGE_USERS_KEY));
      return Array.isArray(users) && users.length ? users : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  }

  /**
   * Save updated users array to storage
   */
  saveUsers(users) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  }

  /**
   * Retrieve active session user from localStorage
   */
  getCurrentUser() {
    try {
      const session = JSON.parse(localStorage.getItem(STORAGE_SESSION_KEY));
      if (!session || !session.user) return null;
      // Refresh user record from latest DB
      const users = this.getUsers();
      const freshUser = users.find(u => u.student_id === session.user.student_id || u.email === session.user.email);
      return freshUser || session.user;
    } catch {
      return null;
    }
  }

  /**
   * Check if a user is currently authenticated
   */
  isLoggedIn() {
    return !!this.getCurrentUser();
  }

  /**
   * Check if current user has finished their profile setup
   */
  isProfileComplete() {
    const user = this.getCurrentUser();
    return user ? !!user.profileCompleted : false;
  }

  /**
   * Authenticate with University ID / Registration Number + Password
   * Strictly enforces: Reg No = 25IT102020, Password = 26022007
   */
  login(identifier, password) {
    if (!identifier || !password) {
      throw new Error('Please enter both REGISTRATION NO and PASSWORD.');
    }

    const cleanId = identifier.trim().toUpperCase();
    const cleanPass = password.trim();

    // Strict validation: only allow 25IT102020 with password 26022007
    if (cleanId !== '25IT102020' || cleanPass !== '26022007') {
      throw new Error('Access Denied: Invalid credentials! Only Registration No: 25IT102020 is authorized.');
    }

    const users = this.getUsers();
    let user = users.find(u => u.student_id === '25IT102020');
    if (!user) {
      user = DEFAULT_USERS[0];
    }

    // Save session
    const session = {
      user,
      token: 'srm_token_' + Date.now(),
      loginTime: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return user;
  }

  /**
   * Update profile fields and mark profile as completed
   */
  completeProfile(updatedFields) {
    const currentUser = this.getCurrentUser();
    if (!currentUser) {
      throw new Error('No active session found.');
    }

    const users = this.getUsers();
    const index = users.findIndex(u => u.student_id === currentUser.student_id || u.email === currentUser.email);

    const mergedUser = {
      ...currentUser,
      ...updatedFields,
      profileCompleted: true
    };

    if (index !== -1) {
      users[index] = mergedUser;
    } else {
      users.push(mergedUser);
    }

    this.saveUsers(users);

    // Update active session
    const session = {
      user: mergedUser,
      token: 'srm_token_' + Date.now(),
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_SESSION_KEY, JSON.stringify(session));

    return mergedUser;
  }

  /**
   * Terminate active session
   */
  logout() {
    localStorage.removeItem(STORAGE_SESSION_KEY);
  }

  /**
   * Provide preconfigured demo accounts for fast 1-click testing
   */
  getDemoCredentials() {
    return [
      {
        label: 'Student (Anup Sapkota)',
        id: '25IT102020',
        password: '26022007',
        badge: 'Authorized',
        role: 'student'
      }
    ];
  }
}

export const authService = new AuthService();
