# SRMUS Live - University Student & Faculty Application
**Department of Computer Applications • BCA (2025 - 2028)** • SRM Institute of Science and Technology

---

## 🏛️ Project Overview

**SRMUS Live** is a clean, modern university web portal designed for SRM students and faculty. It features:
- **Top Left Corner**: **SRMUS Live** brand crest & title
- **Background Aesthetics**: Soft white-yellowish tone with subtle pale-blue gradient atmosphere
- **4-Second Sliding Carousel**: Automatic campus & lab image transitions
- **4 Core Action Sections**:
  1. 👤 **Student Login**: Registration No. & Password authentication
  2. 🎓 **Teacher Login**: Faculty & Advisor portal
  3. 📝 **ASSIGNMENT**: Course tasks, submissions & grades
  4. 📚 **NOTES**: Downloadable lecture notes, units & PDF materials
- **Student Profile**: Single-touch access to student **ANUP SAPKOTA** (BCA 2025-2028)
- **Zero Notification Clutter**: Clean, focused presentation

---

## 📁 1. Project Structure

```
c:\CAPSTONE PROJECT 2026/
│
├── backend/                              # Backend / Data Layer
│   ├── src/
│   │   ├── Server.java                   # Native Java HTTP & REST API Server
│   │   └── models/
│   │       ├── Student.java              # Student entity (ANUP SAPKOTA)
│   │       ├── Notice.java               # University circular entity
│   │       ├── Event.java                # Campus event entity
│   │       └── Announcement.java         # Alert broadcast entity
│   └── data/
│       ├── students.json                 # ANUP SAPKOTA (BCA, 2025-2028, Attd: 85%, CGPA: 8.7)
│       ├── notices.json                  # Academic circulars
│       ├── events.json                   # Campus events
│       ├── announcements.json            # Alerts
│       └── academics.json                # Attendance & timetable
│
├── frontend/                             # Client Presentation
│   ├── index.html                        # Main viewport & shell
│   ├── css/
│   │   ├── styles.css                    # White-yellowish + soft blue theme & layout
│   │   └── components.css                # Card & modal styles
│   └── js/
│       ├── app.js                        # App Controller & Section Router
│       ├── config.js                     # API endpoint configuration
│       ├── models/
│       │   └── Student.js                # ANUP SAPKOTA domain model
│       ├── services/
│       │   ├── apiService.js             # Data service with auto fallback
│       │   └── mockData.js               # BCA seed data (Assignments, Notes, Slides)
│       ├── components/
│       │   └── ImageSlider.js            # 4-second auto-sliding carousel
│       └── screens/
│           ├── HomeScreen.js             # Main landing (Slider + 4 Sections)
│           ├── StudentLoginScreen.js     # Reg No & Password form
│           ├── StudentDetailsScreen.js   # ANUP SAPKOTA profile (85% Attd, 8.7 CGPA)
│           ├── TeacherLoginScreen.js     # Faculty ID & Password form
│           ├── TeacherPortalScreen.js    # BCA Staff Advisor Dashboard
│           ├── AssignmentScreen.js       # BCA Course Assignments
│           └── NotesScreen.js            # BCA Lecture Notes & PDFs
│
├── start_app.bat                         # One-click Windows runner
├── server.ps1                            # PowerShell REST server
└── README.md                             # Technical documentation
```

---

## 🎓 2. Student Details Profile

When logging in via **Student Login** with `REGISTRATION NO` and `PASSWORD`, the app displays:

| Field | Value |
|---|---|
| **Student Name** | **ANUP SAPKOTA** |
| **Registration No.** | `RA2511003010089` |
| **Date of Birth (DOB)** | `26/02/2007` (`26022007`) |
| **Course** | **BCA** (Bachelor of Computer Applications) |
| **Academic Year** | **2025 - 2028** |
| **Current Semester** | **2nd Semester** |
| **Attendance** | **85%** (Visual Progress Track) |
| **CGPA** | **8.7 / 10.0** |
| **Faculty Advisor** | Dr. K. Senthil Kumar (Dept. of Computer Applications) |

---

## 🚀 3. How to Run the Project

### Option A: Direct Browser Launch
Open [frontend/index.html](file:///c:/CAPSTONE%20PROJECT%202026/frontend/index.html) directly in Chrome, Edge, or Firefox.

### Option B: One-Click Startup
Double-click `start_app.bat` to run the Java HTTP server and open the web portal at `http://localhost:8080/`.

---

## ✨ 4. Main User Flows

1. **Home Screen**:
   - Top-left header displays **SRMUS Live**.
   - Campus images auto-slide every **4 seconds**.
   - 4 Action cards: **Student Login**, **Teacher Login**, **ASSIGNMENT**, **NOTES**.
2. **Student Login Flow**:
   - Click **Student Login** -> Enter `REGISTRATION NO` & `PASSWORD` -> Click **Login to Student Profile**.
   - Displays **ANUP SAPKOTA** profile with DOB `26022007`, Course `BCA`, Year `2025-2028`, Attendance `85%`, and CGPA `8.7`.
3. **Teacher Login Flow**:
   - Click **Teacher Login** -> Enter Faculty ID & Password -> Opens Faculty Advisor Portal.
4. **ASSIGNMENT**:
   - Lists BCA assignments (Data Structures, DBMS, Web Tech, Computer Networks) with due dates and submission statuses.
5. **NOTES**:
   - Downloadable lecture notes and unit PDFs for BCA students.
