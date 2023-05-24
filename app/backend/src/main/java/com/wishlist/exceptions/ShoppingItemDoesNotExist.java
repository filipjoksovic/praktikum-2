package com.wishlist.exceptions;

public class ShoppingItemDoesNotExist extends Exception{
    public ShoppingItemDoesNotExist() {
        super("Shopping Item does not exist");
    }
}
