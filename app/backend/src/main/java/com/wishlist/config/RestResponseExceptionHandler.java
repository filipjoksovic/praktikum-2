package com.wishlist.config;

import com.wishlist.dto.ApiError;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.io.IOException;

@ControllerAdvice
public class RestResponseExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler({RuntimeException.class, IOException.class, Exception.class})
    public ResponseEntity<Object> handleExceptions(Exception exception, WebRequest webRequest) {
        ApiError apiError = new ApiError(exception.getMessage());
        ResponseEntity<Object> entity = new ResponseEntity<>(apiError, HttpStatus.INTERNAL_SERVER_ERROR);
        return entity;
    }
}