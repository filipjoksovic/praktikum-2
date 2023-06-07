package com.wishlist.exceptions;

public class UserHasNoShoppingListsException extends RuntimeException{

    public UserHasNoShoppingListsException() {
        super("This user doesn't have any shopping lists created");
    }

}
