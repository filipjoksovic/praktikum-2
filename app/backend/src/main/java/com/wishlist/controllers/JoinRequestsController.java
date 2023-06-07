package com.wishlist.controllers;


import com.wishlist.dto.ApiError;
import com.wishlist.dto.FamilyMemberDTO;
import com.wishlist.dto.UserEmailsDTO;
import com.wishlist.exceptions.UserNotAuthorizedException;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.UserAlreadyInThisFamilyException;
import com.wishlist.services.dto.JoinRequestsDTO;
import com.wishlist.services.interfaces.IFamilyService;
import com.wishlist.services.interfaces.JoinRequestsService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("api/joinRequests")
public class JoinRequestsController {

    private final Logger log = LoggerFactory.getLogger(JoinRequestsController.class);
    private final JoinRequestsService joinRequestsService;
    private final JwtValidator jwtValidator;
    private final IFamilyService familyService;

    public JoinRequestsController(JoinRequestsService requestJoinService, JwtValidator jwtValidator, IFamilyService familyService) {
        this.joinRequestsService = requestJoinService;
        this.jwtValidator = jwtValidator;
        this.familyService = familyService;
    }

    //TODO remove userId variable after JWT validaton
    @PostMapping("/{userId}/{inviteCode}")
    public ResponseEntity<?> sendJoinRequest(@PathVariable String userId, @PathVariable String inviteCode, @RequestHeader("Authorization") String jwt) throws UserAlreadyInThisFamilyException, Exception {
        if (jwtValidator.validateUser(jwt,userId)) {
            JoinRequestsDTO requestJoin = joinRequestsService.createJoinRequest(userId,inviteCode,userId);
            return new ResponseEntity<>(requestJoin, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(new ApiError("You do not have access to this user"), HttpStatus.UNAUTHORIZED);
        }





    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getFamilyMembers(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateFamily(jwt, id)) {
            return new ResponseEntity<>(familyService.getFamilyMembers(id).stream().map(FamilyMemberDTO::to).collect(Collectors.toList()), HttpStatus.OK);
        } else {
            throw new UserNotAuthorizedException();
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
    public ResponseEntity<?> inviteToFamily(@PathVariable String userId, @PathVariable String familyId, @RequestHeader("Authorization") String jwt) throws UserAlreadyInThisFamilyException, Exception {
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

