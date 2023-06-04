package com.wishlist.services.dto;

public class JoinRequestsDTO {
    private String id;
    private String name;
    private String surname;
    private String email;
    private String familyName;
    private String createdAt;

    public JoinRequestsDTO(String name, String surname, String email, String familyName) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.familyName = familyName;
    }

    public JoinRequestsDTO(String id, String name, String surname, String email, String familyName, String createdAt) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.familyName = familyName;
        this.createdAt = createdAt;
    }


    public JoinRequestsDTO() {
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

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
