package com.wishlist.dto;

public class AddListItemsDTO {
    private String[] items;

    public AddListItemsDTO() {
    }

    public AddListItemsDTO(String[] items) {
        this.items = items;
    }

    public String[] getItems() {
        return items;
    }

    public void setItems(String[] items) {
        this.items = items;
    }
}
