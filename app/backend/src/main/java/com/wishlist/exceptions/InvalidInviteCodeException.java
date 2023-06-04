package com.wishlist.exceptions;

public class InvalidInviteCodeException extends RuntimeException {
    public InvalidInviteCodeException() {
        super("Code provided is either not formatted properly, or no family has this code set.");
    }
}
