package com.wishlist.exceptions;

public class NoRefreshTokenException extends RuntimeException {
    public NoRefreshTokenException() {
        super("There is no refresh token");
    }
}
