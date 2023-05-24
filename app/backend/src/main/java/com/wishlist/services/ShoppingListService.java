package com.wishlist.services;

import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.exceptions.UserHasNoShoppingListsException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.repositories.ShoppingListRepository;
import com.wishlist.services.interfaces.IItemService;
import com.wishlist.services.interfaces.IShoppingListService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService implements IShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final IItemService itemService;
    private final UserService userService;

    public ShoppingListService(ShoppingListRepository shoppingListRepository, IItemService itemService, UserService userService) {
        this.shoppingListRepository = shoppingListRepository;
        this.itemService = itemService;
        this.userService = userService;
    }

    public List<ShoppingList> getAll() {
        return shoppingListRepository.findAll();
    }

    public ShoppingList updateShoppingList(ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    public ShoppingList getShoppingList(String id) {
        return shoppingListRepository.findById(id).get();
    }

    public ShoppingList save(ShoppingList shoppingList) {
        return shoppingListRepository.save(shoppingList);
    }

    @Override
    public List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException, UserHasNoShoppingListsException {
        List<ShoppingList> shoppingListsforUser = shoppingListRepository.findByUserId(userId);
        if (shoppingListsforUser.isEmpty()) {
            throw new UserHasNoShoppingListsException();
        } else {
            return shoppingListsforUser;
        }
    }

    @Override
    public ShoppingList deleteList(String listId) throws ListDoesNotExistException {
        // TODO CHECK THE USER AND LIST BEFORE DELETING
        Optional<ShoppingList> optionalList = shoppingListRepository.findById(listId);
        if (!optionalList.isPresent()) {
            throw new ListDoesNotExistException();
        }

        ShoppingList list = optionalList.get();
        shoppingListRepository.deleteById(listId);

        return list;
    }


    public ShoppingList createShoppingList(String userId, ShoppingListDTO dto) throws UserDoesNotExistException {
        // TODO ADD THE LOGIC FOR USER IF NOT EXISTING
        ShoppingList list = new ShoppingList("My Shopping List");

        list.setName(dto.name.isBlank() ? "No name" : dto.name);
        list.setUserId(userId);
        List<ShoppingItem> newItems = new ArrayList<>();

        for (String itemName : dto.items) {
            ShoppingItem itemForDb = new ShoppingItem(itemName);
            itemService.save(itemForDb);
            newItems.add(itemForDb);
        }

        list.setItemList(newItems);
        shoppingListRepository.save(list);

        return list;
    }




}
