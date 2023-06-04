package com.wishlist.exceptions;

public class UserNotAuthorizedException extends RuntimeException {

    public UserNotAuthorizedException() {
        super("User not authorized for this operation");
    }
}
