package com.wishlist.dto;

import com.wishlist.models.User;

import java.time.LocalDate;

public class AccountSetupDTO {
    private String id;
    private String firstName;
    private String lastName;
    private String dob;

    public AccountSetupDTO() {
    }

    public AccountSetupDTO(String id, String firstName, String lastName, String dateOfBirth) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.dob = dateOfBirth;
    }

    public AccountSetupDTO to(User user) {
        return new AccountSetupDTO(user.getId(), user.getName(), user.getSurname(), user.getDob().toString());
    }

    public User from(AccountSetupDTO dto) {
        User user = new User();
        user.setId(dto.getId());
        user.setName(dto.getFirstName());
        user.setSurname(dto.getLastName());
        user.setDob(dto.getDob());
        return user;
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

    public String getDob() {
        return dob;
    }

    public void setDob(String dob) {
        this.dob = dob;
    }
}
