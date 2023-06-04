package com.wishlist.exceptions;

public class FamilyNotFoundException extends RuntimeException{
    public FamilyNotFoundException () {
        super("Family not found");
    }
}
