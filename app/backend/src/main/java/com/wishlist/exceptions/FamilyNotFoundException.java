package com.wishlist.exceptions;

public class FamilyNotFoundException extends Exception{
    public FamilyNotFoundException () {
        super("Family not found");
    }
}
