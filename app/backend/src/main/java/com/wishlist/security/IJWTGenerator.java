package com.wishlist.security;

import com.wishlist.models.User;

import java.util.Map;

public interface IJWTGenerator {
    Map<String, String> generateToken(User user);
}
