package com.wishlist.exceptions;

public class FailedToRemoveUserException extends RuntimeException {
    public FailedToRemoveUserException(String s) {
        super(s);
    }
}
