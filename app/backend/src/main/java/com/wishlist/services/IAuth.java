package com.wishlist.services;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.models.User;

public interface IAuth {
    public AuthResponseDTO login(AuthRequestDTO dto) throws Exception;

    public User register(AuthRequestDTO dto) throws Exception;
}
