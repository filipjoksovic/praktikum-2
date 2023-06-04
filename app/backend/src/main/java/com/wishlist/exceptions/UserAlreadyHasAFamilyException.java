package com.wishlist.exceptions;

public class UserAlreadyHasAFamilyException extends RuntimeException{

    public UserAlreadyHasAFamilyException() {
        super("User already has a family");
    }

}
