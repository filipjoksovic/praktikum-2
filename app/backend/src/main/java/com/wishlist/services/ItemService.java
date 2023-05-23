package com.wishlist.services;

import com.wishlist.models.ShoppingItem;
import com.wishlist.repositories.ItemRepository;
import com.wishlist.services.interfaces.IItemService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ItemService implements IItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ShoppingItem> getAll() {
        return itemRepository.findAll();
    }

    public ShoppingItem save(ShoppingItem item) {
        return itemRepository.save(item);
    }

}
