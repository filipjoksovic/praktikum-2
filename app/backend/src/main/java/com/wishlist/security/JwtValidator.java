package com.wishlist.security;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.exceptions.ShoppingItemDoesNotExistException;
import com.wishlist.models.Invitation;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.services.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class JwtValidator implements IJwtValidator {
    public final JwtGeneratorImpl jwtUtils;
    private final FamilyService familyService;
    private final UserService userService;
    private final ItemService itemService;
    private final ShoppingListService shoppingListService;
    private final InvitationService invitationService;

    public JwtValidator(final FamilyService familyService, final UserService userService, final InvitationService invitationService, final ItemService itemService, final ShoppingListService shoppingListService, final JwtGeneratorImpl jwtUtils) {
        this.familyService = familyService;
        this.userService = userService;
        this.invitationService = invitationService;
        this.itemService = itemService;
        this.shoppingListService = shoppingListService;
        this.jwtUtils = jwtUtils;
    }

    @Override
    public boolean validateFamily(String jwt, String familyId) throws FamilyDoesNotExistException {
        String userEmail = jwtUtils.extractEmail(jwt.substring(7)); // removes "Bearer " from jwt
        User user = userService.getUserByEmail(userEmail);
        List<String> memberIds = familyService.findById(familyId).getUsers().stream().map(member -> member.getId()).collect(Collectors.toList());
        return memberIds.contains(user.getId());
    }

    @Override
    public boolean validateUser(String jwt, String userId) {
        String jwtUserEmail = jwtUtils.extractEmail(jwt.substring(7)); // removes "Bearer " from jwt
        User user = userService.getUserByEmail(jwtUserEmail);
        return user.getId().equals(userId);
    }

    @Override
    public User getUserFromJwt(String jwt) {
        String jwtUserEmail = jwtUtils.extractEmail(jwt.substring(7)); // removes "Bearer " from jwt
        User user = userService.getUserByEmail(jwtUserEmail);
        return user;
    }

    @Override
    public boolean validateInvitation(String jwt, String invitationId) {
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        Invitation invitation = invitationService.findById(invitationId);
        return invitation.getUserId().equals(user.getId());
    }

    @Override
    public boolean validateShoppingList(String jwt, String shoppingListId) {
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        ShoppingList shoppingList = shoppingListService.getShoppingList(shoppingListId);
        return shoppingList.getUserId().equals(user.getId()) || shoppingList.getFamilyId().equals(user.getFamilyId());
    }

    @Override
    public boolean validateListItem(String jwt, String listItemId) {
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        ShoppingItem listItem = itemService.findById(listItemId).orElseThrow(ShoppingItemDoesNotExistException::new);
        ShoppingList result = shoppingListService.findShoppingListIdByItemId(listItem.getId());
        if (result != null) {
            if (result.getUserId() != null) {
                return result.getUserId().equals(user.getId());
            } else if (result.getFamilyId() != null) {
                return result.getFamilyId().equals(user.getFamilyId());
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
}
