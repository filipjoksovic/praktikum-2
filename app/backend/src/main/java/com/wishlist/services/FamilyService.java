package com.wishlist.services;

import com.wishlist.models.Family;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.services.interfaces.IFamilyService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class FamilyService implements IFamilyService {

    private final FamilyRepository familyRepository;

    public FamilyService(FamilyRepository familyRepository) {
        this.familyRepository = familyRepository;
    }

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
