package com.wishlist.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Family {
    private String id;
    private String name;
    private List<User> usersList;
    private ShoppingList shoppingList;
    public Family() {

    }
    public Family(List<User> usersList, ShoppingList shoppingList, String name) {
        this.usersList = usersList;
        this.shoppingList = shoppingList;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<User> getUsersList() {
        return usersList;
    }

    public void setUsersList(List<User> usersList) {
        this.usersList = usersList;
    }

    public ShoppingList getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
    }
}
