package com.wishlist.exceptions;


public class InvalidInviteCodeFormatException extends RuntimeException{
    public InvalidInviteCodeFormatException() {
        super("Your invite code is invalid");
    }
}
