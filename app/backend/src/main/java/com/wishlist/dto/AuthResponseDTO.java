package com.wishlist.dto;

import com.wishlist.models.User;

public class AuthResponseDTO {
    private String id;
    private String name;
    private String surname;
    private String email;
    private String accessToken;
    private String refreshToken;
    private String familyId;

    private boolean isOwner;

    public AuthResponseDTO(String id, String name, String surname, String email, String accessToken, String refreshToken) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
    }

    public AuthResponseDTO(String id, String name, String surname, String email, String accessToken, String refreshToken, String familyId, boolean isOwner) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.familyId = familyId;
        this.isOwner = isOwner;
    }

    public AuthResponseDTO() {
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

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public boolean isOwner() {
        return isOwner;
    }

    public void setOwner(boolean owner) {
        this.isOwner = owner;
    }

    public static AuthResponseDTO to(User user, String accessToken, String refreshToken, boolean isOwner) {
        return new AuthResponseDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), accessToken, refreshToken, user.getFamilyId(), isOwner);
    }
}
