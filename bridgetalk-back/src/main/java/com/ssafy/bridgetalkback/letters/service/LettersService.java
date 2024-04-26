package com.ssafy.bridgetalkback.letters.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.letters.domain.Letters;
import com.ssafy.bridgetalkback.letters.repository.LettersRepository;
import com.ssafy.bridgetalkback.letters.exception.LettersErrorCode;
import com.ssafy.bridgetalkback.tts.service.TtsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class LettersService {

    private final LettersRepository lettersRepository;
    private final TtsService ttsService;

    public Letters findById(Long lettersId) {
        log.info("{LettersService} : Id(Pk)로 편지 정보 조회");
        return lettersRepository.findByLettersIdAndIsDeletedFalse(lettersId)
                .orElseThrow(() -> BaseException.type(LettersErrorCode.LETTERS_NOT_FOUND));
    }

    public Resource findLettersVoice(Long lettersId) {
        Letters letter = findById(lettersId);
        letter.updateIsChecked();
        String inputText = letter.getLettersTranslationContent();
        return ttsService.textToSpeech(inputText);
    }
}
