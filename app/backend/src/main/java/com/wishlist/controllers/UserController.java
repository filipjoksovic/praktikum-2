package com.wishlist.controllers;

import com.wishlist.dto.AccountSetupDTO;
import com.wishlist.dto.ApiError;
import com.wishlist.exceptions.AccountSetupFailedException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.models.User;
import com.wishlist.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }

    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }

    @GetMapping("/{id}")
    public User findById(@PathVariable String id) throws UserDoesNotExistException {
        return userService.getUserById(id);
    }

    @PutMapping
    public User update(@RequestBody User user) {
        return userService.updateUser(user);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id) {
        userService.deleteUserById(id);
    }


    @PutMapping("/account")
    public ResponseEntity<?> setupAccount(@RequestBody AccountSetupDTO dto) {
        try {
            return new ResponseEntity(userService.setupAccount(dto), HttpStatus.OK);
        } catch (AccountSetupFailedException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }


}
