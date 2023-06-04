package com.wishlist.services;

import com.wishlist.dto.AddListItemsDTO;
import com.wishlist.dto.BulkCheckDTO;
import com.wishlist.dto.ShoppingListDTO;
import com.wishlist.exceptions.*;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.repositories.ShoppingListRepository;
import com.wishlist.services.interfaces.IItemService;
import com.wishlist.services.interfaces.IShoppingListService;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.logging.Logger;

@Service
public class ShoppingListService implements IShoppingListService {

    private final ShoppingListRepository shoppingListRepository;
    private final IItemService itemService;
    private final UserService userService;
    Logger logger = Logger.getLogger(ShoppingListService.class.getName());

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
    public List<ShoppingList> getShoppingListForUser(String userId) throws UserHasNoShoppingListsException {
        List<ShoppingList> shoppingListsforUser = shoppingListRepository.findByUserId(userId);
        if (shoppingListsforUser.isEmpty()) {
            throw new UserHasNoShoppingListsException();
        } else {
            return shoppingListsforUser;
        }
    }

    @Override
    public List<ShoppingList> getShoppingListForFamily(String familyId) throws ShoppingListIsEmptyException {
        List<ShoppingList> shoppingListsforFamily = shoppingListRepository.findByFamilyId(familyId);
        if (shoppingListsforFamily.isEmpty()) {
            throw new ShoppingListIsEmptyException();
        } else {
            return shoppingListsforFamily;
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

    @Override
    public ShoppingList createShoppingListForFamily(String familyId, ShoppingListDTO dto) {
        // TODO ADD THE LOGIC FOR FAMILY IF NOT EXISTING
        ShoppingList list = new ShoppingList("My Shopping List");

        list.setName(dto.name.isBlank() ? "No name" : dto.name);
        list.setFamilyId(familyId);
        return getShoppingList(dto, list);
    }

    public ShoppingList createShoppingListForUser(String userId, ShoppingListDTO dto) throws ShoppingListIsEmptyException {
        // TODO ADD THE LOGIC FOR USER IF NOT EXISTING
        ShoppingList list = new ShoppingList();

        list.setName(dto.name.isBlank() ? "No name" : dto.name);
        list.setUserId(userId);
        return getShoppingList(dto, list);
    }

    private ShoppingList getShoppingList(ShoppingListDTO dto, ShoppingList list) {
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


    @Override
    public ShoppingList addItemToShoppingList(ShoppingItem item, String shoppingListId) throws ShoppingListDoesNotExistException {
        Optional<ShoppingList> optionalShoppingList = shoppingListRepository.findById(shoppingListId);
        if (optionalShoppingList.isEmpty()) {
            throw new ShoppingListDoesNotExistException();
        }
        ShoppingList shoppingList = optionalShoppingList.get();
        List<ShoppingItem> currentItems = shoppingList.getItemList();
        itemService.save(item);
        currentItems.add(item);
        shoppingListRepository.save(shoppingList);
        return shoppingList;
    }

    @Override
    public ShoppingList addItemsToShoppingList(AddListItemsDTO items, String shoppingListId) throws ShoppingListDoesNotExistException {
        ShoppingList list = shoppingListRepository.findById(shoppingListId).orElseThrow(ShoppingListDoesNotExistException::new);
        for (String item : items.getItems()) {
            ShoppingItem saved = itemService.save(new ShoppingItem(item));
            list.getItemList().add(saved);
        }
        shoppingListRepository.save(list);
        return list;
    }

    @Override
    public ShoppingList deleteItemFromShoppingList(String userId, String listId, String itemId) throws UserNotAuthorizedException, ShoppingListDoesNotExistException, ShoppingItemDoesNotExistException {
        User user = userService.getUserById(userId);
        Optional<ShoppingList> shoppingListOptional = shoppingListRepository.findById(listId);
        if (shoppingListOptional.isEmpty()) {
            throw new ShoppingListDoesNotExistException();
        }
        ShoppingList shoppingList = shoppingListOptional.get();
        if (!Objects.equals(shoppingList.getUserId(), user.getId())) {
            //TODO custom exception
            throw new UserNotAuthorizedException();
        }

        Optional<ShoppingItem> itemToRemoveOptional = itemService.findById(itemId);
        if (itemToRemoveOptional.isEmpty()) {
            //TODO custom exception
            throw new ShoppingItemDoesNotExistException();
        }

        List<ShoppingItem> currentItems = shoppingList.getItemList();
        ShoppingItem itemToRemove = itemToRemoveOptional.get();
        currentItems.removeIf(item -> item.getId().equals(itemToRemove.getId()));
        itemService.delete(itemId);
        shoppingList.setItemList(currentItems);
        shoppingListRepository.save(shoppingList);
        return shoppingList;
    }

    @Override
    public ShoppingItem updateShoppingItem(String listId, String itemId, ShoppingItem item) throws ShoppingItemDoesNotExistException, ShoppingListDoesNotExistException {
        Optional<ShoppingItem> shoppingItemOptional = itemService.findById(itemId);
        if (shoppingItemOptional.isEmpty()) {
            throw new ShoppingItemDoesNotExistException();
        }
        ShoppingItem foundItem = shoppingItemOptional.get();
        foundItem.setName(item.getName());
        foundItem.setChecked(item.isChecked());
        Optional<ShoppingList> listOptional = shoppingListRepository.findById(listId);
        if (listOptional.isEmpty()) {
            throw new ShoppingListDoesNotExistException();
        }
        ShoppingList foundList = listOptional.get();
        List<ShoppingItem> listOfItems = foundList.getItemList();

        for (ShoppingItem shoppingItem : listOfItems) {
            if (shoppingItem.getId().equals(itemId)) {
                int index = listOfItems.indexOf(shoppingItem);
                listOfItems.set(index, item);
                break;
            }
        }
        foundList.setItemList(listOfItems);
        shoppingListRepository.save(foundList);
        return itemService.save(foundItem);
    }

    @Override
    public ShoppingList completeWholeList(String id) throws ShoppingListDoesNotExistException {
        Optional<ShoppingList> maybeList = shoppingListRepository.findById(id);
        if (maybeList.isEmpty()) {
            throw new ShoppingListDoesNotExistException();
        }
        ShoppingList fullList = maybeList.get();
        fullList.getItemList().stream().forEach(shoppingItem -> shoppingItem.setChecked(true));
        shoppingListRepository.save(fullList);
        return fullList;
    }

    @Override
    public ShoppingList completeListItem(String listId, String itemId) throws ShoppingListDoesNotExistException {
        Optional<ShoppingList> maybeList = shoppingListRepository.findById(listId);
        if (maybeList.isEmpty()) {
            throw new ShoppingListDoesNotExistException();
        }
        ShoppingList fullList = maybeList.get();
        //TODO refactor with mongo logic;
        for (ShoppingItem item : fullList.getItemList()) {
            if (item.getId().equals(itemId)) {
                item.setChecked(true);
            }
        }
        shoppingListRepository.save(fullList);
        return fullList;
    }

    @Override
    public boolean hasList(String familyId) {
        List<ShoppingList> lists = shoppingListRepository.findByFamilyId(familyId);
        if (lists.size() == 0) {
            return false;
        }
        return true;
    }

    @Override
    public ShoppingList findShoppingListIdByItemId(String itemId) {
        List<ShoppingList> allShoppingLists = shoppingListRepository.findAll();
        for (ShoppingList shoppingList : allShoppingLists) {
            for (ShoppingItem shoppingItem : shoppingList.getItemList()) {
                if (shoppingItem.getId().equals(itemId)) {
                    return shoppingList;
                }
            }
        }
        return null;
    }

    @Override
    public ShoppingList updateList(String id, ShoppingList updatedShoppingList) throws ShoppingListDoesNotExistException {
        ShoppingList list = shoppingListRepository.findById(id).orElseThrow(ShoppingListDoesNotExistException::new);
        if (!list.getName().equals(updatedShoppingList.getName())) {
            list.setName(updatedShoppingList.getName());
            shoppingListRepository.save(list);
        }
        return list;
    }

    @Override
    public ShoppingList bulkCheck(BulkCheckDTO dto, String listId) {

        ShoppingList list = shoppingListRepository.findById(listId).orElseThrow(ShoppingListDoesNotExistException::new);
        Map<String, Boolean> mapped = new HashMap<>();
        Arrays.stream(dto.getIds()).forEach(id -> mapped.put(id, true));
        List<ShoppingItem> updatedItems = new ArrayList<>();

        if (!dto.isAllSelected()) {
            list.getItemList().forEach(item -> {
                if (mapped.containsKey(item.getId())) {
                    item.setChecked(true);
                }
                updatedItems.add(item);
            });
        } else {
            list.getItemList().forEach(item -> {
                item.setChecked(true);
                updatedItems.add(item);
            });
        }
        list.setItemList(updatedItems);
        shoppingListRepository.save(list);
        return list;
    }

    @Override
    public ShoppingList bulkUncheck(BulkCheckDTO dto, String listId) {

        ShoppingList list = shoppingListRepository.findById(listId).orElseThrow(ShoppingListDoesNotExistException::new);
        Map<String, Boolean> mapped = new HashMap<>();
        Arrays.stream(dto.getIds()).forEach(id -> mapped.put(id, true));
        List<ShoppingItem> updatedItems = new ArrayList<>();

        if (!dto.isAllSelected()) {
            list.getItemList().forEach(item -> {
                if (mapped.containsKey(item.getId())) {
                    item.setChecked(false);
                }
                updatedItems.add(item);
            });
        } else {
            list.getItemList().forEach(item -> {
                item.setChecked(false);
                updatedItems.add(item);
            });
        }
        list.setItemList(updatedItems);
        shoppingListRepository.save(list);
        return list;
    }


}
