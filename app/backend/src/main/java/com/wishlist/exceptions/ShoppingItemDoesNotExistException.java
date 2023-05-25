package com.wishlist.exceptions;

public class ShoppingItemDoesNotExistException extends Exception{
    public ShoppingItemDoesNotExistException() {
        super("Shopping Item does not exist");
    }
}
