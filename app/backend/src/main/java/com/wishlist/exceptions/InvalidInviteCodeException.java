package com.wishlist.exceptions;

public class InvalidInviteCodeException extends Exception{
    public InvalidInviteCodeException() {
        super("There is not a single family with the code you provided, please try again");
    }
}
