package com.wishlist.facade;

import com.wishlist.exceptions.InvalidInviteCodeException;
import com.wishlist.exceptions.InvalidInviteCodeFormatException;
import com.wishlist.exceptions.UserAlreadyHasAFamilyException;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FamilyFacade implements IFamilyFacade {

    private final FamilyRepository familyRepository;
    private final UserRepository userRepository;

    public FamilyFacade(FamilyRepository familyRepository, UserRepository userRepository) {
        this.familyRepository = familyRepository;
        this.userRepository = userRepository;
    }

    public Family addUserToFamily(String invitationCode, String userId) throws InvalidInviteCodeException, InvalidInviteCodeFormatException, UserAlreadyHasAFamilyException {
        if (isValidInviteCode(invitationCode)) {
            this.associateUserWithFamily(invitationCode,userId);
            return familyRepository.findByInviteCode(invitationCode);
        } else {
            throw new InvalidInviteCodeException();
        }

    }

    private boolean isValidInviteCode(String inviteCode) throws InvalidInviteCodeFormatException, InvalidInviteCodeException {
        if (inviteCode.length() != 8) {
            throw new InvalidInviteCodeFormatException();
        } else {
            Family family = familyRepository.findByInviteCode(inviteCode);
            if (family == null) {
                throw new InvalidInviteCodeException();
            }
            else return true;
        }
    }

    private Family associateUserWithFamily(String inviteCode, String userId) throws InvalidInviteCodeException, UserAlreadyHasAFamilyException {
        Family family = familyRepository.findByInviteCode(inviteCode);
        if (family != null) {
            User user = userRepository.findUserById(userId);
            if (user.getFamilyId() != null) {
                throw new UserAlreadyHasAFamilyException();
            }
            List<User> users = family.getUsers();

            for (User existingUser : users) {
                if (existingUser.getId().equals(user.getId())) {
                    throw new UserAlreadyHasAFamilyException();
                }
            }

            users.add(user);
            user.setFamilyId(family.getId());
            userRepository.save(user);
            familyRepository.save(family);
            return family;

        } else {
            throw new InvalidInviteCodeException();
        }

    }

}
