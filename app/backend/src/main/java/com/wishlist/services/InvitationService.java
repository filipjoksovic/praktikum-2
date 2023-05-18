package com.wishlist.services;

import com.wishlist.models.Invitation;
import com.wishlist.repositories.InvitationRepository;
import com.wishlist.services.interfaces.IInvitationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class InvitationService implements IInvitationService {

    Logger logger = Logger.getLogger(InvitationService.class.getName());
    private final InvitationRepository invitationRepository;

    public InvitationService(InvitationRepository invitationRepository) {
        this.invitationRepository = invitationRepository;
    }


    @Override
    public List<Invitation> getAllInvitations() {
        return invitationRepository.findAll();
    }

    @Override
    public Invitation save(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    @Override
    public Invitation findById(String id) {
        return invitationRepository.findById(id).get();
    }

    @Override
    public Invitation updateInvitation(Invitation invitation) {
        return invitationRepository.save(invitation);
    }

    @Override
    public boolean delete(String id) {
        Optional<Invitation> invitationOptional = invitationRepository.findById(id);
        if (invitationOptional.isPresent()) {
            invitationRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    @Override
    public Invitation getInvitationByFamilyId(String familyId) {
        return invitationRepository.findByFamilyId(familyId);
    }
}
