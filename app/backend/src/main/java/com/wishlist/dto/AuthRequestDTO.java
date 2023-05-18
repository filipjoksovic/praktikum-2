package com.wishlist.dto;

import com.wishlist.models.User;

public class AuthRequestDTO {
    private String email;
    private String password;

    public AuthRequestDTO() {
    }

    public static User toUser(AuthRequestDTO dto) {
        return new User(dto.email, dto.password);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
