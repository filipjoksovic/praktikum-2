package com.wishlist.exceptions;

public class UserHasNoJoinRequestsException extends RuntimeException {

    public UserHasNoJoinRequestsException() {
        super("You have no family join requests");
    }
}
