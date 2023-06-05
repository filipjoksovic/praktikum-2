package com.wishlist.models;

import org.springframework.data.annotation.Id;

public class ShoppingItem {
    @Id
    private String id;
    private String name;
    private boolean checked;
    private String userId;

    public ShoppingItem() {
    }

    public ShoppingItem(String name) {
        this.name = name;
    }

    public ShoppingItem(String name, String userId) {
        this.name = name;
        this.userId = userId;
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

    public boolean isChecked() {
        return checked;
    }

    public void setChecked(boolean checked) {
        this.checked = checked;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    @Override
    public String toString() {
        return "ShoppingItem{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", checked=" + checked +
                '}';
    }
}
