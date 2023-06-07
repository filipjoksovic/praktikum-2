package com.wishlist.services;

import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.RequestJoin;
import com.wishlist.models.User;
import com.wishlist.repositories.FamilyRepository;
import com.wishlist.repositories.RequestJoinRepository;
import com.wishlist.services.dto.JoinRequestsDTO;
import com.wishlist.services.interfaces.IFamilyService;
import com.wishlist.services.interfaces.JoinRequestsService;
import com.wishlist.services.interfaces.IUserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class RequestJoinService implements JoinRequestsService {

    private final RequestJoinRepository requestJoinRepository;
    private final IFamilyService familyService;
    private final IUserService userService;
    private final FamilyRepository familyRepository;
    private final Logger logger = LoggerFactory.getLogger(RequestJoinService.class);

    public RequestJoinService(RequestJoinRepository requestJoinRepository, IFamilyService familyService, IUserService userService,
                              FamilyRepository familyRepository) {
        this.requestJoinRepository = requestJoinRepository;
        this.familyService = familyService;
        this.userService = userService;
        this.familyRepository = familyRepository;
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
    public boolean rejectRequest(String requestJoinId) throws RequestJoinDoesNotExistException {
        RequestJoin requestJoin = requestJoinRepository.findById(requestJoinId).orElseThrow(RequestJoinDoesNotExistException::new);
        requestJoinRepository.deleteById(requestJoin.getId());
        return true;
    }

    @Override
    public Family acceptRequest(String requestJoinId) throws RequestJoinDoesNotExistException, FamilyDoesNotExistException, UserDoesNotExistException {
        RequestJoin joinRequest = requestJoinRepository.findById(requestJoinId).orElseThrow(RequestJoinDoesNotExistException::new);
        Family family = familyService.findById(joinRequest.getFamilyId());
        User user = userService.getUserById(joinRequest.getUserId());

        List<User> users = family.getUsers();
        if (users != null) {
            users.add(user);
        } else {
            users = new ArrayList<>();
            users.add(user);
        }
        user.setFamilyId(family.getId());
        userService.updateUser(user);
        familyService.save(family);
        requestJoinRepository.deleteById(requestJoinId);
        return family;
    }

    @Override
    public JoinRequestsDTO createJoinRequest(String userId, String inviteCode, String senderId) throws Exception, UserAlreadyInThisFamilyException {
        final User user = userService.getUserById(userId);
        final Family family = familyService.findByInviteCode(inviteCode);
        if (user.getFamilyId() != null) {
            throw new UserAlreadyHasAFamilyException();
        }
        if (user.getFamilyId() != null && user.getFamilyId().equals(family.getId())) {
            throw new UserAlreadyInThisFamilyException();
        }
        Optional<RequestJoin> request = requestJoinRepository.findByFamilyIdAndUserId(family.getId(), user.getId());
        if (request.isPresent()) {
            throw new AlreadyRequestedJoinException();
        }
        final RequestJoin joinRequest = requestJoinRepository.save(new RequestJoin(family.getId(), user.getId(), senderId));
        return new JoinRequestsDTO(joinRequest.getId(), user.getName(), user.getSurname(), user.getEmail(), family.getName(), joinRequest.getCreatorId(), joinRequest.getUserId(), joinRequest.getCreatedAt());
    }

    @Override
    public List<JoinRequestsDTO> getRequestsForFamily(String familyId) throws FamilyDoesNotExistException, UserDoesNotExistException {
        Family family = familyService.findById(familyId);

        List<RequestJoin> requests = requestJoinRepository.findByFamilyId(familyId);
        List<JoinRequestsDTO> requestDtos = new ArrayList<>();

        for (RequestJoin request : requests) {
            User requester = userService.getUserById(request.getUserId());
            JoinRequestsDTO dto = new JoinRequestsDTO(request.getId(), requester.getName(), requester.getSurname(), requester.getEmail(), family.getName(), request.getCreatorId(), request.getUserId(), request.getCreatedAt());
            requestDtos.add(dto);
        }
        return requestDtos;
    }

    @Override
    public JoinRequestsDTO getRequestsForUser(String userId) throws UserHasNoJoinRequestsException, FamilyDoesNotExistException, UserDoesNotExistException {
        User user = userService.getUserById(userId);
        RequestJoin requestJoin = requestJoinRepository.findByUserId(userId).orElseThrow(UserHasNoJoinRequestsException::new);
        Family family = familyService.findById(requestJoin.getFamilyId());
        return new JoinRequestsDTO(requestJoin.getId(), user.getName(), user.getSurname(), user.getEmail(), family.getName(), requestJoin.getCreatorId(), requestJoin.getUserId(), requestJoin.getCreatedAt());
    }

    @Override
    public void createJoinRequests(String familyId, String[] emails, String senderId) {
        Family family = familyService.findById(familyId);
        for (String email : emails) {
            try {
                User user = userService.getUserByEmail(email);
                Optional<RequestJoin> exists = requestJoinRepository.findByFamilyIdAndUserId(familyId, user.getId());
                if (exists.isEmpty()) {
                    RequestJoin requestJoin = new RequestJoin(family.getId(), user.getId(), senderId);
                    //todo send email
                    requestJoinRepository.save(requestJoin);
                }
            } catch (UserDoesNotExistException e) {
                logger.error("User with email {} does not exist", email);
            }
        }
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
