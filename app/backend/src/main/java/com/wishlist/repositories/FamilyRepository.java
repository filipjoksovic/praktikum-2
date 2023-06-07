package com.wishlist.repositories;

import com.wishlist.models.Family;
import com.wishlist.models.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface FamilyRepository extends MongoRepository<Family, String> {
    Optional<Family> findByInviteCode(String inviteCode);
}
