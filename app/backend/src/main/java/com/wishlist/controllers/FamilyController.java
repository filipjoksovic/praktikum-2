package com.wishlist.controllers;

import com.wishlist.dto.CreateFamilyRequestDTO;
import com.wishlist.dto.FamilyMemberDTO;
import com.wishlist.dto.UpdateFamilyCodeDTO;
import com.wishlist.dto.UpdateFamilyRequestDTO;
import com.wishlist.exceptions.UserNotAuthorizedException;
import com.wishlist.models.Family;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.FamilyService;
import com.wishlist.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@RestController
@RequestMapping("api/families")
public class FamilyController {
    Logger logger = LoggerFactory.getLogger(FamilyController.class);
    private final FamilyService familyService;
    private final UserService userService;
    private final JwtValidator jwtValidator;

    public FamilyController(final FamilyService familyService, final UserService userService, final JwtValidator jwtValidator) {
        this.familyService = familyService;
        this.userService = userService;
        this.jwtValidator = jwtValidator;
    }

/*    @GetMapping
    public List<Family> getAll() {
        List<Family> families = familyService.getAll();
        return families;
    }*/

    @GetMapping("/{id}")
    public ResponseEntity<?> getFamily(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        logger.info("rtn fml {}", id);

        if (jwtValidator.validateFamily(jwt, id)) {
            return new ResponseEntity(familyService.findById(id), HttpStatus.OK);
        } else {
            throw new UserNotAuthorizedException();
        }
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getFamilyMembers(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateFamily(jwt, id)) {
            logger.info("get fml mbr for {} success", id);
            return new ResponseEntity<>(familyService.getFamilyMembers(id).stream().map(FamilyMemberDTO::to).collect(Collectors.toList()), HttpStatus.OK);
        } else {
            logger.error("get fml mbr for {} fail", id);
            throw new UserNotAuthorizedException();
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFamilyForUser(@PathVariable String userId, @RequestHeader("Authorization") String jwt) {
        logger.info("rtn fml for usr {}", userId);
        if (jwtValidator.validateUser(jwt, userId)) {
            return new ResponseEntity<>(familyService.findByUser(userId), HttpStatus.OK);
        } else {
            throw new UserNotAuthorizedException();
        }
    }

    @DeleteMapping("/{familyId}")
    public ResponseEntity<?> delete(@PathVariable String familyId, @RequestHeader("Authorization") String jwt) {
        if (jwtValidator.validateFamily(jwt, familyId) && familyService.isOwner(jwtValidator.getUserFromJwt(jwt).getId(), familyId)) {
            return new ResponseEntity<>(familyService.delete(familyId), HttpStatus.OK);
        } else {
            throw new UserNotAuthorizedException();
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> create(@PathVariable String userId, @RequestBody CreateFamilyRequestDTO dto, @RequestHeader("Authorization") String jwt) {
        logger.info("POST createFamily");

        if (jwtValidator.validateUser(jwt, userId)) {
            Family saved = familyService.saveWithOwner(CreateFamilyRequestDTO.from(dto), userService.getUserById(userId));
            userService.addUserToFamily(userId, saved.getId());
            logger.info("POST createFamily fml crt HTTP 200");
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } else {
            throw new UserNotAuthorizedException();
        }

    }

    //Beni doesn't like this route     ahahahahahahhaahha
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody UpdateFamilyRequestDTO updatedFamily) {
        //todo move to service layer
        logger.info("updt fml {}", id);
        return ResponseEntity.ok(familyService.update(id, updatedFamily.getName()));
    }

    @PostMapping("/{familyId}/code")
    public ResponseEntity<?> changeCode(@PathVariable String familyId, @RequestBody UpdateFamilyCodeDTO updateFamilyCodeDTO) {
        logger.info("updt fml code {}", familyId);
        return ResponseEntity.ok(familyService.updateCode(familyId, updateFamilyCodeDTO.getCode()));

    }

    @PostMapping("/leave/{familyId}/{userId}")
    public ResponseEntity<?> leaveFamily(@PathVariable("familyId") String familyId, @PathVariable("userId") String userId, @RequestHeader("Authorization") String jwt) {

        if (jwtValidator.validateFamily(jwt, familyId) && !familyService.isOwner(familyId, userId)) {
            return new ResponseEntity<>(familyService.removeUserFromFamily(familyId, userId), HttpStatus.OK);
        } else {
            throw new RuntimeException("Owner cannot leave family");
        }

    }

    @DeleteMapping("/{familyId}/{userId}/remove")
    public ResponseEntity<?> removeUserFromFamily(@PathVariable String familyId, @PathVariable String userId, @RequestHeader("Authorization") String jwt) {
        String requestingUserId = jwtValidator.getUserFromJwt(jwt).getId();
        if (familyService.isOwner(requestingUserId, familyId)) {
            logger.info("rmv usr {} from fml {} 200", userId, familyId);
            return ResponseEntity.ok(familyService.removeUserFromFamily(familyId, userId));
        } else {
            throw new UserNotAuthorizedException();
        }
    }
}
