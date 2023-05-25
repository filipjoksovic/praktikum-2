package com.wishlist.controllers;

import com.wishlist.dto.TextUploadRequestDTO;
import com.wishlist.services.OpenAiService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/uploads")
public class OpenAiController {
    Logger log = LoggerFactory.getLogger(OpenAiController.class);

    private final OpenAiService openAiService;

    public OpenAiController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/text")
    public ResponseEntity<String> uploadText(@RequestBody TextUploadRequestDTO textRequest) {
        log.info("Received uploaded text {}", textRequest.getText());
        try {
            log.info("Processing text request");
            String response = "{\"summary\":" + openAiService.processText(textRequest.getText()) + "}";
            log.info("Request processed, sending back response");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error occurred when processing request {}. Returning HTTP 500", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/wav")
    public ResponseEntity<String> uploadWav(@RequestParam("file") MultipartFile file) {
        log.info("Received uploaded file");
        try {
            log.info("Processing uploaded file");
            String response = "{\"transcript\":\"" + openAiService.processWavFile(file) + "\"}";
            log.info("Uploaded file processed. Returning response");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Error occurred when processing request {}. Returning HTTP 500", e.getMessage());
            return ResponseEntity.badRequest().build();
        }
    }
}