package com.wishlist.dto;

import com.wishlist.models.ShoppingItem;
import com.wishlist.models.User;

public class ShoppingItemDTO {
    private String id;
    private String name;
    private boolean checked;
    private BasicUserDataDTO addedBy;

    public ShoppingItemDTO() {
    }

    public ShoppingItemDTO(String id, String name, boolean checked, User user) {
        this.id = id;
        this.name = name;
        this.checked = checked;
        this.addedBy = new BasicUserDataDTO(user);
    }

    public ShoppingItemDTO(ShoppingItem item, User user) {
        this.id = item.getId();
        this.name = item.getName();
        this.checked = item.isChecked();
        this.addedBy = new BasicUserDataDTO(user);
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

    public BasicUserDataDTO getAddedBy() {
        return addedBy;
    }

    public void setAddedBy(BasicUserDataDTO addedBy) {
        this.addedBy = addedBy;
    }
}
