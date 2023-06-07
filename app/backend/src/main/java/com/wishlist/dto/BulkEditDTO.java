package com.wishlist.dto;

import com.wishlist.models.ShoppingItem;

import java.util.List;

public class BulkEditDTO {
    private List<ShoppingItem> items;
    private boolean allSelected;

    public BulkEditDTO() {
    }

    public List<ShoppingItem> getItems() {
        return items;
    }

    public void setItems(List<ShoppingItem> items) {
        this.items = items;
    }

    public boolean isAllSelected() {
        return allSelected;
    }

    public void setAllSelected(boolean allSelected) {
        this.allSelected = allSelected;
    }
}
