package com.wishlist.services;

import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.exceptions.InvitationFailedException;
import com.wishlist.models.Family;
import com.wishlist.models.Invitation;
import com.wishlist.models.User;
import com.wishlist.repositories.InvitationRepository;
import com.wishlist.services.interfaces.IEmailSender;
import com.wishlist.services.interfaces.IFamilyService;
import com.wishlist.services.interfaces.IInvitationService;
import com.wishlist.services.interfaces.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class InvitationService implements IInvitationService {

    Logger logger = Logger.getLogger(InvitationService.class.getName());
    private final InvitationRepository invitationRepository;
    private final IUserService userService;
    private final IFamilyService familyService;
    private final IEmailSender emailSender;

    public InvitationService(InvitationRepository invitationRepository, IUserService userService, IFamilyService familyService, IEmailSender emailSender) {
        this.invitationRepository = invitationRepository;
        this.userService = userService;
        this.familyService = familyService;
        this.emailSender = emailSender;
    }


    @Override
    public List<Invitation> getAllInvitations() {
        return invitationRepository.findAll();
    }

    @Override
    public Invitation save(Invitation invitation) throws InvitationFailedException, FamilyDoesNotExistException {

        logger.info(invitation.toString());
        String userToId = invitation.getUserId();
        String familyId = invitation.getFamilyId();

        Optional<User> user = Optional.ofNullable(userService.getUserById(userToId));
        Optional<Family> family = Optional.ofNullable(familyService.findById(familyId));

        if (user.isPresent() && family.isPresent()) {
            String email = user.get().getEmail();
            String name = user.get().getName();
            String surname = user.get().getSurname();
            String familyName = family.get().getName();
            emailSender.sendInvitationEmail(email,name,surname,familyName);
        }
        else {
            throw new InvitationFailedException();
        }
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
