package com.wishlist.exceptions;

public class InvalidInviteCodeException extends Exception {
    public InvalidInviteCodeException() {
        super("Code provided is either not formatted properly, or no family has this code set.");
    }
}
