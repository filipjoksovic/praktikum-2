package com.wishlist.services;

import com.wishlist.models.Family;

public class UserAlreadyInThisFamilyException extends Throwable {

    public UserAlreadyInThisFamilyException() {
        super("User is already in this family");
    }

    public UserAlreadyInThisFamilyException(Family family) {
        super("User is already in " + family.getName() + " family");
    }

    public UserAlreadyInThisFamilyException(String name) {
        super("User is already in " + name);
    }
}
