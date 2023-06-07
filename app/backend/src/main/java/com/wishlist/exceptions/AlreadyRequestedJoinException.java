package com.wishlist.exceptions;

public class AlreadyRequestedJoinException extends RuntimeException {
    public AlreadyRequestedJoinException() {
        super("You have already requested a join to this family");
    }
}
