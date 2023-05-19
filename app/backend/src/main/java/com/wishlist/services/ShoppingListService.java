package com.wishlist.services;

import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.models.Item;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.repositories.ShoppingListRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.services.interfaces.IShoppingListService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    public ShoppingList createShoppingList(String userId, ShoppingListDTO dto) throws Exception {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            List<Item> listItems = dto.items.stream().map(Item::new).toList();
            ShoppingList shoppingList = new ShoppingList();
            shoppingList.setItemList(listItems);
            shoppingList.setUser(user.get());
            shoppingListRepository.save(shoppingList);
            return shoppingList;
        } else {
            throw new Exception("User doesn't exist");
        }
    }


}
