package com.wishlist.dto;

public class EmailSenderDTO {

    public String to;
    public String body;
    public String subject;

    public EmailSenderDTO(String to, String body, String subject) {
        this.to = to;
        this.body = body;
        this.subject = subject;
    }

    public String getTo() {
        return to;
    }

    public void setTo(String to) {
        this.to = to;
    }

    public String getBody() {
        return body;
    }

    public void setBody(String body) {
        this.body = body;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }
}
