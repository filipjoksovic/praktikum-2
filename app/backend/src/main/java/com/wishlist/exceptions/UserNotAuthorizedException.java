package com.wishlist.exceptions;

public class UserNotAuthorizedException extends Throwable {

    public UserNotAuthorizedException() {
        super("User not authorized for this operation");
    }
}
