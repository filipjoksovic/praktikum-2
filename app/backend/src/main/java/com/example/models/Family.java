package com.example.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Family {
    private Long id;
    private List<User> usersList;
    private ShoppingList shoppingList;
    public Family() {

    }
    public Family(List<User> usersList, ShoppingList shoppingList) {
        this.usersList = usersList;
        this.shoppingList = shoppingList;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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
