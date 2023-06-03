package com.wishlist.controllers;

import com.wishlist.models.Invitation;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.interfaces.IInvitationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/invitations")
public class InvitationController {

    private final IInvitationService invitationService;
    private final JwtValidator jwtValidator;

    public InvitationController(final IInvitationService invitationService, final JwtValidator jwtValidator) {
        this.invitationService = invitationService;
        this.jwtValidator = jwtValidator;
    }

/*    @GetMapping
    public List<Invitation> getAll() {
        return invitationService.getAllInvitations();
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<Invitation> getInvitation(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        try{
            if(jwtValidator.validateInvitation(jwt, id)){
                Invitation invitation = invitationService.findById(id);
                if (invitation!=null) {
                    return new ResponseEntity<>(invitation, HttpStatus.OK);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }
            else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        try{
            if(jwtValidator.validateInvitation(jwt, id)){
                boolean success = invitationService.delete(id);
                if (success) {
                    return new ResponseEntity<>(HttpStatus.NO_CONTENT);
                } else {
                    return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
            }
            else{
                return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
            }
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
