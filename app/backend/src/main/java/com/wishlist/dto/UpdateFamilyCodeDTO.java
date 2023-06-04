package com.wishlist.dto;

public class UpdateFamilyCodeDTO {
    private String code;

    public UpdateFamilyCodeDTO(String code) {
        this.code = code;
    }

    public UpdateFamilyCodeDTO() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}
