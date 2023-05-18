package com.wishlist.models;

import org.springframework.data.mongodb.core.mapping.Document;

import java.util.Date;

@Document
public class Invitation {
    private String id;
    private String familyId;
    private String userId;
    private Date expirationDate;

    public Invitation(String id, String familyId, String userId, Date expirationDate) {
        this.id = id;
        this.familyId = familyId;
        this.userId = userId;
        this.expirationDate = expirationDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFamilyId() {
        return familyId;
    }

    public void setFamilyId(String familyId) {
        this.familyId = familyId;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public Date getExpirationDate() {
        return expirationDate;
    }

    public void setExpirationDate(Date expirationDate) {
        this.expirationDate = expirationDate;
    }
}
