package com.example.controllers;

import com.example.models.Family;
import com.example.services.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("api/families")
public class FamilyController {
    @Autowired
    private FamilyService familyService;

    @GetMapping
    public List<Family> getAllFamilies() {
        return familyService.getAllFamilies();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Family> getFamilyById(@PathVariable String id) {
        Family family = familyService.getFamilyById(id);
        if (family != null) {
            return new ResponseEntity<>(family, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFamilyById(@PathVariable String id) {
        boolean success = familyService.deleteFamilyById(id);
        if (success) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PostMapping
    public ResponseEntity<Family> createFamily(@RequestBody Family family) {
        Family createdFamily = familyService.createFamily(family);
        return new ResponseEntity<>(createdFamily, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Family> updateFamily(@PathVariable String id, @RequestBody Family updatedFamily) {
        Optional<Family> familyOptional = Optional.ofNullable(familyService.getFamilyById(id));
        if (familyOptional.isPresent()) {
            Family existingFamily = familyOptional.get();
            existingFamily.setUsersList(updatedFamily.getUsersList());
            existingFamily.setShoppingList(updatedFamily.getShoppingList());
            Family updatedFamilyResult = familyService.createFamily(existingFamily);
            return ResponseEntity.ok(updatedFamilyResult);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

}
