package com.wishlist.models;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document
public class Family {
    private String id;
    private String name;
    @DBRef
    private User owner;
    @DBRef
    private List<User> users;
    private String inviteCode;
    public Family() {

    }
    public Family(String name, User owner, List<User> users, String inviteCode) {
        this.name = name;
        this.owner = owner;
        this.users = users;
        this.inviteCode = inviteCode;
    }

    public Family(String name, String inviteCode) {
        this.name = name;
        this.inviteCode = inviteCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
    public User getOwner(){
        return owner;
    }
    public void setOwner(User owner){
        this.owner = owner;
    }

    public List<User> getUsers() {
        return users;
    }

    public void setUsers(List<User> users) {
        this.users = users;
    }

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

}
