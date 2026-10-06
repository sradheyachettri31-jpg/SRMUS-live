package models;

public class Student {
    public String id;
    public String name;
    public String email;
    public String student_id;
    public String course;
    public String specialization;
    public int semester;
    public String batch;
    public String campus;
    public String section;
    public String roll_no;
    public double cgpa;
    public double attendance_rate;
    public String profile_image;

    public Student() {}

    public Student(String id, String name, String email, String studentId, String course, int semester, String profileImage) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.student_id = studentId;
        this.course = course;
        this.semester = semester;
        this.profile_image = profileImage;
    }
}
