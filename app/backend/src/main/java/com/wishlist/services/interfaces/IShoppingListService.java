package com.wishlist.services.interfaces;

import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.exceptions.UserHasNoShoppingListsException;
import com.wishlist.models.ShoppingList;

import java.util.List;

public interface IShoppingListService {

    List<ShoppingList> getAll();

    ShoppingList updateShoppingList(ShoppingList shoppingList);
    ShoppingList createShoppingList(String userId, ShoppingListDTO dto) throws UserDoesNotExistException;
    ShoppingList getShoppingList(String id);
    ShoppingList save(ShoppingList shoppingList);
    List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException, UserHasNoShoppingListsException;
    ShoppingList deleteList(String listId) throws ListDoesNotExistException;
}
