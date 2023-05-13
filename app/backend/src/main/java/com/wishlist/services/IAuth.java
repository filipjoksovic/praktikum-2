package com.wishlist.services;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.models.User;

public interface IAuth {
    public User login(AuthRequestDTO dto) throws Exception;

    public User register(AuthRequestDTO dto) throws Exception;
}
