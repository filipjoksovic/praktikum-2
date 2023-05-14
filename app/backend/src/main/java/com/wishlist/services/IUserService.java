package com.wishlist.services;

import com.wishlist.models.User;

import java.util.List;

public interface IUserService {
    List<User> getAllUsers();
    User createUser(User user);
    User getUserById(String id);
    User updateUser(User user);
    void deleteUserById(String id);

}
