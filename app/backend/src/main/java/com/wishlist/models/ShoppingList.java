package com.wishlist.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.util.List;

@Document
public class ShoppingList {
    @Id
    private String id;

    @OneToMany(mappedBy = "shoppingList")
    private List<Item> itemList;
    @ManyToOne
    @JoinColumn(name = "userId")
    private User user;

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

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
