package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.models.User;
import com.wishlist.security.IJWTGenerator;
import com.wishlist.services.interfaces.IAuth;
import com.wishlist.services.interfaces.IUserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
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

    @PostMapping("/refresh-token")
    public void refreshToken(
            HttpServletRequest request,
            HttpServletResponse response
    )
    {
        final String authHeader = request.getHeader(HttpHeaders.AUTHORIZATION);
        final String refreshToken;
        final String userEmail;
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return;
        }
        refreshToken = authHeader.substring(7);
        userEmail = jwtGenerator.extractEmail(refreshToken);
        if (userEmail != null) {
            User user = userService.getUserByEmail(userEmail);
            String newAccessToken = jwtGenerator.generateToken(user).toString();
            response.setHeader("Authorization", "Bearer " + newAccessToken);
            if (jwtGenerator.isTokenValid(refreshToken, user)) {
                String accessToken = jwtGenerator.generateToken(user).toString();
                AuthResponseDTO authResponse = new AuthResponseDTO(user.getId(),user.getName(), user.getSurname(),user.getEmail(),accessToken);
            }
        }
    }

}
