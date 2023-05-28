package com.wishlist.services;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.services.interfaces.IFamilyService;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class FamilyService implements IFamilyService {

    private final FamilyRepository familyRepository;
    private final UserService userService;
    Logger logger = Logger.getLogger(FamilyService.class.getName());
    private final UserRepository userRepository;


    public FamilyService(FamilyRepository familyRepository, UserService userService,
                         UserRepository userRepository) {
        this.familyRepository = familyRepository;
        this.userService = userService;
        this.userRepository = userRepository;
    }

    public List<Family> getAll() {
        return familyRepository.findAll();
    }

    public Family findById(String id) throws FamilyDoesNotExistException {
        Optional<Family> familyOptional = familyRepository.findById(id);
        return familyOptional.orElseThrow(FamilyDoesNotExistException::new);
    }

    public Family delete(String id) throws FamilyDoesNotExistException {
        Family family = familyRepository.findById(id).orElseThrow(FamilyDoesNotExistException::new);
        familyRepository.deleteById(id);
        return family;
    }

    public Family save(Family family) {
        return familyRepository.save(family);
    }

    public String generateInviteCode() {
        final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final int LENGTH = 8;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }

    public boolean isValidInviteCode(String inviteCode) throws InvalidInviteCodeFormatException, InvalidInviteCodeException {
        // TODO ADD IF USER ALREADY SENT AN INVITE CODE TO THAT FAMILY
        if (inviteCode.length() != 8) {
            throw new InvalidInviteCodeFormatException();
        }
        Family family = familyRepository.findByInviteCode(inviteCode);
        if (family == null) {
            throw new InvalidInviteCodeException();
        }
        return true;
    }

    @Override
    public Family findByUser(String userId) throws FamilyDoesNotExistException {
        User user = userRepository.findUserById(userId);
        return familyRepository.findById(user.getFamilyId()).orElseThrow(FamilyDoesNotExistException::new);
    }

    @Override
    public Family findByInviteCode(String inviteCode) {
        return familyRepository.findByInviteCode(inviteCode);
    }

    public Family removeUserFromFamily(String familyId, String userId) throws Exception {
        Optional<Family> familyOptional = familyRepository.findById(familyId);
        User user = userService.getUserById(userId);
        if (!familyOptional.isPresent()) {
            throw new FamilyNotFoundException();
        }
        if (user == null) {
            throw new UserDoesNotExistException();
        }
        Family family = familyOptional.get();
        List<User> familyUsers = family.getUsers();
        for (User currentUser : familyUsers) {
            if (Objects.equals(currentUser.getId(), userId)) {
                familyUsers.remove(currentUser);
                user.setFamilyId(null);
                familyRepository.save(family);
                userService.updateUser(user);
                return family;
            }
        }
        throw new Exception("Failed to delete user from family");

    }


}
