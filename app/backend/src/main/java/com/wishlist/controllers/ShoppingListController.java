package com.wishlist.controllers;

import com.wishlist.dto.*;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.ShoppingListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.exceptions.UserHasNoShoppingListsException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.interfaces.IItemService;
import com.wishlist.services.interfaces.IShoppingListService;
import org.hibernate.mapping.Array;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/shoppingLists")
public class ShoppingListController {
    private final Logger log = LoggerFactory.getLogger(ShoppingListController.class);
    private final IShoppingListService shoppingListService;
    private final IItemService itemService;

    private final JwtValidator jwtValidator;

    public ShoppingListController(IShoppingListService shoppingListService, IItemService itemService, JwtValidator jwtValidator) {
        this.shoppingListService = shoppingListService;
        this.itemService = itemService;
        this.jwtValidator = jwtValidator;
    }

    @GetMapping
    public List<ShoppingList> getAll() {
        return shoppingListService.getAll();
    }


    @PutMapping("/{id}")
    public ResponseEntity<ShoppingList> update(@PathVariable String id, @RequestBody ShoppingList updatedShoppingList, @RequestHeader("Authorization") String jwt) {
        try{
            if(jwtValidator.validateShoppingList(jwt, id)){
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
            else {
                return ResponseEntity.internalServerError().build();
            }
        }
        catch (Exception e){
            return ResponseEntity.internalServerError().build();
        }
    }

    @PutMapping("/{id}/completeList")
    public ResponseEntity copmpleteWholeList(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("PUT completeList for lid {}", id);
            if(jwtValidator.validateShoppingList(jwt, id)){
                log.info("PUT completeList return HTTP OK for lid {}", id);
                return new ResponseEntity(new ShoppingListResponseDTO(shoppingListService.completeWholeList(id)), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.info("PUT completeList return HTTP INTERNAL_SERVER_ERROR for lid {}", id);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{listId}/{itemId}/completeItem")
    public ResponseEntity completeListItem(@PathVariable String listId, @PathVariable String itemId, @RequestHeader("Authorization") String jwt) {
        try {
            if(jwtValidator.validateListItem(jwt,listId)){
                log.info("PUT completeListItem for lid {} iid {}", listId, itemId);
                return new ResponseEntity(new ShoppingListResponseDTO(shoppingListService.completeListItem(listId, itemId)), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("PUT completeListItem for lid {} iid {} FAIL", listId, itemId);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity getForUser(@PathVariable String userId, @RequestHeader("Authorization") String jwt) {
        try {
            if(jwtValidator.validateUser(jwt,userId)){
                log.info("GET slis for uid {}", userId);
                return new ResponseEntity(new ShoppingListsResponseDTO(shoppingListService.getShoppingListForUser(userId).stream().map(shoppingList -> new ShoppingListResponseDTO(shoppingList)).toList()), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this user"), HttpStatus.UNAUTHORIZED);
            }
        } catch (UserDoesNotExistException | UserHasNoShoppingListsException e) {
            log.error("GET slis for uid {} fail", userId);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/family/{familyId}")
    public ResponseEntity getForFamily(@PathVariable String familyId, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("Get shopping lists for family " + familyId);
            if(jwtValidator.validateFamily(jwt,familyId)){
                List<ShoppingList> familyLists = shoppingListService.getShoppingListForFamily(familyId);
                ShoppingListResponseDTO dto;
                if (familyLists.size() > 0) {
                    dto = new ShoppingListResponseDTO(familyLists.get(0));
                } else {
                    dto = new ShoppingListResponseDTO(new ShoppingList());
                }
                return new ResponseEntity(dto, HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this family"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    @PostMapping("user/{userId}")
    public ResponseEntity createShoppingListForUser(@PathVariable String userId, @RequestBody ShoppingListDTO shoppingListDTO, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("POST createShoppingList for uid:" + userId);
            if(jwtValidator.validateUser(jwt,userId)){
                ShoppingList shoppingList = shoppingListService.createShoppingListForUser(userId, shoppingListDTO);
                return new ResponseEntity(shoppingList, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this user"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("family/{familyId}")
    public ResponseEntity createShoppingListForFamily(@PathVariable String familyId, @RequestBody ShoppingListDTO shoppingListDTO, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("POST createShoppingList for family:" + familyId);
            if(jwtValidator.validateFamily(jwt, familyId)){
                if (!shoppingListService.hasList(familyId)) {
                    ShoppingList shoppingList = shoppingListService.createShoppingListForFamily(familyId, shoppingListDTO);
                    return new ResponseEntity(shoppingList, HttpStatus.CREATED);

                } else {
                    log.info("family has list, adding items:" + familyId);
                    log.info("items received", Arrays.toString(shoppingListDTO.items.toArray()));
                    ShoppingList list = shoppingListService.getShoppingListForFamily(familyId).get(0);
                    return new ResponseEntity(shoppingListService.addItemsToShoppingList(new AddListItemsDTO(shoppingListDTO.items.toArray(new String[0])), list.getId()), HttpStatus.OK);
                }
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this family"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity deleteShoppingList(@PathVariable String listId, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("DELETE deleteShoppingList for uid: " + " lid: " + listId);
            if(jwtValidator.validateShoppingList(jwt,listId)){
                return new ResponseEntity(shoppingListService.deleteList(listId), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
            }
        } catch (ListDoesNotExistException e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/createItem/{listId}")
    public ResponseEntity<ShoppingList> createShoppingListItem(@PathVariable String listId, @RequestBody ShoppingItem item, @RequestHeader("Authorization") String jwt) { // TODO ADD ITEM TO A CERTAIN SHOPPING LIST
        try {
            if(jwtValidator.validateListItem(jwt,listId)){
                ShoppingList createdShoppingList = shoppingListService.addItemToShoppingList(item, listId);
                return new ResponseEntity<>(createdShoppingList, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{userId}/{listId}/{itemId}")
    public ResponseEntity deleteShoppingListItem(@PathVariable String userId, @PathVariable String listId, @PathVariable String itemId, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("deleteShoppingListItem for uid {} lid {} iid {}", userId, listId, itemId);
            if(jwtValidator.validateListItem(jwt,itemId)){
                return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.deleteItemFromShoppingList(userId, listId, itemId)), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            log.error("deleteShoppingListItem for uid {} lid {} iid {} FAIL", userId, listId, itemId);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{listId}/{itemId}")
    public ResponseEntity<ShoppingItem> update(@PathVariable String listId, @PathVariable String itemId, @RequestBody ShoppingItem item, @RequestHeader("Authorization") String jwt) {
        try {
            if(jwtValidator.validateListItem(jwt,itemId)){
                ShoppingItem updatedShoppingItem = shoppingListService.updateShoppingItem(listId, itemId, item);
                return new ResponseEntity<>(updatedShoppingItem, HttpStatus.CREATED);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
            }
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{listId}/items")
    public ResponseEntity<?> addItems(@PathVariable String listId, @RequestBody AddListItemsDTO dto, @RequestHeader("Authorization") String jwt) {
        try {
            log.info("add itm to ls {}", listId);
            if(jwtValidator.validateShoppingList(jwt,listId)){
                return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.addItemsToShoppingList(dto, listId)), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
            }
        } catch (ShoppingListDoesNotExistException e) {
            log.error("add itm to ls {} fail", listId);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
