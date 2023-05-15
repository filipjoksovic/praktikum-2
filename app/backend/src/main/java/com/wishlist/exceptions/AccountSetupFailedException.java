package com.wishlist.exceptions;

public class AccountSetupFailedException extends Exception {

    public AccountSetupFailedException() {
        super("There was an error while setting up the account. Please try again later");
    }

    public AccountSetupFailedException(String message) {
        super(message);
    }
}
