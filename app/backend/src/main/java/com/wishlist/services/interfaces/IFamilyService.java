package com.wishlist.services.interfaces;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.exceptions.InvalidInviteCodeException;
import com.wishlist.exceptions.InvalidInviteCodeFormatException;
import com.wishlist.models.Family;
import com.wishlist.models.User;

import java.util.List;

public interface IFamilyService {

    List<Family> getAll();

    Family findById(String id) throws FamilyDoesNotExistException;

    Family delete(String id) throws FamilyDoesNotExistException;

    Family save(Family family);

    String generateInviteCode();

    List<User> getFamilyMembers(String familyId) throws FamilyDoesNotExistException;

    Family findByInviteCode(String inviteCode);

    boolean isValidInviteCode(String inviteCode) throws InvalidInviteCodeFormatException, InvalidInviteCodeException;

    Family findByUser(String userId) throws FamilyDoesNotExistException;

}
