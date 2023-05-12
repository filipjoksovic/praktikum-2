package com.example.services;

import com.example.models.ShoppingList;
import com.example.repositories.ShoppingListRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShoppingListService {

    @Autowired
    private ShoppingListRepository shoppingListRepository;

    public List<ShoppingList> getAllShoppingLists() {
        return shoppingListRepository.findAll();
    }

}
