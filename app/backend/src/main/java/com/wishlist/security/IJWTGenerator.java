package com.wishlist.security;

import com.wishlist.models.User;

import java.util.Map;

public interface IJWTGenerator {
    Map<String, String> generateToken(User user);
    Map<String, String> generateRefreshToken(User user);
    String buildToken(User user, long expiration);
    String extractEmail(String token);
    boolean isTokenExpired(String token);
    boolean isTokenValid(String token, User user);
}
