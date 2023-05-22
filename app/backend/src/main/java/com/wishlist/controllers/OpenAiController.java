package com.wishlist.controllers;

import com.wishlist.dto.TextUploadRequestDTO;
import com.wishlist.services.OpenAiService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/uploads")
public class OpenAiController {

    private final OpenAiService openAiService;

    public OpenAiController(OpenAiService openAiService) {
        this.openAiService = openAiService;
    }

    @PostMapping("/text")
    public ResponseEntity<String> uploadText(@RequestBody TextUploadRequestDTO textRequest) {
        try {
            String response = openAiService.processText(textRequest.getText());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping("/wav")
    public ResponseEntity<String> uploadWav(@RequestParam("file") MultipartFile file) {
        try {
            String response = openAiService.processWavFile(file);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}