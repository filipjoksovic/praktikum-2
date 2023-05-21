package com.wishlist.services;

import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.ListDoesNotExistException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.repositories.ShoppingListRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.services.interfaces.IShoppingListService;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ShoppingListService implements IShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final UserRepository userRepository;

    public ShoppingListService(ShoppingListRepository shoppingListRepository, UserRepository userRepository) {
        this.shoppingListRepository = shoppingListRepository;
        this.userRepository = userRepository;
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
    public List<ShoppingList> getShoppingListForUser(String userId) throws UserDoesNotExistException {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return user.get().getShoppingLists();
        } else {
            throw new UserDoesNotExistException();
        }
    }

    @Override
    public List<ShoppingList> deleteList(String userId, String listId) throws ListDoesNotExistException, UserDoesNotExistException {
        Optional<User> user = userRepository.findById(userId);
        if(user.isEmpty()){
            throw new UserDoesNotExistException();
        }
        //TODO refactor with proper relationships
        User found = user.get();
        found.getShoppingLists().remove(Integer.parseInt(listId));
        userRepository.save(found);
        return found.getShoppingLists();
    }

    public ShoppingList createShoppingList(String userId, ShoppingListDTO dto) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {

            List<ShoppingItem> listShoppingItems = dto.items.stream().map(ShoppingItem::new).toList();
            User found = user.get();
            ShoppingList list = new ShoppingList();
            list.setName(dto.name.isBlank() ? "No name" : dto.name);
            list.setItemList(listShoppingItems);
            List<ShoppingList> userShoppingLists = found.getShoppingLists();
            if (userShoppingLists == null) {
                userShoppingLists = new ArrayList<>();
            }
            userShoppingLists.add(list);
            found.setShoppingLists(userShoppingLists);
            userRepository.save(found);
            return list;
        } else {
            throw new Exception("User doesn't exist");
        }
    }


}
