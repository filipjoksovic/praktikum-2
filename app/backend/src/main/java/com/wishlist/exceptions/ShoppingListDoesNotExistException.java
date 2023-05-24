package com.wishlist.exceptions;

public class ShoppingListDoesNotExistException extends Exception {
    public ShoppingListDoesNotExistException() {
        super("Shopping list does not exist");
    }

}
