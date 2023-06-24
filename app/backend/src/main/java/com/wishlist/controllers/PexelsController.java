package com.wishlist.controllers;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequestMapping("/api/pexels")
public class PexelsController {

    private final String pexelApiKey;
    public PexelsController(@Value("${pexel}") String pexelApiKey) {
        this.pexelApiKey = pexelApiKey;
    }

    @GetMapping("/search/{query}")
    public ResponseEntity<?> search(@PathVariable String query) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", pexelApiKey);
        HttpEntity<String> entity = new HttpEntity<>("body", headers);

        String pexelsUrl = "https://api.pexels.com/v1/search?query=" + query + "&per_page=1";
        ResponseEntity<String> response = restTemplate.exchange(pexelsUrl, HttpMethod.GET, entity, String.class);

        // Parse the response body
        String responseBody = response.getBody();
        JSONObject jsonObject = new JSONObject(responseBody);

        // Extract the data you need
        // For example, if you need the 'photos' array, do:
        JSONArray photos = jsonObject.getJSONArray("photos");

        // Return the extracted data
        return ResponseEntity.ok().body(photos.toString());
    }


}
