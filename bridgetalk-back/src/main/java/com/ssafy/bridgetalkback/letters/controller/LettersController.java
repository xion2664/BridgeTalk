package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/letters")
@RequiredArgsConstructor
@Slf4j
public class LettersController {

    private final LettersService lettersService;

    @GetMapping("/{lettersId}")
    public ResponseEntity<Resource> findLettersVoice(@ExtractPayload String userId, @PathVariable Long lettersId) {
        log.info("{LetterController} : 편지 TTS 진입");
        Resource mp3Resource = lettersService.findLettersVoice(lettersId);
        return ResponseEntity.status(HttpStatus.OK).contentType(MediaType.parseMediaType("audio/mpeg")).body(mp3Resource);
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadLettersVoice(@ExtractPayload String userId, @ModelAttribute LettersRequestDTO lettersRequestDTO){
        log.info("{ LettersController } : 부모 음성 편지 업로드 컨트롤러");
        log.info(">> LetterRequestDTO : {}", lettersRequestDTO);

        // 음성편지 s3 업로드
        String voiceUrl = lettersService.saveVoiceFile(lettersRequestDTO);
        // stt 실행
        LettersResponseDTO responseDTO = lettersService.createText(voiceUrl, userId);

        return ResponseEntity.status(HttpStatus.OK).build();
    }



}
