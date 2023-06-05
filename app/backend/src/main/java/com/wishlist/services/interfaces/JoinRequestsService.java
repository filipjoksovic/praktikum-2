package com.wishlist.services.interfaces;

import com.wishlist.exceptions.*;
import com.wishlist.models.Family;
import com.wishlist.models.RequestJoin;
import com.wishlist.services.UserAlreadyInThisFamilyException;
import com.wishlist.services.dto.JoinRequestsDTO;

import java.util.List;

public interface JoinRequestsService {

    RequestJoin save(RequestJoin requestJoin) throws Exception;

    List<RequestJoin> getByFamilyId(String familyId);

    boolean isRequestJoinValid(String userId, String familyId) throws AlreadyRequestedJoinException;

    boolean rejectRequest(String requestJoinId) throws RequestJoinDoesNotExistException;

    Family acceptRequest(String requestJoinId) throws RequestJoinDoesNotExistException, FamilyDoesNotExistException, UserDoesNotExistException;

    JoinRequestsDTO createJoinRequest(String userId, String familyId, String senderId) throws UserDoesNotExistException, UserAlreadyHasAFamilyException, UserAlreadyInThisFamilyException, FamilyDoesNotExistException, AlreadyRequestedJoinException;

    List<JoinRequestsDTO> getRequestsForFamily(String familyId) throws FamilyDoesNotExistException, UserDoesNotExistException;

    JoinRequestsDTO getRequestsForUser(String userId) throws UserHasNoJoinRequestsException, FamilyDoesNotExistException, UserDoesNotExistException;

    void createJoinRequests(String familyId, String[] emails, String senderId);
}
