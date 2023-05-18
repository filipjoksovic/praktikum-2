package com.wishlist.exceptions;

public class RefreshTokenHasExpiredException extends Exception {

    public RefreshTokenHasExpiredException() {
        super("Refresh token has expired, please login again");
    }

}
