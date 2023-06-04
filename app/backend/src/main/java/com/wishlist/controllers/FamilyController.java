package com.wishlist.controllers;

import com.wishlist.dto.*;
import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.security.JwtGeneratorImpl;
import com.wishlist.security.JwtValidator;
import com.wishlist.services.FamilyService;
import com.wishlist.services.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
        try {
            logger.info("rtn fml {}", id);

            if(jwtValidator.validateFamily(jwt, id)){
                return new ResponseEntity(familyService.findById(id), HttpStatus.OK);
            }
            else{
                logger.info("rtn fml {} FAIL", id);
                return new ResponseEntity(new ApiError("user does not have access to this family"), HttpStatus.UNAUTHORIZED);
            }
        } catch (FamilyDoesNotExistException e) {
            logger.info("rtn fml {} FAIL", id);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getFamilyMembers(@PathVariable String id, @RequestHeader("Authorization") String jwt) {
        logger.info("get fml mbr for {}", id);
        try {
            if(jwtValidator.validateFamily(jwt, id)){
            logger.info("get fml mbr for {} success", id);
                return new ResponseEntity<>(familyService.getFamilyMembers(id).stream().map(FamilyMemberDTO::to).collect(Collectors.toList()), HttpStatus.OK);
            } else {
                logger.error("get fml mbr for {} fail", id);
                return new ResponseEntity(new ApiError("User does not have access to this family"), HttpStatus.UNAUTHORIZED);
            }
        } catch (FamilyDoesNotExistException e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFamilyForUser(@PathVariable String userId, @RequestHeader("Authorization") String jwt) {
        logger.info("get fml for usr {}", userId);
        try {
            logger.info("rtn fml for usr {}", userId);
            if(jwtValidator.validateUser(jwt, userId)){
                return new ResponseEntity<>(familyService.findByUser(userId), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(new ApiError("User does not have access to this family"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (FamilyDoesNotExistException e) {
            logger.info("rtn fml for usr {} FAIL", userId);
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{familyId}")
    public ResponseEntity<?> delete(@PathVariable String familyId, @RequestHeader("Authorization") String jwt) {
        try {

            if (jwtValidator.validateFamily(jwt, familyId) && familyService.isOwner(jwtValidator.getUserFromJwt(jwt).getId(), familyId)){
                return new ResponseEntity<>(familyService.delete(familyId), HttpStatus.OK);
            }
            else{
                return new ResponseEntity<>(new ApiError("You do not have access to this user"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (FamilyDoesNotExistException e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> create(@PathVariable String userId, @RequestBody CreateFamilyRequestDTO dto, @RequestHeader("Authorization") String jwt) {
        logger.info("POST createFamily");
        try {
            if (jwtValidator.validateUser(jwt, userId)){
                Family saved = familyService.saveWithOwner(CreateFamilyRequestDTO.from(dto), userService.getUserById(userId));
                userService.addUserToFamily(userId, saved.getId());
                logger.info("POST createFamily fml crt HTTP 200");
                return new ResponseEntity<>(saved, HttpStatus.CREATED);
            }
            else{
                return new ResponseEntity<>(new ApiError("You do not have access to this user"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (Exception e) {
            logger.error("POST createFamily FAIL {}", e.getMessage());
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }
    //Beni doesn't like this route
    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable String id, @RequestBody UpdateFamilyRequestDTO updatedFamily) {
        //todo move to service layer
        logger.info("updt fml {}", id);
        try {
//            Family family = familyService.findById(id);
//            family.setUsers(updatedFamily.getUsers());
//            Family updatedFamilyResult = familyService.save(family);
            logger.info("updt fml {} success", id);
            return ResponseEntity.ok(familyService.update(id, updatedFamily.getName()));
        } catch (FamilyDoesNotExistException e) {
            logger.info("updt fml {} fail", id);
            return ResponseEntity.notFound().build();
        } catch (FamilyNotChangedException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

        }
    }

    @PostMapping("/{familyId}/code")
    public ResponseEntity<?> changeCode(@PathVariable String familyId, @RequestBody UpdateFamilyCodeDTO updateFamilyCodeDTO) {
        logger.info("updt fml code {}", familyId);
        try {
            return ResponseEntity.ok(familyService.updateCode(familyId, updateFamilyCodeDTO.getCode()));
        } catch (FamilyDoesNotExistException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        } catch (InvalidInviteCodeException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @PostMapping("/leave/{familyId}/{userId}")
    public ResponseEntity<?> leaveFamily(@PathVariable("familyId") String familyId, @PathVariable("userId") String userId) {
        try {
            if (!familyService.isOwner(familyId, userId)){
                return new ResponseEntity<>(familyService.removeUserFromFamily(familyId, userId), HttpStatus.OK);
            }
            else {
                return new ResponseEntity(new ApiError("Owner cannot leave family"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (FailedToRemoveUserException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        } catch (FamilyDoesNotExistException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        } catch (UserDoesNotExistException e) {
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

    @DeleteMapping("/{familyId}/{userId}/remove")
    public ResponseEntity<?> removeUserFromFamily(@PathVariable String familyId, @PathVariable String userId, , @RequestHeader("Authorization") String jwt) {
        try {
          if (jwtValidator.validateUser(jwt, userId) && familyService.isOwner(familyId, userId)){
                logger.info("rmv usr {} from fml {} 200", userId, familyId);
                return ResponseEntity.ok(familyService.removeUserFromFamily(familyId, userId));
            }
            else {
                return new ResponseEntity(new ApiError("User does not have access to this family"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        } catch (FailedToRemoveUserException e) {
            logger.info("rmv usr {} from fml {} 500 {}", userId, familyId, e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        } catch (FamilyDoesNotExistException e) {
            logger.info("rmv usr {} from fml {} 500 {}", userId, familyId, e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        } catch (UserDoesNotExistException e) {
            logger.info("rmv usr {} from fml {} 500 {}", userId, familyId, e.getMessage());
            return ResponseEntity.internalServerError().body(new ApiError(e.getMessage()));
        }
    }

}
