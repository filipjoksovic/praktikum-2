package com.example.services;

import com.example.models.Family;
import com.example.repositories.FamilyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyService {
    @Autowired
    private FamilyRepository familyRepository;

    public List<Family> getAll() {
        return familyRepository.findAll();
    }

    public Family findById(String id) {
        Optional<Family> familyOptional = familyRepository.findById(id);
        return familyOptional.orElse(null);
    }

    public boolean delete(String id) {
        Optional<Family> familyOptional = familyRepository.findById(id);
        if (familyOptional.isPresent()) {
            familyRepository.deleteById(id);
            return true;
        } else {
            return false;
        }
    }

    public Family save(Family family) {
        return familyRepository.save(family);
    }

}
