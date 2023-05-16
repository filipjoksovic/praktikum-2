package com.wishlist.services;

import com.wishlist.models.Item;
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

    public List<Item> getAll() {
        return itemRepository.findAll();
    }

}
