package com.wishlist.controllers;

import com.wishlist.models.ShoppingList;
import com.wishlist.services.ShoppingListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/shoppingLists")
public class ShoppingListController {
    @Autowired
    private ShoppingListService shoppingListService;

    @GetMapping
    public List<ShoppingList> getAll() {
        return shoppingListService.getAll();
    }

    @PutMapping("/{id}")
    public ResponseEntity<ShoppingList> update(@PathVariable String id, @RequestBody ShoppingList updatedShoppingList) {
        Optional<ShoppingList> shoppingListOptional = Optional.ofNullable(shoppingListService.getShoppingList(id));
        if (shoppingListOptional.isPresent()) {
            ShoppingList existingShoppingList = shoppingListOptional.get();
            existingShoppingList.setItemList(updatedShoppingList.getItemList());
            ShoppingList updatedShoppingListResult = shoppingListService.save(existingShoppingList);
            return ResponseEntity.ok(updatedShoppingListResult);
        } else {
            return ResponseEntity.notFound().build();
        }

    }


}
