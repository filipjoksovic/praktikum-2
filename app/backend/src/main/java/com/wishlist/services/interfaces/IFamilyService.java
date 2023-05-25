package com.wishlist.services.interfaces;

import com.wishlist.exceptions.InvalidInviteCodeException;
import com.wishlist.exceptions.InvalidInviteCodeFormatException;
import com.wishlist.models.Family;

import java.util.List;

public interface IFamilyService {

    List<Family> getAll();
    Family findById(String id);
    boolean delete(String id);
    Family save(Family family);
    String generateInviteCode();
    Family findByInviteCode(String inviteCode);
    boolean isValidInviteCode(String inviteCode) throws InvalidInviteCodeFormatException, InvalidInviteCodeException;

}
