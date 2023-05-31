package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.CreateFamilyRequestDTO;
import com.wishlist.dto.FamilyMemberDTO;
import com.wishlist.exceptions.FamilyDoesNotExistException;
import com.wishlist.models.Family;
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

    public FamilyController(final FamilyService familyService, final UserService userService) {
        this.familyService = familyService;
        this.userService = userService;
    }

    @GetMapping
    public List<Family> getAll() {
        return familyService.getAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getFamily(@PathVariable String id) {
        logger.info("get fml {}", id);
        try {
            logger.info("rtn fml {}", id);
            return new ResponseEntity(familyService.findById(id), HttpStatus.OK);
        } catch (FamilyDoesNotExistException e) {
            logger.info("rtn fml {} FAIL", id);
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}/members")
    public ResponseEntity<?> getFamilyMembers(@PathVariable String id) {
        logger.info("get fml mbr for {}",id);
        try {
            logger.info("get fml mbr for {} success",id);
            return new ResponseEntity<>(familyService.getFamilyMembers(id).stream().map(FamilyMemberDTO::to).collect(Collectors.toList()), HttpStatus.OK);
        } catch (FamilyDoesNotExistException e) {
            logger.info("get fml mbr for {} fail",id);
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getFamilyForUser(@PathVariable String userId) {
        logger.info("get fml for usr {}", userId);
        try {
            logger.info("rtn fml for usr {}", userId);
            return new ResponseEntity<>(familyService.findByUser(userId), HttpStatus.OK);
        } catch (FamilyDoesNotExistException e) {
            logger.info("rtn fml for usr {} FAIL", userId);
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable String id) {
        try {
            return new ResponseEntity<>(familyService.delete(id), HttpStatus.OK);
        } catch (FamilyDoesNotExistException e) {
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/{userId}")
    public ResponseEntity<?> create(@PathVariable String userId, @RequestBody CreateFamilyRequestDTO dto) {
        logger.info("POST createFamily");
        try {
            logger.info("POST createFamily fml crt HTTP 200");
            Family saved = familyService.save(CreateFamilyRequestDTO.from(dto));
            userService.addUserToFamily(userId, saved.getId());
            return new ResponseEntity<>(saved, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("POST createFamily FAIL {}", e.getMessage());
            return new ResponseEntity<>(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);

        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Family> update(@PathVariable String id, @RequestBody Family updatedFamily) {
        //todo move to service layer
        try {
            Family family = familyService.findById(id);
            family.setUsers(updatedFamily.getUsers());
            Family updatedFamilyResult = familyService.save(family);
            return ResponseEntity.ok(updatedFamilyResult);
        } catch (FamilyDoesNotExistException e) {
            return ResponseEntity.notFound().build();

        }
    }

    @PostMapping("/leave/{familyId}/{userId}")
    public ResponseEntity<Family> leaveFamily(@PathVariable("familyId") String familyId, @PathVariable("userId") String userId) {
        try {
            return new ResponseEntity<>(familyService.removeUserFromFamily(familyId, userId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
