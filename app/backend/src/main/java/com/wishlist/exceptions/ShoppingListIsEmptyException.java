package com.wishlist.exceptions;

public class ShoppingListIsEmptyException extends RuntimeException {
    public ShoppingListIsEmptyException() {
        super("Shopping list is empty");
    }
}
