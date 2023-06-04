package com.wishlist.controllers;


import com.wishlist.dto.ApiError;
import com.wishlist.exceptions.*;
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

    public JoinRequestsController(JoinRequestsService requestJoinService) {
        this.joinRequestsService = requestJoinService;
    }

    //TODO remove userId variable after JWT validaton
    @PostMapping("/{userId}/{inviteCode}")
    public ResponseEntity<?> sendJoinRequest(@PathVariable String userId, @PathVariable String inviteCode) {
        log.info("send join req to {} for fam {}", userId, inviteCode);
        try {
            log.info("send join req to {} for fam {} success", userId, inviteCode);
            return ResponseEntity.ok(this.joinRequestsService.createJoinRequest(userId, inviteCode));
        } catch (UserAlreadyInThisFamilyException | UserAlreadyHasAFamilyException | FamilyDoesNotExistException |
                 UserDoesNotExistException | AlreadyRequestedJoinException e) {
            log.error("send join req to {} for fam {} fail", userId, inviteCode);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @GetMapping("/{familyId}")
    public ResponseEntity<?> getJoinRequests(@PathVariable String familyId) {
        log.info("get join requests for fml {}", familyId);
        try {
            log.info("get join requests for fml {} 200", familyId);
            return ResponseEntity.ok(this.joinRequestsService.getRequestsForFamily(familyId));
        } catch (FamilyDoesNotExistException | UserDoesNotExistException e) {
            log.error("get join requests for fml {} 500", familyId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }

    }

    @GetMapping("user/{userId}")
    public ResponseEntity<?> getUserRequestStatus(@PathVariable String userId) {
        log.info("get join requests for usr {}", userId);
        try {
            log.info("get join requests for usr {} 200", userId);
            return ResponseEntity.ok(this.joinRequestsService.getRequestsForUser(userId));
        } catch (Exception e) {
            log.error("get join requests for usr {} 500", userId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @PostMapping("/{requestId}/accept")
    public ResponseEntity<?> acceptRequest(@PathVariable String requestId) {
        log.info("accpt join req {}", requestId);
        try {
            log.info("accpt join req {} 200", requestId);
            return ResponseEntity.ok(this.joinRequestsService.acceptRequest(requestId));
        } catch (RequestJoinDoesNotExistException | FamilyDoesNotExistException | UserDoesNotExistException e) {
            log.error("accpt join req {} 500", requestId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @PostMapping("/{requestId}/reject")
    public ResponseEntity<?> rejectRequest(@PathVariable String requestId) {
        log.info("rjct join req {}", requestId);
        try {
            log.info("rjct join req {} 200", requestId);
            return ResponseEntity.ok(this.joinRequestsService.rejectRequest(requestId));
        } catch (RequestJoinDoesNotExistException e) {
            log.error("rjct join req {} 500", requestId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @DeleteMapping("/{requestId}")
    public ResponseEntity<?> cancelRequest(@PathVariable String requestId) {
        log.info("del join req {}", requestId);
        try {
            log.info("del join req {} 200", requestId);
            return ResponseEntity.ok(this.joinRequestsService.rejectRequest(requestId));
        } catch (RequestJoinDoesNotExistException e) {
            log.error("del join req {} 500", requestId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @PostMapping("/invite/{userId}/{familyId}")
    public ResponseEntity<?> inviteToFamily(@PathVariable String userId, @PathVariable String familyId) {
        log.info("inv usr {} to fml {}", userId, familyId);
        try {
            log.info("inv usr {} to fml {} 200", userId, familyId);
            //todo send invite email
            return ResponseEntity.ok(this.joinRequestsService.createJoinRequest(userId, familyId));
        } catch (UserAlreadyInThisFamilyException | UserAlreadyHasAFamilyException | FamilyDoesNotExistException |
                 UserDoesNotExistException | AlreadyRequestedJoinException e) {
            log.error("inv usr {} to fml {} 500", userId, familyId);
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }
}

