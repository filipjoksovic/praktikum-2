package com.wishlist.dto;

import com.wishlist.dto.ShoppingItemDTO;
import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import com.wishlist.models.User;
import com.wishlist.services.UserService;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

public class ShoppingListDTOV2 {
    private String id;
    private String name;
    private String userId;
    private String familyId;
    private BasicUserDataDTO user;
    private List<ShoppingItemDTO> items;

    public ShoppingListDTOV2(String id, String name, String userId, String familyId, List<ShoppingItemDTO> items) {
        this.id = id;
        this.name = name;
        this.userId = userId;
        this.familyId = familyId;
        this.items = items;
    }

    public ShoppingListDTOV2(ShoppingList list, User user) {
        this.id = list.getId();
        this.name = list.getName();
        this.userId = user.getId();
        this.user = new BasicUserDataDTO(user);
    }

    public ShoppingListDTOV2() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public List<ShoppingItemDTO> getItems() {
        return items;
    }

    public void setItems(List<ShoppingItemDTO> items) {
        this.items = items;
    }

    public BasicUserDataDTO getUser() {
        return user;
    }

    public void setUser(BasicUserDataDTO user) {
        this.user = user;
    }
}
