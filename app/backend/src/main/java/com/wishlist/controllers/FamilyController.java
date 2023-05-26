package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.CreateFamilyRequestDTO;
import com.wishlist.models.Family;
import com.wishlist.models.User;
import com.wishlist.services.FamilyService;
import com.wishlist.services.UserService;
import jakarta.websocket.server.PathParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

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
    public ResponseEntity<Family> getFamily(@PathVariable String id) {
        Family family = familyService.findById(id);
        if (family != null) {
            return new ResponseEntity<>(family, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<Family> getFamilyForUser(@PathVariable String userId) {
        User user = userService.getUserById(userId);
        if (user != null) {
            return new ResponseEntity<>(familyService.findById(user.getFamilyId()), HttpStatus.OK);
        } else return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean success = familyService.delete(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //TODO DTO
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
        Optional<Family> familyOptional = Optional.ofNullable(familyService.findById(id));
        if (familyOptional.isPresent()) {
            Family existingFamily = familyOptional.get();
            existingFamily.setUsers(updatedFamily.getUsers());
            Family updatedFamilyResult = familyService.save(existingFamily);
            return ResponseEntity.ok(updatedFamilyResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/leave/{familyId}/{userId}")
    public ResponseEntity<Family> leaveFamily(@PathVariable("familyId") String familyId, @PathVariable("userId") String userId) {
        try {
            Family family = familyService.removeUserFromFamily(familyId, userId);
            return new ResponseEntity<>(family, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
