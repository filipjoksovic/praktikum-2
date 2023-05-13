package com.wishlist.services;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.exceptions.UserAlreadyExistsException;
import com.wishlist.exceptions.UserLoginException;
import com.wishlist.models.User;
import com.wishlist.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements IUserService, IAuth {
    @Autowired
    private UserRepository userRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(String id) {
        return userRepository.findById(id).get();
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public User login(AuthRequestDTO dto) throws Exception {
        //TODO actual auth logic goes here
        Optional<User> user = userRepository.findUserByEmail(dto.getEmail());
        return user.orElseThrow(UserLoginException::new);
    }

    public User register(AuthRequestDTO dto) throws Exception {
        Optional<User> found = userRepository.findUserByEmail(dto.getEmail());
        if (found.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        return userRepository.save(AuthRequestDTO.toUser(dto));
    }


}
