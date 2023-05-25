package com.wishlist.services;

import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.RequestJoin;
import com.wishlist.models.User;
import com.wishlist.repositories.RequestJoinRepository;
import com.wishlist.services.interfaces.IFamilyService;
import com.wishlist.services.interfaces.IRequestJoinService;
import com.wishlist.services.interfaces.IUserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RequestJoinService implements IRequestJoinService {

    private final RequestJoinRepository requestJoinRepository;
    private final IFamilyService familyService;
    private final IUserService userService;

    public RequestJoinService(RequestJoinRepository requestJoinRepository, IFamilyService familyService, IUserService userService) {
        this.requestJoinRepository = requestJoinRepository;
        this.familyService = familyService;
        this.userService = userService;
    }

    @Override
    public boolean isRequestJoinValid(String userId, String familyId) throws AlreadyRequestedJoinException {
        List<RequestJoin> requestJoinList = requestJoinRepository.findByFamilyId(familyId);
        for (RequestJoin requestJoin : requestJoinList) {
            if (requestJoin.getUserId().equals(userId)) {
                throw new AlreadyRequestedJoinException();
            }
        }
        return true;
    }

    @Override
    public boolean denyRequest(String requestJoinId) throws Exception {
        Optional<RequestJoin> requestJoin = requestJoinRepository.findById(requestJoinId);
        if (requestJoin.isEmpty()) {
            throw new RequestJoinDoesNotExistException();
        }
        requestJoinRepository.deleteById(requestJoinId);
        return true;
    }
    @Override
    public boolean approveRequest(String requestJoinId) throws Exception {
        Optional<RequestJoin> requestJoinOptional = requestJoinRepository.findById(requestJoinId);
        if (requestJoinOptional.isEmpty()) {
            throw new RequestJoinDoesNotExistException();
        }
        RequestJoin requestJoin = requestJoinOptional.get();
        Family family = familyService.findById(requestJoin.getFamilyId());

        User user = userService.getUserById(requestJoin.getUserId());
        List<User> users = family.getUsers();
        users.add(user);
        user.setFamilyId(family.getId());
        userService.updateUser(user);
        familyService.save(family);
        requestJoinRepository.deleteById(requestJoinId);
        return true;

    }

    @Override
    public RequestJoin save(RequestJoin requestJoin) throws Exception {
        String inviteCode = requestJoin.getInviteCode();
        String userId = requestJoin.getUserId();

        boolean isInviteCodeValid = familyService.isValidInviteCode(inviteCode);
        if (!isInviteCodeValid) {
            throw new Exception();
        }

        Family family = familyService.findByInviteCode(inviteCode);
        String familyId = family.getId();

        boolean isValid = isRequestJoinValid(userId, familyId);
        if (!isValid) {
            throw new Exception();
        }
        requestJoin.setFamilyId(family.getId());
        return requestJoinRepository.save(requestJoin);
    }

    @Override
    public List<RequestJoin> getByFamilyId(String familyId) {
        return requestJoinRepository.findByFamilyId(familyId);
    }



}
