package com.example.controllers;

import com.example.services.FamilyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/families")
public class FamilyController {
    @Autowired
    private FamilyService familyService;
}
