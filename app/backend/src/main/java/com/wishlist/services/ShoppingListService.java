package com.wishlist.services;

import com.wishlist.dto.*;
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
    public ShoppingListDTOV2 getShoppingListForFamily(String familyId) throws ShoppingListIsEmptyException {
        List<ShoppingList> shoppingListsforFamily = shoppingListRepository.findByFamilyId(familyId);

        if (shoppingListsforFamily.isEmpty()) {
            throw new ShoppingListIsEmptyException();
        }
        ShoppingList list = shoppingListsforFamily.get(0);
        ShoppingListDTOV2 dto = new ShoppingListDTOV2();
        dto.setId(list.getId());
        dto.setName(list.getName());
        dto.setFamilyId(list.getFamilyId());

        List<ShoppingItem> items = list.getItemList();
        List<ShoppingItemDTO> dtoItems = new ArrayList<>();
        for (ShoppingItem item : items) {
            User addedByUser = userService.getUserById(item.getUserId());
            ShoppingItemDTO dtoItem = new ShoppingItemDTO(item, addedByUser);
            dtoItems.add(dtoItem);
        }
        dto.setItems(dtoItems);
        return dto;
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
    public ShoppingList createShoppingListForFamily(String familyId, ShoppingListDTO dto, String creatorId) {
        // TODO ADD THE LOGIC FOR FAMILY IF NOT EXISTING
        ShoppingList list = new ShoppingList("My Shopping List");

        list.setName(dto.name.isBlank() ? "No name" : dto.name);
        list.setFamilyId(familyId);
        return getShoppingList(dto, list, creatorId);
    }

    public ShoppingList createShoppingListForUser(String userId, ShoppingListDTO dto) throws ShoppingListIsEmptyException {
        // TODO ADD THE LOGIC FOR USER IF NOT EXISTING
        ShoppingList list = new ShoppingList();

        list.setName(dto.name.isBlank() ? "No name" : dto.name);
        list.setUserId(userId);
        return getShoppingList(dto, list, userId);
    }

    private ShoppingList getShoppingList(ShoppingListDTO dto, ShoppingList list, String creatorId) {
        List<ShoppingItem> newItems = new ArrayList<>();

        for (String itemName : dto.items) {
            ShoppingItem itemForDb = new ShoppingItem(itemName);
            itemForDb.setUserId(creatorId);
            itemService.save(itemForDb);
            newItems.add(itemForDb);
        }
        list.setItemList(newItems);
        shoppingListRepository.save(list);
        return list;
    }


    @Override
    public ShoppingList addItemToShoppingList(ShoppingItem item, String shoppingListId, String creatorId) throws ShoppingListDoesNotExistException {
        Optional<ShoppingList> optionalShoppingList = shoppingListRepository.findById(shoppingListId);
        item.setUserId(creatorId);
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
    public ShoppingList addItemsToShoppingList(AddListItemsDTO items, String shoppingListId, String creatorId) throws ShoppingListDoesNotExistException {
        ShoppingList list = shoppingListRepository.findById(shoppingListId).orElseThrow(ShoppingListDoesNotExistException::new);
        for (String item : items.getItems()) {
            ShoppingItem saved = itemService.save(new ShoppingItem(item, creatorId));
            list.getItemList().add(saved);
        }
        shoppingListRepository.save(list);
        return list;
    }

    @Override
    public ShoppingListDTOV2 deleteItemFromShoppingList(String userId, String listId, String itemId) throws UserNotAuthorizedException, ShoppingListDoesNotExistException, ShoppingItemDoesNotExistException {
        User user = userService.getUserById(userId);
        ShoppingList shoppingList = shoppingListRepository.findById(listId).orElseThrow(ShoppingListDoesNotExistException::new);

        if (!Objects.equals(shoppingList.getUserId(), user.getId()) && !Objects.equals(shoppingList.getFamilyId(), user.getFamilyId())) {
            throw new UserNotAuthorizedException();
        }

        ShoppingItem itemToRemove = itemService.findById(itemId).orElseThrow(ShoppingItemDoesNotExistException::new);

        List<ShoppingItem> currentItems = shoppingList.getItemList();
        currentItems.removeIf(item -> item.getId().equals(itemToRemove.getId()));
        itemService.delete(itemId);
        shoppingList.setItemList(currentItems);
        shoppingListRepository.save(shoppingList);
        List<ShoppingItemDTO> dtoItems = new ArrayList<>();
        for (ShoppingItem item : currentItems) {
            User addedByUser = userService.getUserById(item.getUserId());
            ShoppingItemDTO dtoItem = new ShoppingItemDTO(item, addedByUser);
            dtoItems.add(dtoItem);
        }

        ShoppingListDTOV2 dto = new ShoppingListDTOV2(shoppingList, user);
        dto.setItems(dtoItems);

        return dto;
    }

    @Override
    public ShoppingItem updateShoppingItem(String listId, String itemId, ShoppingItem item) throws ShoppingItemDoesNotExistException, ShoppingListDoesNotExistException {
        ShoppingItem foundItem = itemService.findById(itemId).orElseThrow(ShoppingItemDoesNotExistException::new);
        foundItem.setName(item.getName());
        foundItem.setChecked(item.isChecked());
        ShoppingList foundList = shoppingListRepository.findById(listId).orElseThrow(ShoppingListIsEmptyException::new);
        List<ShoppingItem> listOfItems = foundList.getItemList();
        ShoppingItem foundListItem = listOfItems.stream().filter(i -> i.getId().equals(itemId)).findFirst().orElseThrow(ShoppingItemDoesNotExistException::new);
        if (item.getName() != null) {
            foundListItem.setName(item.getName());
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
