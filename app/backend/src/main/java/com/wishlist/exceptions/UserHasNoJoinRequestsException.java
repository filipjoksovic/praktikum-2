package com.wishlist.exceptions;

public class UserHasNoJoinRequestsException extends Exception {

    public UserHasNoJoinRequestsException() {
        super("You have no family join requests");
    }
}
