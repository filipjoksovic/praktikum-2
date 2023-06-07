package com.wishlist.dto;

import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;

public class ShoppingListResponseDTO {

    private ShoppingList shoppingList;
    private boolean allChecked = true;

    public ShoppingListResponseDTO(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
        if (shoppingList.getItemList() == null) {
            allChecked = false;
        }
        for (ShoppingItem item : shoppingList.getItemList()) {
            if (!item.isChecked()) {
                allChecked = false;
                break;
            }
        }
    }

    public ShoppingListResponseDTO() {
    }

    public ShoppingList getShoppingList() {
        return shoppingList;
    }

    public void setShoppingList(ShoppingList shoppingList) {
        this.shoppingList = shoppingList;
    }

    public boolean isAllChecked() {
        return allChecked;
    }

    public void setAllChecked(boolean allChecked) {
        this.allChecked = allChecked;
    }
}
