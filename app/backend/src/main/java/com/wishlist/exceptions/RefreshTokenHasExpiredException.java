package com.wishlist.exceptions;

public class RefreshTokenHasExpiredException extends RuntimeException {

    public RefreshTokenHasExpiredException() {
        super("Refresh token has expired, please login again");
    }

}
