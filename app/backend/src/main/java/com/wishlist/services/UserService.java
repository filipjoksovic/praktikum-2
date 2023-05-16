package com.wishlist.services;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.dto.TokenRefreshRequestDTO;
import com.wishlist.dto.TokenRefreshResponseDTO;
import com.wishlist.exceptions.RefreshTokenHasExpiredException;
import com.wishlist.exceptions.UserAlreadyExistsException;
import com.wishlist.exceptions.UserLoginException;
import com.wishlist.models.User;
import com.wishlist.repositories.UserRepository;
import com.wishlist.security.IJWTGenerator;
import com.wishlist.services.interfaces.IAuth;
import com.wishlist.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService implements IUserService, IAuth {
    private final UserRepository userRepository;
    private IJWTGenerator jwtGenerator;
    Logger logger = Logger.getLogger(UserService.class.getName());

    @Autowired
    public UserService(UserRepository userRepository, IJWTGenerator jwtGenerator) {
        this.userRepository = userRepository;
        this.jwtGenerator = jwtGenerator;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }
    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email).get();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public AuthResponseDTO login(AuthRequestDTO dto) throws Exception {
        Optional<User> user = userRepository.findUserByEmailAndPassword(dto.getEmail(), dto.getPassword());
        if (user.isPresent()) {
            Map<String, String> jwt = jwtGenerator.generateToken(user.get());
            Map<String, String> jwtRefresh = jwtGenerator.generateRefreshToken(user.get());
            logger.info("Generated JWT: " + jwt);
            return AuthResponseDTO.to(user.get(), jwt.get("token"), jwtRefresh.get("refreshToken"));
        } else {
            throw new Exception("Invalid credentials");
        }


    }

    public User register(AuthRequestDTO dto) throws Exception {
        Optional<User> found = userRepository.findUserByEmail(dto.getEmail());

        if (found.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        else {
            Map<String, String> jwt = jwtGenerator.generateToken(found.get());
            logger.info("Generated JWT: " + jwt);
//            String refreshToken = jwtGenerator.generateRefreshToken(AuthRequestDTO.toUser(dto));
        }
        return userRepository.save(AuthRequestDTO.toUser(dto));
    }

    public TokenRefreshResponseDTO refreshTokenFunction(TokenRefreshRequestDTO tokenRefreshRequestDTO) throws Exception {
        final String refreshToken = tokenRefreshRequestDTO.getRefreshToken();
        if (refreshToken == null) {
            throw new Exception("There is no refresh token");
        }
        final String userEmail = jwtGenerator.extractEmail(refreshToken);
        User user = this.getUserByEmail(userEmail);
        if (user != null) {
            Map<String, String> newAccessToken = jwtGenerator.generateRefreshToken(user);
            String newAccessTokenString = newAccessToken.get("refreshToken");

            if (jwtGenerator.isTokenValid(newAccessTokenString, user)) {
                TokenRefreshResponseDTO tokenRefreshResponseDTO = new TokenRefreshResponseDTO(newAccessTokenString, refreshToken);
                return tokenRefreshResponseDTO;
            }
            throw new UserLoginException();
        }
        throw new RefreshTokenHasExpiredException();
    }


}
