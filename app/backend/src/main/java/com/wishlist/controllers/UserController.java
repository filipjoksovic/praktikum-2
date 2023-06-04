package com.wishlist.controllers;

import com.wishlist.dto.AccountSetupDTO;
import com.wishlist.dto.ApiError;
import com.wishlist.exceptions.AccountSetupFailedException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.models.User;
import com.wishlist.security.JwtValidator;
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

    @Autowired
    private JwtValidator jwtValidator;

/*    @GetMapping
    public List<User> getAll() {
        return userService.getAllUsers();
    }*/

/*    @PostMapping
    public User create(@RequestBody User user) {
        return userService.createUser(user);
    }*/

    @GetMapping("/{id}")
    public User findById(@PathVariable String id) throws UserDoesNotExistException {
        return userService.getUserById(id);
    }

    @PutMapping
    public ResponseEntity update(@RequestBody User user, @RequestHeader("Authorization") String jwt) {
        try{
            if(jwtValidator.validateUser(jwt, user.getId())){
                return new ResponseEntity(userService.updateUser(user), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("You do not have access to this user"), HttpStatus.UNAUTHORIZED);
            }
        }
        catch (Exception e){
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        userService.deleteUserById(id);
        try{
            if(jwtValidator.validateUser(jwt, id)){
                userService.deleteUserById(id);
            }
            else {
            }
        }
        catch (Exception e){
        }
    }


    @PutMapping("/account")
    public ResponseEntity<?> setupAccount(@RequestBody AccountSetupDTO dto, @RequestHeader("Authorization") String jwt) {
        try {
            if(jwtValidator.validateUser(jwt, dto.getId())){
                return new ResponseEntity(userService.setupAccount(dto), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("You do not have access to this user"), HttpStatus.UNAUTHORIZED);
            }
        } catch (AccountSetupFailedException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

}
