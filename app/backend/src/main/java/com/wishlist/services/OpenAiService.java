package com.wishlist.services;

import com.wishlist.services.interfaces.IOpenAiService;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class OpenAiService implements IOpenAiService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final String instruction_text = "Based on the input provided to you analyze the context and detect items which the user wants to buy, then provide a shopping list in the format: [{\"nameOfItem1\":quantityOfItem1}, {\"nameOfItem2\":quantityOfItem2}...]. Prompt:";

    @Override
    public String processText(String text) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        String fullText = instruction_text + " " + text;

        Map<String, Object> map = new HashMap<>();
        map.put("prompt", fullText);

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(map, headers);

        String response = restTemplate.postForObject("http://openai-service:3000/text-summary", request, String.class);

        Pattern pattern = Pattern.compile("(\\[\\{.*?:.*?\\}(, \\{.*?:.*?\\})*\\])");
        Matcher matcher = pattern.matcher(response);

        if (matcher.find()) {
            return matcher.group(1);
        } else {
            return null;
        }
    }


    @Override
    public String processWavFile(MultipartFile file) throws Exception {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);

        MultiValueMap<String, String> fileMap = new LinkedMultiValueMap<>();
        Resource resource = new ByteArrayResource(file.getBytes()) {
            @Override
            public String getFilename() {
                return file.getOriginalFilename();
            }
        };
        fileMap.add("audio", resource.getFilename());
        HttpEntity<Resource> fileEntity = new HttpEntity<>(resource, headers);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("audio", fileEntity);

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.postForObject("http://openai-service:3000/audio-transcript", requestEntity, String.class);
    }
}

