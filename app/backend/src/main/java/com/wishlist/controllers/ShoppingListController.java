package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.exceptions.UserHasNoShoppingListsException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.services.interfaces.IItemService;
import com.wishlist.services.interfaces.IShoppingListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@RestController
@RequestMapping("api/shoppingLists")
public class ShoppingListController {
    private final Logger log = Logger.getLogger(ShoppingListController.class.getName());
    private final IShoppingListService shoppingListService;
    private final IItemService itemService;

    public ShoppingListController(IShoppingListService shoppingListService, IItemService itemService) {
        this.shoppingListService = shoppingListService;
        this.itemService = itemService;
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

    @GetMapping("/user/{userId}")
    public ResponseEntity getForUser(@PathVariable String userId) {
        log.info("Get shopping lists for user " + userId);
        try {
            return new ResponseEntity(shoppingListService.getShoppingListForUser(userId), HttpStatus.OK);
        } catch (UserDoesNotExistException | UserHasNoShoppingListsException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/family/{familyId}")
    public ResponseEntity getForFamily(@PathVariable String familyId) {
        log.info("Get shopping lists for family " + familyId);
        try {
            return new ResponseEntity(shoppingListService.getShoppingListForFamily(familyId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("user/{userId}")
    public ResponseEntity createShoppingListForUser(@PathVariable String userId, @RequestBody ShoppingListDTO shoppingListDTO) {
        log.info("POST createShoppingList for uid:" + userId);
        try {
            ShoppingList shoppingList = shoppingListService.createShoppingListForUser(userId, shoppingListDTO);
            return new ResponseEntity(shoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @PostMapping("family/{familyId}")
    public ResponseEntity createShoppingListForFamily(@PathVariable String familyId, @RequestBody ShoppingListDTO shoppingListDTO) {
        log.info("POST createShoppingList for family:" + familyId);
        try {
            ShoppingList shoppingList = shoppingListService.createShoppingListForFamily(familyId, shoppingListDTO);
            return new ResponseEntity(shoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @DeleteMapping("/{listId}")
    public ResponseEntity deleteShoppingList(@PathVariable String listId) {
        log.info("DELETE deleteShoppingList for uid: " + " lid: " + listId);
        try {
            return new ResponseEntity(shoppingListService.deleteList(listId), HttpStatus.OK);
        } catch (ListDoesNotExistException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PostMapping("/createItem/{listId}")
    public ResponseEntity<ShoppingList> createShoppingListItem(@PathVariable String listId, @RequestBody ShoppingItem item) { // TODO ADD ITEM TO A CERTAIN SHOPPING LIST
        try {
            ShoppingList createdShoppingList = shoppingListService.addItemToShoppingList(item,listId);
            return new ResponseEntity<>(createdShoppingList, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}/{listId}/{itemId}")
    public ResponseEntity deleteShoppingListItem(@PathVariable String userId, @PathVariable String listId, @PathVariable String itemId) {
        try {
            boolean success = shoppingListService.deleteItemFromShoppingList(userId,listId,itemId);
            return new ResponseEntity<>(success,HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{listId}/{itemId}")
    public ResponseEntity<ShoppingItem> update(@PathVariable String listId,@PathVariable String itemId, @RequestBody ShoppingItem item) {
        try {
            ShoppingItem updatedShoppingItem = shoppingListService.updateShoppingItem(listId, itemId, item);
            return new ResponseEntity<>(updatedShoppingItem, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
