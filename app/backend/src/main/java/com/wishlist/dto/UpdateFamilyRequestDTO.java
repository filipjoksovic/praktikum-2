package com.wishlist.dto;

public class UpdateFamilyRequestDTO {

    private String name;

    public UpdateFamilyRequestDTO(String name) {
        this.name = name;
    }

    public UpdateFamilyRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
