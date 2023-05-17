package com.wishlist.controllers;

import com.wishlist.dto.ApiError;
import com.wishlist.dto.EmailSenderDTO;
import com.wishlist.services.interfaces.IEmailSender;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/email-sender")
public class EmailSenderController {

    private final IEmailSender emailSenderService;

    public EmailSenderController(IEmailSender emailSenderService) {
        this.emailSenderService = emailSenderService;
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendEmail(@RequestBody EmailSenderDTO dto) {
        try {
            EmailSenderDTO email = emailSenderService.sendEmail(dto);
            return new ResponseEntity(email, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity(new ApiError(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
