package com.wishlist.dto;

import com.wishlist.models.User;
import com.wishlist.models.UserRoleEnum;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AuthRequestDTO {

    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    private String email;
    private String password;


    public AuthRequestDTO() {

    }


    public static User toUser(AuthRequestDTO dto) {
        String encodedPassword = passwordEncoder.encode(dto.getPassword());
        return new User(dto.email, encodedPassword, UserRoleEnum.ROLE_FULL_USER);
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
