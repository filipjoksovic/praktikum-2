package com.wishlist.services.interfaces;

import com.wishlist.models.ShoppingItem;

import java.util.List;
import java.util.Optional;

public interface IItemService {

    List<ShoppingItem> getAll();
    ShoppingItem save(ShoppingItem item);
    Optional<ShoppingItem> findById(String id);
    ShoppingItem update(ShoppingItem item);
    boolean delete(String id);

    ShoppingItem checkItem(String id);
    ShoppingItem uncheckItem(String id);
}
