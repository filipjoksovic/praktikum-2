package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.models.ShoppingList;
import com.wishlist.services.ShoppingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/shoppingLists")
public class ShoppingListController {

    private final ShoppingListService shoppingListService;

    public ShoppingListController(ShoppingListService shoppingListService) {
        this.shoppingListService = shoppingListService;
    }

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

    @PostMapping("/{userId}")
    public ResponseEntity createShoppingList(@PathVariable String userId, @RequestBody ShoppingListDTO shoppingListDTO) {
        try {
            ShoppingList shoppingList = shoppingListService.createShoppingList(userId, shoppingListDTO);
            return new ResponseEntity(shoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
