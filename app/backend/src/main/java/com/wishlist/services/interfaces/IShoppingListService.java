package com.wishlist.services.interfaces;

import com.wishlist.dto.AddListItemsDTO;
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
    //TODO change name to getAllForFamily or something like taht
    List<ShoppingList> getShoppingListForFamily(String familyId) throws Exception;
    ShoppingList updateShoppingList(ShoppingList shoppingList);
    ShoppingList createShoppingListForUser(String userId, ShoppingListDTO dto) throws Exception;
    ShoppingList createShoppingListForFamily(String familyId, ShoppingListDTO dto) throws Exception;
    ShoppingList getShoppingList(String id);
    ShoppingList save(ShoppingList shoppingList);
    List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException, UserHasNoShoppingListsException;
    ShoppingList deleteList(String listId) throws ListDoesNotExistException;
    ShoppingList addItemToShoppingList(ShoppingItem item, String shoppingListId) throws ShoppingListDoesNotExistException;
    ShoppingList addItemsToShoppingList(AddListItemsDTO item, String shoppingListId) throws ShoppingListDoesNotExistException;

    ShoppingList deleteItemFromShoppingList(String userId, String listId, String itemId) throws Exception;
    ShoppingItem updateShoppingItem(String listId, String itemId, ShoppingItem item) throws Exception;
    ShoppingList completeWholeList(String id) throws ShoppingListDoesNotExistException;
    ShoppingList completeListItem(String listId, String itemId) throws ShoppingListDoesNotExistException;

    boolean hasList(String familyId);

    ShoppingList findShoppingListIdByItemId(String itemId);
}
