package com.wishlist.exceptions;

public class InvitationFailedException extends Exception {
    public InvitationFailedException() {
        super("There was an error while creating an invitation. Please try again later");
    }
}
