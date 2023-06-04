package com.wishlist.repositories;

import com.wishlist.models.RequestJoin;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RequestJoinRepository extends MongoRepository<RequestJoin, String> {
    List<RequestJoin> findByFamilyId(String familyId);

    Optional<RequestJoin> findByUserId(String userId);

    Optional<RequestJoin> findByFamilyIdAndUserId(String familyId, String userId);
}
