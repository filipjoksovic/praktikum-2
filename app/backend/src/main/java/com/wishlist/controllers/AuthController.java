package com.wishlist.controllers;

import com.wishlist.dto.*;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.facade.FamilyFacade;
import com.wishlist.models.User;
import com.wishlist.security.IJWTGenerator;
import com.wishlist.services.interfaces.IAuth;
import com.wishlist.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    Logger logger = Logger.getLogger(AuthController.class.getName());
    private final IAuth authService;
    private final IJWTGenerator jwtGenerator;
    private final IUserService userService;


    @Autowired
    public AuthController(IAuth authService, IJWTGenerator ijwtGenerator, IUserService userService, FamilyFacade familyFacade) {
        this.authService = authService;
        this.jwtGenerator = ijwtGenerator;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequestDTO requestDTO) throws Exception {
        logger.info("Received a login request with email: " + requestDTO.getEmail() + " and password: " + requestDTO.getPassword());
        try {
            AuthResponseDTO loggedIn = authService.login(requestDTO);
            logger.info("User with id " + loggedIn.id + " found. Sending 200 OK");
            return new ResponseEntity<>(loggedIn, HttpStatus.OK);
        } catch (Exception e) {
            logger.info("User with NOT found. Sending 500 INTERNAL_SERVER_ERROR");
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


    @PostMapping("/refresh-token")
    public ResponseEntity refreshToken(@RequestBody TokenRefreshRequestDTO tokenRefreshRequestDTO) {
        try {
            TokenRefreshResponseDTO tokenRefreshResponseDTO = userService.refreshTokenFunction(tokenRefreshRequestDTO);
            return new ResponseEntity<>(tokenRefreshResponseDTO, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/doesExist/{userId}")
    public ResponseEntity doesExist(@PathVariable String userId) {
        try {
            authService.doesExist(userId);
            return new ResponseEntity(true, HttpStatus.OK);
        } catch (UserDoesNotExistException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
