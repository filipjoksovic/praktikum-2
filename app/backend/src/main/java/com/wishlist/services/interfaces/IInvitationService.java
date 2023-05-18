package com.wishlist.services.interfaces;

import com.wishlist.exceptions.InvitationFailedException;
import com.wishlist.models.Invitation;

import java.util.List;

public interface IInvitationService {
    List<Invitation> getAllInvitations();
    Invitation save(Invitation invitation) throws InvitationFailedException;
    Invitation findById(String id);
    Invitation updateInvitation(Invitation invitation);
    boolean delete(String id);
    Invitation getInvitationByFamilyId(String familyId);

}
