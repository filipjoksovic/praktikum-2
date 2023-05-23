package com.wishlist.services.interfaces;

import com.wishlist.models.ShoppingItem;

import java.util.List;

public interface IItemService {

    List<ShoppingItem> getAll();
    ShoppingItem save(ShoppingItem item);

}
