package com.wishlist.services;

import com.wishlist.exceptions.ShoppingItemDoesNotExistException;
import com.wishlist.models.ShoppingItem;
import com.wishlist.repositories.ItemRepository;
import com.wishlist.services.interfaces.IItemService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemService implements IItemService {

    private final ItemRepository itemRepository;

    public ItemService(ItemRepository itemRepository) {
        this.itemRepository = itemRepository;
    }

    public List<ShoppingItem> getAll() {
        return itemRepository.findAll();
    }


    @Override
    public ShoppingItem save(ShoppingItem item) {
        return itemRepository.save(item);
    }

    @Override
    public Optional<ShoppingItem> findById(String id) {
        return itemRepository.findById(id);
    }

    @Override
    public ShoppingItem update(ShoppingItem item) {
        return itemRepository.save(item);
    }

    @Override
    public boolean delete(String id) {
        Optional<ShoppingItem> itemOptional = itemRepository.findById(id);
        if (itemOptional.isPresent()) {
            itemRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public ShoppingItem checkItem(String id) {
        ShoppingItem item = itemRepository.findById(id).orElseThrow(ShoppingItemDoesNotExistException::new);
        item.setChecked(true);
        return itemRepository.save(item);
    }

    @Override
    public ShoppingItem uncheckItem(String id) {
        ShoppingItem item = itemRepository.findById(id).orElseThrow(ShoppingItemDoesNotExistException::new);
        item.setChecked(false);
        return itemRepository.save(item);
    }


}
