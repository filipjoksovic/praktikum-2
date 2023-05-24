package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.exceptions.InvalidInviteCodeException;
import com.wishlist.exceptions.InvalidInviteCodeFormatException;
import com.wishlist.models.Family;
import com.wishlist.services.FamilyService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/families")
public class FamilyController {
    private final FamilyService familyService;

    public FamilyController(FamilyService familyService) {
        this.familyService = familyService;
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable String id) {
        boolean success = familyService.delete(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Family> create(@RequestBody Family family) {
        Family createdFamily = familyService.save(family);
        return new ResponseEntity<>(createdFamily, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Family> update(@PathVariable String id, @RequestBody Family updatedFamily) {
        Optional<Family> familyOptional = Optional.ofNullable(familyService.findById(id));
        if (familyOptional.isPresent()) {
            Family existingFamily = familyOptional.get();
            existingFamily.setUsers(updatedFamily.getUsers());
            existingFamily.setShoppingList(updatedFamily.getShoppingList());
            Family updatedFamilyResult = familyService.save(existingFamily);
            return ResponseEntity.ok(updatedFamilyResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/join/{inviteCode}/{userId}")
    public ResponseEntity<Family> joinFamily(@PathVariable("inviteCode") String inviteCode, @PathVariable("userId") String userId) throws InvalidInviteCodeException, InvalidInviteCodeFormatException {
        try {
            Family family = familyService.addUserToFamily(inviteCode, userId);
            return new ResponseEntity<>(family, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/leave/{familyId}/{userId}")
    public ResponseEntity<Family> leaveFamily(@PathVariable("familyId") String familyId, @PathVariable("userId") String userId){
        try {
            Family family = familyService.removeUserFromFamily(familyId, userId);
            return new ResponseEntity<>(family, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





}
