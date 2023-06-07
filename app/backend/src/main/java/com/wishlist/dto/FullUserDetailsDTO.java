package com.wishlist.dto;

import com.wishlist.models.User;

public class FullUserDetailsDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String email;
    private String dob;

    public FullUserDetailsDTO(String id, String firstName, String lastName, String email, String dob) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.dob = dob;
    }

    public static FullUserDetailsDTO to(User user) {
        return new FullUserDetailsDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), user.getDob());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDob() {

        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }

    @Override
    public String toString() {
        return "FullUserDetailsDTO{" +
                "id='" + id + '\'' +
                ", firstName='" + firstName + '\'' +
                ", lastName='" + lastName + '\'' +
                ", dob='" + dob + '\'' +
                '}';
    }
}
