package com.wishlist.repositories;

import com.wishlist.models.ShoppingList;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ShoppingListRepository extends MongoRepository<ShoppingList, String> {
}
