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

    //letters/bd4f9a3f-3c07-41b7-b01a-9db3f804c3e7_test.mp3
    //https://bridge-talk.s3.ap-northeast-2.amazonaws.com/letters/bd4f9a3f-3c07-41b7-b01a-9db3f804c3e7_test.mp3
    @GetMapping("/transcription")
    public ResponseEntity<?> transcription(){
        log.info("{ LettersController - test } : [test]부모 음성 편지 업로드 컨트롤러");
        String url = "https://bridge-talk.s3.ap-northeast-2.amazonaws.com/letters/821e2dbd-f4bd-45dc-942e-ab15b01df12e_test1.mp3";
        LettersResponseDTO responseDTO = lettersService.createText(url);
        return ResponseEntity.status(HttpStatus.OK).build();
    }
    //bridge-talk-transcription-job-904981d2-c130-401b-92cf-c83838d65f52
    @GetMapping("/transcription-josn")
    public ResponseEntity<?> transcription_json(){
        log.info("{ LettersController - test } : [test]부모 음성 편지 json to text 컨트롤러");
        String jobName = "bridge-talk-transcription-job-904981d2-c130-401b-92cf-c83838d65f52";
        lettersService.jsonTotext(jobName);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
