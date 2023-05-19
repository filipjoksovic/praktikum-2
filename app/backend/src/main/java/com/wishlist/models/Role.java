package com.wishlist.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.*;


@Document
public class Role {
    @Id
    private String id;
    private UserRoleEnum name;
    public Role() {
    }
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public UserRoleEnum getName() {
        return name;
    }

    public void setName(UserRoleEnum role) {
        this.name = role;
    }

}
