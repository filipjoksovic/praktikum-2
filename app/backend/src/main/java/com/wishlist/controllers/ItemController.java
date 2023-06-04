package com.wishlist.controllers;

import com.wishlist.models.ShoppingItem;
import com.wishlist.services.ItemService;
import com.wishlist.services.interfaces.IItemService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final IItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

/*    @GetMapping
    public List<ShoppingItem> getAll() {
        return itemService.getAll();
    }*/

}
