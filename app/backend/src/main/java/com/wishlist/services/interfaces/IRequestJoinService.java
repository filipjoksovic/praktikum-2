package com.wishlist.services.interfaces;

import com.wishlist.exceptions.AlreadyRequestedJoinException;
import com.wishlist.models.RequestJoin;

import java.util.List;

public interface IRequestJoinService {

    RequestJoin save(RequestJoin requestJoin) throws Exception;
    List<RequestJoin> getByFamilyId(String familyId);
    boolean isRequestJoinValid(String userId, String familyId) throws AlreadyRequestedJoinException;
    boolean denyRequest(String requestJoinId) throws Exception;
    boolean approveRequest(String requestJoinId) throws Exception;

}
