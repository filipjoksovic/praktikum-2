package com.wishlist.exceptions;

public class RequestJoinDoesNotExistException extends Exception{
    public RequestJoinDoesNotExistException() {
        super("This request join does not exist");
    }
}
