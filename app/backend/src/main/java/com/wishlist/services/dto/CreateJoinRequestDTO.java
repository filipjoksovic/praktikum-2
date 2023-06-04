package com.wishlist.services.dto;

public class CreateJoinRequestDTO {
    private String id;
    private String familyName;

    public CreateJoinRequestDTO() {
    }

    public CreateJoinRequestDTO(String id, String familyName) {
        this.id = id;
        this.familyName = familyName;
    }

    public String getFamilyName() {
        return familyName;
    }

    public void setFamilyName(String familyName) {
        this.familyName = familyName;
    }

}
