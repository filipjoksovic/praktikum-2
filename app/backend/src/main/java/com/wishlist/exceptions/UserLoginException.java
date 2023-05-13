package com.wishlist.exceptions;

public class UserLoginException extends Exception {
    public UserLoginException() {
        super("User with given credentials either doesn't exist or the credentials are invalid");
    }
}
