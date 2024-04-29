package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
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
    public ResponseEntity<?> findLettersVoice(@PathVariable Long lettersId){
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    @PostMapping("/upload")
    public ResponseEntity<?> uploadLettersVoice(@ModelAttribute LettersRequestDTO lettersRequestDTO){
        log.info("{ LettersController } : 부모 음성 편지 업로드 컨트롤러");
        log.info("LetterRequestDTO : {}", lettersRequestDTO);

        // 음성편지 s3 업로드
        String voiceUrl = lettersService.saveVoiceFile(lettersRequestDTO);
        // stt 실행
        LettersResponseDTO responseDTO = lettersService.createText(voiceUrl);

        return ResponseEntity.status(HttpStatus.OK).build();
    }



}
