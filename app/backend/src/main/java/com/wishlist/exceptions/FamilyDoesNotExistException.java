package com.wishlist.exceptions;

public class FamilyDoesNotExistException extends RuntimeException {

    public FamilyDoesNotExistException() {
        super("Family does not exist");
    }

    public FamilyDoesNotExistException(String id) {
        super("Family with id " + id + " does not exist");
    }
}
