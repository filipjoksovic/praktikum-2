package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.models.Invitation;
import com.wishlist.services.InvitationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/invitations")
public class InvitationController {

    private final InvitationService invitationService;

    public InvitationController(InvitationService invitationService) {
        this.invitationService = invitationService;
    }

    @GetMapping
    public List<Invitation> getAll() {
        return invitationService.getAllInvitations();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Invitation> getInvitation(@PathVariable String id) {
        Invitation invitation = invitationService.findById(id);
        if (invitation!=null) {
            return new ResponseEntity<>(invitation, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean success = invitationService.delete(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Invitation> create(@RequestBody Invitation invitation) {
        try {
            Invitation createdInvitation = invitationService.save(invitation);
            return new ResponseEntity<>(createdInvitation, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
