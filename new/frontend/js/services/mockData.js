/**
 * SRMUS Live - Data Layer & Mock Seeds
 * Department of Computer Applications • SRM University Sikkim
 */

export const MOCK_DATA = {
  student: {
    id: "srm_std_2025_089",
    name: "ANUP SAPKOTA",
    dob: "26/02/2007",
    dob_raw: "26022007",
    email: "anup.sapkota@srmist.edu.in",
    student_id: "25IT102020",
    reg_no: "25IT102020",
    course: "BCA",
    department: "Department of Computer Applications",
    semester: 2,
    batch: "2025 - 2028",
    campus: "SRM University Sikkim, 5th Mile Tadong, Gangtok",
    section: "BCA-A",
    roll_no: "24",
    cgpa: 8.7,
    attendance_rate: 85.0,
    profile_image: "",
    advisor: {
      name: "Dr. K. Senthil Kumar",
      designation: "Assistant Professor, Dept. of Computer Applications",
      email: "senthil.k@srmist.edu.in"
    }
  },

  campusSlides: [
    {
      id: 1,
      image: "assets/images/srm_building_front.png",
      title: "SRM University Sikkim",
      subtitle: "Main Campus Building • 5th Mile Tadong, Gangtok"
    },
    {
      id: 2,
      image: "assets/images/srm_campus_angle.png",
      title: "Academic Block & Computing Labs",
      subtitle: "Department of Computer Applications • BCA 2025-2028"
    },
    {
      id: 3,
      image: "assets/images/srm_meraki_fest.png",
      title: "MERAKI - Annual Talent Fest",
      subtitle: "Celebrating Innovation, Music, Art & Culture"
    }
  ],

  campusInfo: {
    university: "SRM University Sikkim",
    address: "5th Mile, Tadong, Gangtok, East Sikkim - 737102",
    recognition: "UGC Recognized • NAAC Accredited • AIU Member",
    academicSession: "Academic Year 2025 - 2028 (Even Semester)",
    department: "Department of Computer Applications",
    helpline: "+91 3592 231122 / 231123",
    email: "helpdesk@srmus.edu.in"
  },

  assignments: [
    {
      id: "asg_01",
      subject: "Data Structures using C++",
      code: "BCA201",
      title: "Assignment 1: Linked List & Binary Search Trees",
      dueDate: "15 March 2026",
      status: "Submitted",
      statusClass: "submitted",
      marks: "19/20"
    },
    {
      id: "asg_02",
      subject: "Database Management Systems",
      code: "BCA202",
      title: "Assignment 2: SQL Joins, Normalization & ER Diagrams",
      dueDate: "22 March 2026",
      status: "Pending",
      statusClass: "pending",
      marks: "--"
    },
    {
      id: "asg_03",
      subject: "Web Technologies & JavaScript",
      code: "BCA203",
      title: "Mini Project: Responsive Student Portal UI",
      dueDate: "30 March 2026",
      status: "In Progress",
      statusClass: "progress",
      marks: "--"
    },
    {
      id: "asg_04",
      subject: "Computer Networks",
      code: "BCA204",
      title: "Assignment 3: OSI Model & TCP/IP Packet Simulation",
      dueDate: "05 April 2026",
      status: "Upcoming",
      statusClass: "upcoming",
      marks: "--"
    }
  ],

  notes: [
    {
      id: "note_01",
      subject: "Data Structures using C++",
      code: "BCA201",
      unit: "Unit 1 & 2",
      title: "Complete Stack, Queue & Graph Algorithms Notes",
      faculty: "Prof. S. R. Raman",
      fileType: "PDF",
      size: "3.8 MB",
      date: "02 Mar 2026"
    },
    {
      id: "note_02",
      subject: "Database Management Systems",
      code: "BCA202",
      unit: "Unit 3",
      title: "Relational Algebra, SQL Triggers & Indexing Handbook",
      faculty: "Dr. V. Meenakshi",
      fileType: "PDF",
      size: "4.2 MB",
      date: "28 Feb 2026"
    },
    {
      id: "note_03",
      subject: "Web Technologies",
      code: "BCA203",
      unit: "Full Course",
      title: "HTML5, CSS3, ES6 JavaScript & DOM Manipulation Guide",
      faculty: "Dr. K. Senthil Kumar",
      fileType: "PDF",
      size: "5.6 MB",
      date: "25 Feb 2026"
    },
    {
      id: "note_04",
      subject: "Computer Networks",
      code: "BCA204",
      unit: "Unit 1 - 4",
      title: "Subnetting, IP Addressing & Routing Protocols Handout",
      faculty: "Prof. Ananya Sen",
      fileType: "PDF",
      size: "2.9 MB",
      date: "20 Feb 2026"
    }
  ]
};
