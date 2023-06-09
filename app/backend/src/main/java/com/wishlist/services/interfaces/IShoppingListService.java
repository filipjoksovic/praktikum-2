package com.wishlist.services.interfaces;

import com.wishlist.dto.AddListItemsDTO;
import com.wishlist.dto.BulkEditDTO;
import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.dto.ShoppingListDTOV2;
import com.wishlist.exceptions.*;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;

import java.util.List;

public interface IShoppingListService {

    List<ShoppingList> getAll();

    //TODO change name to getAllForFamily or something like taht
    ShoppingListDTOV2 getShoppingListForFamily(String familyId) throws ShoppingListIsEmptyException;

    ShoppingList updateShoppingList(ShoppingList shoppingList);

    ShoppingList createShoppingListForUser(String userId, ShoppingListDTO dto) throws ShoppingListIsEmptyException;

    ShoppingList createShoppingListForFamily(String familyId, ShoppingListDTO dto, String creatorId);

    ShoppingList getShoppingList(String id);

    ShoppingList save(ShoppingList shoppingList);

    List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException, UserHasNoShoppingListsException;

    ShoppingList deleteList(String listId) throws ListDoesNotExistException;

    ShoppingList addItemToShoppingList(ShoppingItem item, String shoppingListId, String creatorId) throws ShoppingListDoesNotExistException;

    ShoppingList addItemsToShoppingList(AddListItemsDTO item, String shoppingListId, String creatorId) throws ShoppingListDoesNotExistException;

    ShoppingListDTOV2 deleteItemFromShoppingList(String userId, String listId, String itemId) throws UserNotAuthorizedException, ShoppingListDoesNotExistException, ShoppingItemDoesNotExistException;

    ShoppingItem updateShoppingItem(String listId, String itemId, ShoppingItem item) throws ShoppingItemDoesNotExistException, ShoppingListDoesNotExistException;

    ShoppingList completeWholeList(String id) throws ShoppingListDoesNotExistException;

    ShoppingList completeListItem(String listId, String itemId) throws ShoppingListDoesNotExistException;
    ShoppingList uncheckItem(String listId, String itemId) throws ShoppingListDoesNotExistException;


    boolean hasList(String familyId);

    ShoppingList findShoppingListIdByItemId(String itemId);

    ShoppingList updateList(String id, ShoppingList updatedShoppingList) throws ShoppingListDoesNotExistException;

    ShoppingList bulkEdit(BulkEditDTO dto, String listId);
}
