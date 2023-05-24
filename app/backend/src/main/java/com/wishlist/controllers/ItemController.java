package com.wishlist.controllers;

import com.wishlist.models.ShoppingItem;
import com.wishlist.services.ItemService;
import com.wishlist.services.interfaces.IItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final IItemService itemService;
    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @GetMapping
    public List<ShoppingItem> getAll() {
        return itemService.getAll();
    }
    @PutMapping
    public ResponseEntity<ShoppingItem> update(@PathVariable String id, @RequestBody ShoppingItem item) {
        Optional<ShoppingItem> shoppingItemOptional = itemService.findById(id);
        if (shoppingItemOptional.isPresent()) {
            ShoppingItem existingItem = shoppingItemOptional.get();
            existingItem.setName(item.getName());
            existingItem.setChecked(item.isChecked());
            ShoppingItem updatedItem = itemService.save(existingItem);
            return ResponseEntity.ok(updatedItem);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean success = itemService.delete(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @PostMapping
    public ResponseEntity<ShoppingItem> create(@RequestBody ShoppingItem item) {
        ShoppingItem createdItem = itemService.save(item);
        return new ResponseEntity<>(createdItem, HttpStatus.CREATED);
    }





}
