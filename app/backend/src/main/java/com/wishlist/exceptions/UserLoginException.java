package com.wishlist.exceptions;

public class UserLoginException extends RuntimeException {
    public UserLoginException() {
        super("User with given credentials either doesn't exist or the credentials are invalid");
    }
}
