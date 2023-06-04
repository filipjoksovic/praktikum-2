package com.wishlist.security;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.models.Family;
import com.wishlist.models.Invitation;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.User;
import com.wishlist.services.*;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class JwtValidator implements IJwtValidator{
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
        Family family = familyService.findById(familyId);
        return family.getUsers().contains(user);
    }
    @Override
    public boolean validateUser(String jwt, String userId) {
        String jwtUserEmail = jwtUtils.extractEmail(jwt.substring(7)); // removes "Bearer " from jwt
        User user = userService.getUserByEmail(jwtUserEmail);
        return user.getId().equals(userId);
    }
    @Override
    public User getUserFromJwt(String jwt){
        String jwtUserEmail = jwtUtils.extractEmail(jwt.substring(7)); // removes "Bearer " from jwt
        User user = userService.getUserByEmail(jwtUserEmail);
        return user;
    }
    @Override
    public boolean validateInvitation(String jwt, String invitationId){
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        Invitation invitation = invitationService.findById(invitationId);
        return invitation.getUserId().equals(user.getId());
    }
    @Override
    public boolean validateShoppingList(String jwt, String shoppingListId){
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        ShoppingList shoppingList = shoppingListService.getShoppingList(shoppingListId);
        return shoppingList.getUserId().equals(user.getId());
    }
    @Override
    public boolean validateListItem(String jwt, String listItemId){
        String userEmail = jwtUtils.extractEmail(jwt.substring(7));
        User user = userService.getUserByEmail(userEmail);
        Optional<ShoppingItem> listItem = itemService.findById(listItemId);
        if(listItem.isPresent()){
            ShoppingList result = shoppingListService.findShoppingListIdByItemId(listItem.get().getId());
            if (result != null){
                return result.getUserId().equals(user.getId());
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}
