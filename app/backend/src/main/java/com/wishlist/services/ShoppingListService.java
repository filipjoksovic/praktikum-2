package com.wishlist.services;

import com.wishlist.models.ShoppingList;
import com.wishlist.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    public List<ShoppingList> getAll() {
        return shoppingListRepository.findAll();
    }

}
