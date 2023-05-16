package com.wishlist.dto;

import com.wishlist.models.User;

public class AuthResponseDTO {
    public String id;
    public String name;
    public String surname;
    public String email;
    public String accessToken;
    public String refreshToken;

    public AuthResponseDTO(String id, String name, String surname, String email, String accessToken) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.accessToken = accessToken;
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

    public static AuthResponseDTO to(User user, String accessToken) {
        return new AuthResponseDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), accessToken);
    }

}
