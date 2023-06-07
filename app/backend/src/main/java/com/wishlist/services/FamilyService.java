package com.wishlist.services;

import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.services.interfaces.IFamilyService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;
import java.util.regex.Pattern;

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
        List<User> usersInFamily = family.getUsers();
        for (User user : usersInFamily) {
            user.setFamilyId(null);
        }
        familyRepository.deleteById(id);
        return family;
    }

    public Family save(Family family) {
        return familyRepository.save(family);
    }

    public Family saveWithOwner(Family family, User owner) {
        family.setOwner(owner);
        List<User> familyMembers = family.getUsers();
        if (familyMembers == null) {
            familyMembers = new ArrayList<>();
        }
        familyMembers.add(owner);
        family.setUsers(familyMembers);
        return familyRepository.save(family);
    }

    /*    public Family update(Family family, String id) throws FamilyDoesNotExistException {
            Family foundFamily = findById(id);
            family.setUsers(foundFamily.getUsers());
            Family updatedFamilyResult = save(family);

        }*/

    public boolean isOwner(String userId, String familyId) {
        // assuming you have a way to get the family by user id
        Optional<Family> familyOptional = familyRepository.findById(familyId);

        if (familyOptional.isPresent()) {
            Family family = familyOptional.get();
            User owner = family.getOwner();
            // comparing the user id with the owner's user id
            return owner.getId().equals(userId);
        }
        // returning false if the family does not exist
        return false;
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
    public Family updateCode(String id, String code) throws FamilyDoesNotExistException, InvalidInviteCodeException {
        if (isCodeInFormat(code)) {
            Family family = this.familyRepository.findById(id).orElseThrow(FamilyDoesNotExistException::new);
            family.setInviteCode(code);
            return familyRepository.save(family);
        }
        throw new InvalidInviteCodeException();
    }


    @Override
    public Family update(String id, String name) throws FamilyDoesNotExistException, FamilyNotChangedException {
        Family family = familyRepository.findById(id).orElseThrow(FamilyDoesNotExistException::new);
        if (!family.getName().equals(name)) {
            family.setName(name);
            return familyRepository.save(family);
        }
        throw new FamilyNotChangedException();
    }

    @Override
    public List<User> getFamilyMembers(String familyId) throws FamilyDoesNotExistException {
        return userRepository.findByFamilyId(familyId);
    }

    @Override
    public Family findByInviteCode(String inviteCode) {
        return familyRepository.findByInviteCode(inviteCode);
    }

    public Family removeUserFromFamily(String familyId, String userId) throws FamilyDoesNotExistException, UserDoesNotExistException, FailedToRemoveUserException {
        Family family = familyRepository.findById(familyId).orElseThrow(FamilyDoesNotExistException::new);
        User user = userService.getUserById(userId);
        user.setFamilyId(null);
        userService.updateUser(user);
        return family;
    }

    public boolean isCodeInFormat(String input) {
        String pattern = "\\w{4}-\\w{4}";
        return Pattern.matches(pattern, input);
    }


}
