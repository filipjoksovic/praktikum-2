package com.wishlist.dto;

public class TokenRefreshRequestDTO {
    private String refreshToken;

    public TokenRefreshRequestDTO(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public TokenRefreshRequestDTO() {
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
