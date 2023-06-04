package com.wishlist.exceptions;

public class ShoppingItemDoesNotExistException extends RuntimeException{
    public ShoppingItemDoesNotExistException() {
        super("Shopping Item does not exist");
    }
}
