package com.wishlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class ShoppingList {
    @Id
    private String id;

    private String name;
    private List<ShoppingItem> shoppingItemList;

    public ShoppingList() {
    }

    public ShoppingList(List<ShoppingItem> shoppingItemList) {
        this.shoppingItemList = shoppingItemList;
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

    public void setName(String name) {
        this.name = name;
    }
}
