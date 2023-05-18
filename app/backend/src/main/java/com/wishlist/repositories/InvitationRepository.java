package com.wishlist.repositories;

import com.wishlist.models.Invitation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvitationRepository extends MongoRepository<Invitation, String> {

    Invitation findByFamilyId(String familyId);

}
