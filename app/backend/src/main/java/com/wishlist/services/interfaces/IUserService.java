package com.wishlist.services.interfaces;

import com.wishlist.dto.TokenRefreshRequestDTO;
import com.wishlist.dto.TokenRefreshResponseDTO;
import com.wishlist.models.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User createUser(User user);
    User getUserById(String id);
    User updateUser(User user);
    void deleteUserById(String id);
    User getUserByEmail(String email);
    TokenRefreshResponseDTO refreshTokenFunction(TokenRefreshRequestDTO tokenRefreshRequestDTO) throws Exception;
}
