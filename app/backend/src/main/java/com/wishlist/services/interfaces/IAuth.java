package com.wishlist.services.interfaces;

import com.wishlist.dto.AuthRequestDTO;
import com.wishlist.dto.AuthResponseDTO;
import com.wishlist.exceptions.UserAlreadyExistsException;
import com.wishlist.exceptions.UserDoesNotExistException;
import com.wishlist.models.User;

public interface IAuth {
    public AuthResponseDTO login(AuthRequestDTO dto) throws Exception;

    public User register(AuthRequestDTO dto) throws UserAlreadyExistsException;

    public User doesExist(String id) throws UserDoesNotExistException;
}
