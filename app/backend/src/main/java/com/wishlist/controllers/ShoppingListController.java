package com.wishlist.controllers;

import com.wishlist.models.ShoppingList;
import com.wishlist.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/shoppingLists")
public class ShoppingListController {
    @Autowired
    private ShoppingListService shoppingListService;

    @GetMapping
    public List<ShoppingList> getAll() {
        return shoppingListService.getAll();
    }
}
