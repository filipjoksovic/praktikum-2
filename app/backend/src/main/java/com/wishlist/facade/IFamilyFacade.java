package com.wishlist.facade;

import com.wishlist.exceptions.InvalidInviteCodeException;
import com.wishlist.exceptions.InvalidInviteCodeFormatException;
import com.wishlist.exceptions.UserAlreadyHasAFamilyException;
import com.wishlist.models.Family;

public interface IFamilyFacade {
    Family addUserToFamily(String invitationCode, String userId) throws InvalidInviteCodeException, InvalidInviteCodeFormatException, UserAlreadyHasAFamilyException;
}
