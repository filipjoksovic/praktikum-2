package com.wishlist.dto;

import java.util.List;

public class ShoppingListsResponseDTO {
    private List<ShoppingListResponseDTO> shoppingLists;
    private boolean allChecked = false;

    public ShoppingListsResponseDTO(List<ShoppingListResponseDTO> shoppingListResponseDTOS) {
        this.shoppingLists = shoppingListResponseDTOS;
        for (ShoppingListResponseDTO list : this.shoppingLists) {
            if (!list.isAllChecked()) {
                allChecked = false;
                break;
            }
        }
    }

    public List<ShoppingListResponseDTO> getShoppingLists() {
        return shoppingLists;
    }

    public void setShoppingLists(List<ShoppingListResponseDTO> shoppingLists) {
        this.shoppingLists = shoppingLists;
    }

    public boolean isAllChecked() {
        return allChecked;
    }

    public void setAllChecked(boolean allChecked) {
        this.allChecked = allChecked;
    }
}
