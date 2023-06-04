package com.wishlist.controllers;

import com.wishlist.dto.*;
import com.wishlist.models.User;
import com.wishlist.security.IJWTGenerator;
import com.wishlist.services.interfaces.IAuth;
import com.wishlist.services.interfaces.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/auth")
public class AuthController {
    Logger log = LoggerFactory.getLogger(AuthController.class);
    private final IAuth authService;
    private final IJWTGenerator jwtGenerator;
    private final IUserService userService;


    @Autowired
    public AuthController(IAuth authService, IJWTGenerator ijwtGenerator, IUserService userService) {
        this.authService = authService;
        this.jwtGenerator = ijwtGenerator;
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody AuthRequestDTO requestDTO) throws Exception {
        log.info("Rcv lgn {} {}", requestDTO.getEmail(), requestDTO.getPassword());
        AuthResponseDTO loggedIn = authService.login(requestDTO);
        log.info("usr {} found. send 200 ok", loggedIn.getId());
        return new ResponseEntity<>(loggedIn, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity register(@RequestBody AuthRequestDTO requestDTO) {
        log.info("rcv reg {} {}", requestDTO.getEmail(), requestDTO.getPassword());
        User registered = authService.register(requestDTO);
        log.info("new usr id {}", registered.getUsername());
        return new ResponseEntity<>(registered, HttpStatus.OK);
    }


    @PostMapping("/refresh-token")
    public ResponseEntity refreshToken(@RequestBody TokenRefreshRequestDTO tokenRefreshRequestDTO) {
        log.info("rcv rt {}", tokenRefreshRequestDTO.getRefreshToken());
        TokenRefreshResponseDTO tokenRefreshResponseDTO = userService.refreshTokenFunction(tokenRefreshRequestDTO);
        log.info("tkn ref. sending 200 ok");
        return new ResponseEntity<>(tokenRefreshResponseDTO, HttpStatus.OK);
    }

    @GetMapping("/doesExist/{userId}")
    public ResponseEntity doesExist(@PathVariable String userId) {
        log.info("rcv doesExist for {}", userId);
        authService.doesExist(userId);
        log.info("usr exists. sending 200ok");
        return new ResponseEntity(true, HttpStatus.OK);
    }


}
