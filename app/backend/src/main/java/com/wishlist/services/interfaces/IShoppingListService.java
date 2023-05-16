package com.wishlist.services.interfaces;

import com.wishlist.models.ShoppingList;

import java.util.List;

public interface IShoppingListService {

    List<ShoppingList> getAll();

    ShoppingList updateShoppingList(ShoppingList shoppingList);
    ShoppingList getShoppingListById(String id);
    ShoppingList save(ShoppingList shoppingList);


}
