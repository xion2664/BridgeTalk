package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@RestController
@RequestMapping(value = "/api/letters")
@RequiredArgsConstructor
@Slf4j
public class LettersController {


    private final LettersService lettersService;

    @GetMapping("/{lettersId}")
    public ResponseEntity<StreamingResponseBody> findLettersVoice(@PathVariable Long lettersId) {
        log.info("{LetterController} : 편지 TTS 진입");
        StreamingResponseBody body = lettersService.findLettersVoice(lettersId);
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("audio/mpeg"))
                .body(body);
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadLettersVoice(@ModelAttribute LettersRequestDTO lettersRequestDTO) {
        log.info("{ LettersController } : 부모 음성 편지 업로드 컨트롤러");
        log.info("LetterRequestDTO : {}", lettersRequestDTO);

        // 음성편지 s3 업로드
        String voiceUrl = lettersService.saveVoiceFile(lettersRequestDTO);
        // stt 실행
        LettersResponseDTO responseDTO = lettersService.createText(voiceUrl);

        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
