package com.wishlist.dto;

import com.wishlist.models.Family;

public class CreateFamilyRequestDTO {
    private String name;
    private String inviteCode;

    public CreateFamilyRequestDTO(String name, String inviteCode) {
        this.name = name;
        this.inviteCode = inviteCode;
    }

    public CreateFamilyRequestDTO() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public static Family from(CreateFamilyRequestDTO dto) {
        return new Family(dto.getName(), dto.getInviteCode());
    }

    public static CreateFamilyRequestDTO to(Family family) {
        return new CreateFamilyRequestDTO(family.getName(), family.getInviteCode());
    }
}
