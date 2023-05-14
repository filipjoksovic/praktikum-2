package com.wishlist.models;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    public String id;
    @Enumerated(EnumType.STRING)
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