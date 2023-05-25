package com.wishlist.services.interfaces;

import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.ShoppingListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.exceptions.UserHasNoShoppingListsException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;

import java.util.List;

public interface IShoppingListService {

    List<ShoppingList> getAll();
    ShoppingList updateShoppingList(ShoppingList shoppingList);
    ShoppingList createShoppingListForUser(String userId, ShoppingListDTO dto) throws Exception;
    ShoppingList createShoppingListForFamily(String familyId, ShoppingListDTO dto) throws Exception;
    ShoppingList getShoppingList(String id);
    ShoppingList save(ShoppingList shoppingList);
    List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException, UserHasNoShoppingListsException;
    ShoppingList deleteList(String listId) throws ListDoesNotExistException;
    ShoppingList addItemToShoppingList(ShoppingItem item, String shoppingListId) throws ShoppingListDoesNotExistException;
    boolean deleteItemFromShoppingList(String userId, String listId, String itemId) throws Exception;
    ShoppingItem updateShoppingItem(String listId, String itemId, ShoppingItem item) throws Exception;
    List<ShoppingList> getShoppingListForFamily(String familyId) throws Exception;
}
