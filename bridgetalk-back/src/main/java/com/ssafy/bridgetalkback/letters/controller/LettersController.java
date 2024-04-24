package com.ssafy.bridgetalkback.letters.controller;

//import com.ssafy.bridgetalkback.letters.service.STTService;
import com.ssafy.bridgetalkback.letters.dto.LettersRequestDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/letters")
@RequiredArgsConstructor

public class LettersController {

    @GetMapping("/{lettersId}")
    public ResponseEntity<?> findLettersVoice(@PathVariable Long lettersId){
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadLettersVoice(@RequestBody LettersRequestDTO lettersRequestDTO){
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
