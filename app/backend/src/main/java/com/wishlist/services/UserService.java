package com.wishlist.services;

import com.wishlist.dto.*;
import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.security.IJWTGenerator;
import com.wishlist.services.interfaces.IAuth;
import com.wishlist.services.interfaces.IEmailSender;
import com.wishlist.services.interfaces.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class UserService implements IUserService, IAuth {
    private final UserRepository userRepository;
    private static final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final IJWTGenerator jwtGenerator;
    private final IEmailSender emailSender;
    private final AuthenticationManager authenticationManager;

    private final FamilyRepository familyRepository;
    Logger logger = Logger.getLogger(UserService.class.getName());

    @Autowired
    public UserService(UserRepository userRepository, FamilyRepository familyRepository, IJWTGenerator jwtGenerator, IEmailSender emailSender, AuthenticationManager authenticationManager) {
        this.userRepository = userRepository;
        this.familyRepository = familyRepository;
        this.jwtGenerator = jwtGenerator;
        this.emailSender = emailSender;
        this.authenticationManager = authenticationManager;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User getUserById(String id) throws UserDoesNotExistException {
        return userRepository.findById(id).orElseThrow(UserDoesNotExistException::new);
    }

    public User getUserByEmail(String email) {
        return userRepository.findUserByEmail(email).orElseThrow(UserDoesNotExistException::new);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(String id) {
        userRepository.deleteById(id);
    }

    public AuthResponseDTO login(AuthRequestDTO dto) throws Exception {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        dto.getEmail(),
                        dto.getPassword()
                )
        );
        Optional<User> user = userRepository.findUserByEmail(dto.getEmail());
        if (user.isPresent()) {
            if (passwordEncoder.matches(dto.getPassword(), user.get().getPassword())) {
                Map<String, String> jwt = jwtGenerator.generateToken(user.get());
                Map<String, String> jwtRefresh = jwtGenerator.generateRefreshToken(user.get());
                logger.info("Generated JWT 123 : " + jwt);

                //duplicate code avoids circular dependency
                boolean isOwner = false;
                if (user.get().getFamilyId() != null) {
                    Optional<Family> familyOptional = familyRepository.findById(user.get().getFamilyId());
                    if (familyOptional.isPresent()) {
                        Family family = familyOptional.get();
                        User owner = family.getOwner();
                        isOwner = owner.getId().equals(user.get().getId());
                    }
                }
                return AuthResponseDTO.to(user.get(), jwt.get("token"), jwtRefresh.get("refreshToken"), isOwner);
            }
        }
        throw new Exception("Invalid credentials");
    }


    public User register(AuthRequestDTO dto) throws UserAlreadyExistsException {
        Optional<User> found = userRepository.findUserByEmail(dto.getEmail());

        if (found.isPresent()) {
            throw new UserAlreadyExistsException();
        }
        return userRepository.save(AuthRequestDTO.toUser(dto));
    }

    @Override
    public User doesExist(String id) throws UserDoesNotExistException {
        return userRepository.findById(id).orElseThrow(UserDoesNotExistException::new);
    }

    public TokenRefreshResponseDTO refreshTokenFunction(TokenRefreshRequestDTO tokenRefreshRequestDTO) throws NoRefreshTokenException, UserLoginException, RefreshTokenHasExpiredException {
        final String refreshToken = tokenRefreshRequestDTO.getRefreshToken();
        if (refreshToken == null) {
            throw new NoRefreshTokenException();
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

    @Override
    public boolean addUserToFamily(String userId, String familyId) throws UserDoesNotExistException {

        Optional<User> maybeUser = userRepository.findById(userId);
        if (maybeUser.isEmpty()) {
            throw new UserDoesNotExistException();
        }
        User user = maybeUser.get();
        user.setFamilyId(familyId);
        userRepository.save(user);
        return true;

    }

    @Override
    public FullUserDetailsDTO setupAccount(AccountSetupDTO dto) throws AccountSetupFailedException {
        Optional<User> found = userRepository.findById(dto.getId());
        if (found.isEmpty()) {
            throw new AccountSetupFailedException("Account setup failed because the user doesn't exist");
        }

        User user = found.get();
        if (dto.getFirstName() != null) {
            user.setName(dto.getFirstName());
        }
        if (dto.getLastName() != null) {
            user.setSurname(dto.getLastName());
        }
        if (dto.getDob() != null) {
            user.setDob(dto.getDob());
        }
        userRepository.save(user);
        emailSender.sendNewAccountEmail(user.getEmail(), user.getName(), user.getSurname());
        return FullUserDetailsDTO.to(user);

    }
}
