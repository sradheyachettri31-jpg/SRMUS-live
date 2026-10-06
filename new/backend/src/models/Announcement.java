package models;

public class Announcement {
    public String id;
    public String title;
    public String message;
    public String created_at;
    public String priority;
    public String type;
    public boolean active;

    public Announcement() {}

    public Announcement(String id, String title, String message, String createdAt, String priority) {
        this.id = id;
        this.title = title;
        this.message = message;
        this.created_at = createdAt;
        this.priority = priority;
    }
}
