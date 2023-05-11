package com.example.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class ShoppingList {
    private String id;
    private List<Item> itemList;

    public ShoppingList() {
    }

    public ShoppingList(List<Item> itemList) {
        this.itemList = itemList;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public List<Item> getItemList() {
        return itemList;
    }

    public void setItemList(List<Item> itemList) {
        this.itemList = itemList;
    }
}
