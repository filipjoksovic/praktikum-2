package com.wishlist.repositories;

import com.wishlist.models.ShoppingItem;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItemRepository extends MongoRepository<ShoppingItem, String> {
}
