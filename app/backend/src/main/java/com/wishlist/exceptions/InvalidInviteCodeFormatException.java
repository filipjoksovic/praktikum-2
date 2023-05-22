package com.wishlist.exceptions;


public class InvalidInviteCodeFormatException extends Exception{
    public InvalidInviteCodeFormatException() {
        super("Your invite code is invalid");
    }
}
