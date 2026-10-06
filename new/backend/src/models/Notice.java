package models;

public class Notice {
    public String id;
    public String title;
    public String description;
    public String category;
    public String department;
    public String created_at;
    public String priority;
    public String attachment_url;
    public boolean is_read;

    public Notice() {}

    public Notice(String id, String title, String description, String category, String createdAt, String priority) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.created_at = createdAt;
        this.priority = priority;
    }
}
