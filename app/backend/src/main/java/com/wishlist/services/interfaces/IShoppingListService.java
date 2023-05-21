package com.wishlist.services.interfaces;

import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.models.ShoppingList;

import java.util.List;

public interface IShoppingListService {

    List<ShoppingList> getAll();

    ShoppingList updateShoppingList(ShoppingList shoppingList);
    ShoppingList getShoppingList(String id);
    ShoppingList save(ShoppingList shoppingList);
    List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException;

    List<ShoppingList> deleteList(String userId, String listId) throws ListDoesNotExistException, UserDoesNotExistException;
}
