package com.wishlist.exceptions;

public class ShoppingListDoesNotExistException extends RuntimeException {
    public ShoppingListDoesNotExistException() {
        super("Shopping list does not exist");
    }

}
