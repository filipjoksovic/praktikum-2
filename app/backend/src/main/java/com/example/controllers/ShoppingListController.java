package com.example.controllers;

import com.example.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/shoppinglists")
public class ShoppingListController {
    @Autowired
    private ShoppingListService shoppingListService;
}
