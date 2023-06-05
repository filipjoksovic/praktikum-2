package com.wishlist.dto;

public class UserEmailsDTO {
    private String[] emails;

    public UserEmailsDTO(String[] emails) {
        this.emails = emails;
    }

    public UserEmailsDTO() {
    }

    public String[] getEmails() {
        return emails;
    }

    public void setEmails(String[] emails) {
        this.emails = emails;
    }
}
