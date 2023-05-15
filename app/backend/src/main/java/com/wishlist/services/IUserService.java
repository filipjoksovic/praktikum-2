package com.wishlist.services;

import com.wishlist.dto.AccountSetupDTO;
import com.wishlist.dto.FullUserDetailsDTO;
import com.wishlist.exceptions.AccountSetupFailedException;
import com.wishlist.models.User;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();

    User createUser(User user);

    User getUserById(String id);

    User updateUser(User user);

    void deleteUserById(String id);

    FullUserDetailsDTO setupAccount(AccountSetupDTO dto) throws AccountSetupFailedException;
}
