package com.wishlist.dto;

import com.wishlist.models.User;

public class FamilyMemberDTO {
    private String id;
    private String name;
    private String surname;
    private String email;
    private String familyId;

    public FamilyMemberDTO(String id, String name, String surname, String email, String familyId) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.familyId = familyId;
    }

    public static FamilyMemberDTO to(User user) {
        return new FamilyMemberDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), user.getFamilyId());
    }

    public static User from(User user) {
        //todo implement
        return null;
    }

    public FamilyMemberDTO() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }
}
