package com.wishlist.exceptions;

public class UserHasNoShoppingListsException extends Exception{

    public UserHasNoShoppingListsException() {
        super("This user doesn't have any shopping lists created");
    }

}
