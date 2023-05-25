package com.wishlist.controllers;


import com.wishlist.dto.ApiError;
import com.wishlist.models.RequestJoin;
import com.wishlist.services.interfaces.IRequestJoinService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/requestJoins")
public class RequestJoinController {

    private final IRequestJoinService requestJoinService;

    public RequestJoinController(IRequestJoinService requestJoinService) {
        this.requestJoinService = requestJoinService;
    }

    @PostMapping
    public ResponseEntity<RequestJoin> create(@RequestBody RequestJoin requestJoin) {
        try {
            RequestJoin createdRequestJoin = requestJoinService.save(requestJoin);
            return new ResponseEntity<>(createdRequestJoin, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("{familyId}")
    public ResponseEntity<List<RequestJoin>> getRequestJoinsByFamily(@PathVariable String familyId) {
        try {
            List<RequestJoin> requestJoinList = requestJoinService.getByFamilyId(familyId);
            return new ResponseEntity<>(requestJoinList, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("denyRequest/{requestJoinId}")
    public ResponseEntity<Void> denyRequest(@PathVariable String requestJoinId) {
        try {
            boolean success = requestJoinService.denyRequest(requestJoinId);
            if (success) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    @PostMapping("approveRequest/{requestJoinId}")
    public ResponseEntity<Void> approveRequest(@PathVariable String requestJoinId) {
        try {
            boolean success = requestJoinService.approveRequest(requestJoinId);
            if (success) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

