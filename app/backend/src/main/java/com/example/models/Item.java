package com.example.models;

import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Item {
    private Long id;
    private String name;

    public Item() {
    }

    public Item(String name) {
        this.name = name;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
