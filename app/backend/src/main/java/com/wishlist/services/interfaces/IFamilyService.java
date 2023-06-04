package com.wishlist.services.interfaces;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.exceptions.FamilyNotChangedException;
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

    Family update(String id, String name) throws FamilyDoesNotExistException, FamilyNotChangedException;

    List<User> getFamilyMembers(String familyId) throws FamilyDoesNotExistException;

    Family findByInviteCode(String inviteCode);

    boolean isValidInviteCode(String inviteCode) throws InvalidInviteCodeFormatException, InvalidInviteCodeException;

    Family findByUser(String userId) throws FamilyDoesNotExistException;

    Family updateCode(String id, String code) throws FamilyDoesNotExistException, InvalidInviteCodeException;
}
