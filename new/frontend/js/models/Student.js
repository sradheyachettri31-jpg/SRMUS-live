/**
 * Student Data Model - SRM US Live
 */
export class Student {
  constructor(data = {}) {
    this.id = data.id || 'srm_std_2025_089';
    this.name = data.name || 'ANUP SAPKOTA';
    this.dob = data.dob || '26/02/2007';
    this.dob_raw = data.dob_raw || '26022007';
    this.email = data.email || 'anup.sapkota@srmist.edu.in';
    this.student_id = data.student_id || '25IT.......';
    this.course = data.course || 'BCA';
    this.department = data.department || 'Department of Computer Applications';
    this.semester = data.semester || 2;
    this.batch = data.batch || '2025 - 2028';
    this.campus = data.campus || 'SRM Main Campus, Kattankulathur';
    this.section = data.section || 'BCA-A';
    this.roll_no = data.roll_no || '24';
    this.cgpa = data.cgpa !== undefined ? data.cgpa : 8.7;
    this.attendance_rate = data.attendance_rate !== undefined ? data.attendance_rate : 85.0;
    this.profile_image = data.profile_image || '';
    this.advisor = data.advisor || {
      name: 'mr Samir limboo',
      designation: 'Assistant Professor, Dept. of Computer Applications',
      email: 'samirlimboo@.gmal.com'
    };
  }

  getFirstName() {
    return this.name.split(' ')[0] || 'Student';
  }

  getFormattedRegNumber() {
    return this.student_id;
  }
}
