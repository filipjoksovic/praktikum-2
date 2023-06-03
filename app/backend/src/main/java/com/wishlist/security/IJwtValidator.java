package com.wishlist.security;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.models.User;

public interface IJwtValidator {
    boolean validateFamily(String jwt, String familyId) throws FamilyDoesNotExistException;
    boolean validateUser(String jwt, String userId);
    User getUserFromJwt(String jwt);
    boolean validateInvitation(String jwt, String invitationId);

    boolean validateShoppingList(String jwt, String shoppingListId);
    boolean validateListItem(String jwt, String listItemId);
}
