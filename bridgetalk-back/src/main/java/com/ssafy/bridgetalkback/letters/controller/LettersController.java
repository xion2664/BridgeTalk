package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDto;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value="/api/letters")
@RequiredArgsConstructor
@Slf4j
public class LettersController {

    private final LettersService lettersService;

    @GetMapping("/{lettersId}")
    public ResponseEntity<?> findLettersVoice(@ExtractPayload String userId, @PathVariable Long lettersId){
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadLettersVoice(@ExtractPayload String userId, @ModelAttribute LettersRequestDto lettersRequestDTO){
        log.info("{ LettersController } : 부모 음성 편지 업로드 컨트롤러");
        log.info(">> LetterRequestDTO : {}", lettersRequestDTO);

        // 음성편지 s3 업로드
        String voiceUrl = lettersService.saveVoiceFile(lettersRequestDTO.lettersFile());
        // stt 실행
        return ResponseEntity.ok(lettersService.createText(voiceUrl, userId, lettersRequestDTO.reportsId()));
    }


}
