package models;

public class Event {
    public String id;
    public String title;
    public String description;
    public String date;
    public String date_formatted;
    public String time;
    public String location;
    public String category;
    public int attendees_count;
    public int max_capacity;
    public boolean is_registered;
    public String tag;
    public String banner_theme;

    public Event() {}

    public Event(String id, String title, String description, String date, String time, String location, String category) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.date = date;
        this.time = time;
        this.location = location;
        this.category = category;
    }
}
