package com.wishlist.controllers;

import com.wishlist.dto.*;
import com.wishlist.exceptions.*;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.interfaces.IItemService;
import com.wishlist.services.interfaces.IShoppingListService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

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

    @GetMapping("/{userId}")
    public ResponseEntity<?> getUserList(@PathVariable String userId, @RequestHeader("Authorization") String jwt) {

        if (jwtValidator.validateUser(jwt, userId)) {
            return ResponseEntity.ok(shoppingListService.getShoppingListForUser(userId));
        } else {
            throw new UserNotAuthorizedException();
        }
    }

    @PutMapping("/{shoppingListId}")
    public ResponseEntity<?> update(@PathVariable String shoppingListId, @RequestBody ShoppingList updatedShoppingList, @RequestHeader("Authorization") String jwt) {
        log.info("upd list data {}", shoppingListId);
        if (jwtValidator.validateShoppingList(jwt, shoppingListId)) {
            log.info("upd list data {} 200", shoppingListId);

            return ResponseEntity.ok(shoppingListService.updateList(shoppingListId, updatedShoppingList));
        } else {
            throw new UserNotAuthorizedException();
        }
    }

    @PutMapping("/{id}/completeList")
    public ResponseEntity copmpleteWholeList(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        log.info("PUT completeList for lid {}", id);
        if (jwtValidator.validateShoppingList(jwt, id)) {
            log.info("PUT completeList return HTTP OK for lid {}", id);
            return new ResponseEntity(new ShoppingListResponseDTO(shoppingListService.completeWholeList(id)), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/{listId}/{itemId}/completeItem")
    public ResponseEntity completeListItem(@PathVariable String listId, @PathVariable String itemId, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateListItem(jwt, listId)) {
            log.info("PUT completeListItem for lid {} iid {}", listId, itemId);
            return new ResponseEntity(new ShoppingListResponseDTO(shoppingListService.completeListItem(listId, itemId)), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity getForUser(@PathVariable String userId, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateUser(jwt, userId)) {
            log.info("GET slis for uid {}", userId);
            return new ResponseEntity(new ShoppingListsResponseDTO(shoppingListService.getShoppingListForUser(userId).stream().map(shoppingList -> new ShoppingListResponseDTO(shoppingList)).toList()), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this user"), HttpStatus.UNAUTHORIZED);
        }
    }

    @GetMapping("/family/{familyId}")
    public ResponseEntity getForFamily(@PathVariable String familyId, @RequestHeader("Authorization") String jwt) {
        log.info("Get shopping lists for family " + familyId);
        if (jwtValidator.validateFamily(jwt, familyId)) {
            List<ShoppingList> familyLists = shoppingListService.getShoppingListForFamily(familyId);
            ShoppingListResponseDTO dto;
            if (familyLists.size() > 0) {
                dto = new ShoppingListResponseDTO(familyLists.get(0));
            } else {
                dto = new ShoppingListResponseDTO(new ShoppingList());
            }
            return new ResponseEntity(dto, HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this family"), HttpStatus.UNAUTHORIZED);
        }
    }


    @PostMapping("user/{userId}")
    public ResponseEntity createShoppingListForUser(@PathVariable String userId, @RequestBody ShoppingListDTO shoppingListDTO, @RequestHeader("Authorization") String jwt) {
        log.info("POST createShoppingList for uid:" + userId);
        if (jwtValidator.validateUser(jwt, userId)) {
            ShoppingList shoppingList = shoppingListService.createShoppingListForUser(userId, shoppingListDTO);
            return new ResponseEntity(shoppingList, HttpStatus.CREATED);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this user"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("family/{familyId}")
    public ResponseEntity createShoppingListForFamily(@PathVariable String familyId, @RequestBody ShoppingListDTO shoppingListDTO, @RequestHeader("Authorization") String jwt) {
        log.info("POST createShoppingList for family:" + familyId);
        if (jwtValidator.validateFamily(jwt, familyId)) {
            User user = jwtValidator.getUserFromJwt(jwt);
            if (!shoppingListService.hasList(familyId)) {
                ShoppingList shoppingList = shoppingListService.createShoppingListForFamily(familyId, shoppingListDTO, user.getId());
                return new ResponseEntity(shoppingList, HttpStatus.CREATED);

            } else {
                log.info("family has list, adding items:" + familyId);
                log.info("items received", Arrays.toString(shoppingListDTO.items.toArray()));
                ShoppingList list = shoppingListService.getShoppingListForFamily(familyId).get(0);
                return new ResponseEntity(shoppingListService.addItemsToShoppingList(new AddListItemsDTO(shoppingListDTO.items.toArray(new String[0])), list.getId(), user.getId()), HttpStatus.OK);
            }
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this family"), HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{listId}")
    public ResponseEntity deleteShoppingList(@PathVariable String listId, @RequestHeader("Authorization") String jwt) {
        log.info("DELETE deleteShoppingList for uid: " + " lid: " + listId);
        if (jwtValidator.validateShoppingList(jwt, listId)) {
            return new ResponseEntity(shoppingListService.deleteList(listId), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/createItem/{listId}")
    public ResponseEntity<ShoppingList> createShoppingListItem(@PathVariable String listId, @RequestBody ShoppingItem item, @RequestHeader("Authorization") String jwt) { // TODO ADD ITEM TO A CERTAIN SHOPPING LIST
        if (jwtValidator.validateListItem(jwt, listId)) {
            User user = jwtValidator.getUserFromJwt(jwt);
            ShoppingList createdShoppingList = shoppingListService.addItemToShoppingList(item, listId, user.getId());
            return new ResponseEntity<>(createdShoppingList, HttpStatus.CREATED);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

    @DeleteMapping("/{userId}/{listId}/{itemId}")
    public ResponseEntity deleteShoppingListItem(@PathVariable String userId, @PathVariable String listId, @PathVariable String itemId, @RequestHeader("Authorization") String jwt) {
        log.info("deleteShoppingListItem for uid {} lid {} iid {}", userId, listId, itemId);
        if (jwtValidator.validateListItem(jwt, itemId)) {
            return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.deleteItemFromShoppingList(userId, listId, itemId)), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PutMapping("/{listId}/{itemId}")
    public ResponseEntity<ShoppingItem> update(@PathVariable String listId, @PathVariable String itemId, @RequestBody ShoppingItem item, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateListItem(jwt, itemId)) {
            ShoppingItem updatedShoppingItem = shoppingListService.updateShoppingItem(listId, itemId, item);
            return new ResponseEntity<>(updatedShoppingItem, HttpStatus.CREATED);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this item"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/{listId}/items")
    public ResponseEntity<?> addItems(@PathVariable String listId, @RequestBody AddListItemsDTO dto, @RequestHeader("Authorization") String jwt) {
        log.info("add itm to ls {}", listId);
        if (jwtValidator.validateShoppingList(jwt, listId)) {
            User user = jwtValidator.getUserFromJwt(jwt);
            return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.addItemsToShoppingList(dto, listId, user.getId())), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/{listId}/bulkCheck")
    public ResponseEntity<?> bulkCheck(@PathVariable String listId, @RequestBody BulkCheckDTO dto, @RequestHeader("Authorization") String jwt) {
        log.info("bulk check for ls {}", listId);
        if (jwtValidator.validateShoppingList(jwt, listId)) {
            return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.bulkCheck(dto, listId)), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

    @PostMapping("/{listId}/bulkUncheck")
    public ResponseEntity<?> bulkUncheck(@PathVariable String listId, @RequestBody BulkCheckDTO dto, @RequestHeader("Authorization") String jwt) {
        log.info("bulk check for ls {}", listId);
        if (jwtValidator.validateShoppingList(jwt, listId)) {
            return new ResponseEntity<>(new ShoppingListResponseDTO(shoppingListService.bulkUncheck(dto, listId)), HttpStatus.OK);
        } else {
            return new ResponseEntity(new ApiError("you do not have access to this list"), HttpStatus.UNAUTHORIZED);
        }
    }

}
