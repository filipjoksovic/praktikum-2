package com.wishlist.services.interfaces;

import com.wishlist.dto.AccountSetupDTO;
import com.wishlist.dto.FullUserDetailsDTO;
import com.wishlist.dto.TokenRefreshRequestDTO;
import com.wishlist.dto.TokenRefreshResponseDTO;
import com.wishlist.exceptions.AccountSetupFailedException;
import com.wishlist.models.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User createUser(User user);
    User getUserById(String id);
    User updateUser(User user);
    void deleteUserById(String id);
    User getUserByEmail(String email);
    FullUserDetailsDTO setupAccount(AccountSetupDTO dto) throws AccountSetupFailedException;
    TokenRefreshResponseDTO refreshTokenFunction(TokenRefreshRequestDTO tokenRefreshRequestDTO) throws Exception;
}
