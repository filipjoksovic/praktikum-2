package com.wishlist.controllers;


import com.wishlist.dto.UserEmailsDTO;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.UserAlreadyInThisFamilyException;
import com.wishlist.services.interfaces.JoinRequestsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/joinRequests")
public class JoinRequestsController {

    private final Logger log = LoggerFactory.getLogger(JoinRequestsController.class);
    private final JoinRequestsService joinRequestsService;
    private final JwtValidator jwtValidator;

    public JoinRequestsController(JoinRequestsService requestJoinService, JwtValidator jwtValidator) {
        this.joinRequestsService = requestJoinService;
        this.jwtValidator = jwtValidator;
    }

    //TODO remove userId variable after JWT validaton
    @PostMapping("/{userId}/{inviteCode}")
    public ResponseEntity<?> sendJoinRequest(@PathVariable String userId, @PathVariable String inviteCode, @RequestHeader("Authorization") String jwt) {
        try{
            String senderId = jwtValidator.getUserFromJwt(jwt).getId();
            log.info("send join req to {} for fam {}", userId, inviteCode);
            log.info("send join req to {} for fam {} success", userId, inviteCode);
            return ResponseEntity.ok(this.joinRequestsService.createJoinRequest(userId, inviteCode, senderId));
        }
        catch (Exception e) {
            return (ResponseEntity<?>) ResponseEntity.internalServerError();
        } catch (UserAlreadyInThisFamilyException e) {
            return (ResponseEntity<?>) ResponseEntity.internalServerError();
        }
    }

    @GetMapping("/{familyId}")
    public ResponseEntity<?> getJoinRequests(@PathVariable String familyId) {
        log.info("get join requests for fml {}", familyId);
        log.info("get join requests for fml {} 200", familyId);
        return ResponseEntity.ok(this.joinRequestsService.getRequestsForFamily(familyId));
    }

    @GetMapping("user/{userId}")
    public ResponseEntity<?> getUserRequestStatus(@PathVariable String userId) {
        log.info("get join requests for usr {}", userId);
        log.info("get join requests for usr {} 200", userId);
        return ResponseEntity.ok(this.joinRequestsService.getRequestsForUser(userId));
    }

    @PostMapping("/{requestId}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable String requestId) {
        log.info("accpt join req {} 200", requestId);
        return ResponseEntity.ok(this.joinRequestsService.acceptRequest(requestId));
    }

    @PostMapping("/{requestId}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable String requestId) {
        log.info("rjct join req {} 200", requestId);
        return ResponseEntity.ok(this.joinRequestsService.rejectRequest(requestId));
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<?> cancelRequest(@PathVariable String requestId) {
        log.info("del join req {} 200", requestId);
        return ResponseEntity.ok(this.joinRequestsService.rejectRequest(requestId));
    }

    @PostMapping("/invite/{userId}/{familyId}")
    public ResponseEntity<?> inviteToFamily(@PathVariable String userId, @PathVariable String familyId, @RequestHeader("Authorization") String jwt) throws UserAlreadyInThisFamilyException {
        log.info("inv usr {} to fml {} 200", userId, familyId);
        //todo send invite email
        String senderId = jwtValidator.getUserFromJwt(jwt).getId();
        return ResponseEntity.ok(this.joinRequestsService.createJoinRequest(userId, familyId, senderId));
    }

    @PostMapping("/invite/{familyId}")
    public ResponseEntity<?> inviteToFamilyMultiple(@PathVariable String familyId, @RequestBody UserEmailsDTO dto, @RequestHeader("Authorization") String jwt) {
        String senderId = jwtValidator.getUserFromJwt(jwt).getId();
        this.joinRequestsService.createJoinRequests(familyId, dto.getEmails(),senderId);
        return ResponseEntity.ok().build();
    }
}

