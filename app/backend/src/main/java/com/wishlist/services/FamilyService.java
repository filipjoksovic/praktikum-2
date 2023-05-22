package com.wishlist.services;

import com.wishlist.models.Family;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.UserRepository;
import com.wishlist.services.interfaces.IFamilyService;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.List;
import java.util.Optional;

@Service
public class FamilyService implements IFamilyService {

    private final FamilyRepository familyRepository;
    private final UserRepository userRepository;

    public FamilyService(FamilyRepository familyRepository, UserRepository userRepository) {
        this.familyRepository = familyRepository;
        this.userRepository = userRepository;
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

    public String generateInviteCode() {
        final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        final int LENGTH = 8;
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(8);
        for (int i = 0; i < 8; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            char randomChar = CHARACTERS.charAt(randomIndex);
            sb.append(randomChar);
        }
        return sb.toString();
    }


}
