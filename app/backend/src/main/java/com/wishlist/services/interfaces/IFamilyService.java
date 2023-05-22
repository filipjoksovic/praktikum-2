package com.wishlist.services.interfaces;

import com.wishlist.models.Family;

import java.util.List;

public interface IFamilyService {

    List<Family> getAll();
    Family findById(String id);
    boolean delete(String id);
    Family save(Family family);
    String generateRandomString();

}
