package com.wishlist.services;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.exceptions.UserAlreadyExistsException;
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
            logger.info("Generated JWT: " + jwt);
            return AuthResponseDTO.to(user.get(), jwt.get("token"));
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
            String refreshToken = jwtGenerator.generateRefreshToken(AuthRequestDTO.toUser(dto));

        }
        return userRepository.save(AuthRequestDTO.toUser(dto));
    }


}
