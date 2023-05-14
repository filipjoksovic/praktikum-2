package com.wishlist.dto;

import com.wishlist.models.User;

public class AuthResponseDTO {
    public String id;
    public String name;
    public String surname;
    public String email;
    public String token;

    public AuthResponseDTO(String id, String name, String surname, String email, String token) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.token = token;
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

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public static AuthResponseDTO to(User user, String token) {
        return new AuthResponseDTO(user.getId(), user.getName(), user.getSurname(), user.getEmail(), token);
    }
}
