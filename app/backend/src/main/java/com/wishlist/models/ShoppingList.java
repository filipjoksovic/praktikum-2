package com.wishlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class ShoppingList {
    @Id
    private String id;
    private String name;
    private String userId;
    private String familyId;
    private List<ShoppingItem> shoppingItemList;
    public ShoppingList() {
    }

    public ShoppingList(String name) {
        this.name = name;
    }
    public ShoppingList(String name, String userId, List<ShoppingItem> shoppingItemList) {
        this.name = name;
        this.userId = userId;
        this.shoppingItemList = shoppingItemList;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<ShoppingItem> getItemList() {
        return shoppingItemList;
    }

    public void setItemList(List<ShoppingItem> shoppingItemList) {
        this.shoppingItemList = shoppingItemList;
    }

    public String getName() {
        return name;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "ShoppingList{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", userId='" + userId + '\'' +
                ", shoppingItemList=" + shoppingItemList +
                '}';
    }
}
