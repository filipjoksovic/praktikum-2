package com.wishlist.exceptions;

public class RequestJoinDoesNotExistException extends RuntimeException{
    public RequestJoinDoesNotExistException() {
        super("This request join does not exist");
    }
}
