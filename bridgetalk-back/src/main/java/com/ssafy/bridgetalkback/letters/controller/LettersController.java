package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.global.annotation.ExtractPayload;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDto;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

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
    public ResponseEntity<?> uploadLettersVoice(@ExtractPayload String userId, @Valid @ModelAttribute LettersRequestDto lettersRequestDTO) {
        log.info("{ LettersController } : 부모 음성 편지 업로드 컨트롤러");
        log.info(">> LetterRequestDTO : {}", lettersRequestDTO);

        // 음성편지 s3 업로드
        String voiceUrl = lettersService.saveVoiceFile(lettersRequestDTO.lettersFile());
        // stt 실행
        return ResponseEntity.ok(lettersService.createText(voiceUrl, userId, lettersRequestDTO.reportsId()));
    }

    @DeleteMapping("/{lettersId}")
    public ResponseEntity<?> deleteLettersVoice(@ExtractPayload String userId, @PathVariable Long lettersId) {
        log.info("{LettersController} : 음성편지 삭제 컨트롤러 진입");
        log.info(" >> LettersId : " + lettersId);
        lettersService.deleteLetters(lettersId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/text/{lettersId}")
    public ResponseEntity<?> findLettersText(@ExtractPayload String userId, @PathVariable Long lettersId) {
        log.info("{LettersController} : 편지 번역본 조회 컨트롤러 진입");
        log.info(" >> LettersId : " + lettersId);

        return ResponseEntity.ok(lettersService.findLettersText(lettersId));
    }

    @GetMapping("/img/{lettersId}")
    public ResponseEntity<?> findLettersImg(@ExtractPayload String userId, @PathVariable Long lettersId) {
        log.info("{LettersController} : 편지 키워드에 해당하는 이미지 컨트롤러 진입");
        log.info((" >> LettersId : " + lettersId));

        return ResponseEntity.ok(lettersService.findLettersImg(lettersId));
    }

    @GetMapping
    public ResponseEntity<?> findAllKidsLetters(@ExtractPayload String userId) {
        log.info("{LettersController} : 아이의 삭제되지 않은 편지 리스트 조회 컨트롤러 진입");

        return ResponseEntity.ok(lettersService.findAllKidsLetters(UUID.fromString(userId)));
    }

}
