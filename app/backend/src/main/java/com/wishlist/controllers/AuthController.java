package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.models.User;
import com.wishlist.services.IAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    Logger logger = Logger.getLogger(AuthController.class.getName());

    private final IAuth authService;

    @Autowired
    public AuthController(IAuth authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequestDTO requestDTO) throws Exception {
        logger.info("Received a login request with email: " + requestDTO.getEmail() + " and password: " + requestDTO.getPassword());
        try {
            AuthResponseDTO loggedIn = authService.login(requestDTO);
            return new ResponseEntity<>(loggedIn, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRequestDTO requestDTO) {
        try {
            User registered = authService.register(requestDTO);
            return new ResponseEntity<>(registered, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
