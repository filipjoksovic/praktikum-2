package com.wishlist.services.interfaces;

import org.springframework.web.multipart.MultipartFile;

public interface IOpenAiService {
    String processText(String text) throws Exception;
    String processWavFile(MultipartFile file) throws Exception;
}