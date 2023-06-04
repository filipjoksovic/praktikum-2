package com.wishlist.models;

import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

@Document
public class RequestJoin {
    @Id
    private String id;
    private String familyId;
    private String inviteCode;
    private String userId;
    private String createdAt;

    public RequestJoin(String id, String familyId, String userId) {
        this.id = id;
        this.familyId = familyId;
        this.userId = userId;
    }

    public RequestJoin(String familyId, String userId) {
        this.familyId = familyId;
        this.userId = userId;
        this.createdAt = ZonedDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
    }

    public RequestJoin() {
        this.createdAt = ZonedDateTime.now().format(DateTimeFormatter.ISO_DATE_TIME);
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

    public String getInviteCode() {
        return inviteCode;
    }

    public void setInviteCode(String inviteCode) {
        this.inviteCode = inviteCode;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }
}
