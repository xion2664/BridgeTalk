package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.letters.service.STTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/api/letter")
@RequiredArgsConstructor

public class LettersController {

    @GetMapping("/{lettersId}")
    public ResponseEntity<?> findLettersVoice(@PathVariable Long lettersId){
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
