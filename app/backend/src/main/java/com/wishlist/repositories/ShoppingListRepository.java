package com.wishlist.repositories;

import com.wishlist.models.ShoppingItem;
import com.wishlist.models.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShoppingListRepository extends MongoRepository<ShoppingList, String> {
    List<ShoppingList> findByUserId(String userId);




}
