package com.ssafy.bridgetalkback.letters.service;

import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.letters.domain.Letters;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import com.ssafy.bridgetalkback.letters.exception.LettersErrorCode;
import com.ssafy.bridgetalkback.letters.repository.LettersRepository;
import com.ssafy.bridgetalkback.tts.service.TtsService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.StreamingResponseBody;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class LettersService {
    private final LettersRepository lettersRepository;
    private final TtsService ttsService;

    /**
     * saveVoiceFile() : s3에 음성파일 저장 메서드
     *
     * @param lettersRequestDTO : 입력된 음성 파일
     * @return String : 저장된 s3 url
     */
    public String saveVoiceFile(LettersRequestDTO lettersRequestDTO) {
        log.info("{ LetterService.saveVoiceFile() } : 부모 음성 편지 s3업로드 메서드");
        return "";
    }

    /**
     * createText() : 음성파일 텍스트화 메서드
     *
     * @param voiceUrl : 입력된 음성 파일
     * @return LettersResponseDTO : 변환된 텍스트 responseDTO
     */
    public LettersResponseDTO createText(String voiceUrl) {
        log.info("{ LetterService.createText() } : 텍스트화 메서드");
        return LettersResponseDTO.builder().build();
    }

    /**
     * stt() : 음성파일 텍스트화 api 호출 메서드
     *
     * @param voiceUrl : 입력된 음성 파일
     * @return String : 변환된 텍스트
     */
    private String stt(String voiceUrl) {
        log.info("{ LetterService.stt() } : stt api 호출 메서드");
        return "";
    }

    /**
     * translation() : 번역 api 호출 메서드
     *
     * @param orignal : 원본 텍스트
     * @return String : 번역본 텍스트
     */
    private String translation(String orignal) {
        log.info("{ LetterService.saveVoiceFile() } : 번역 api 호출 메서드 ");
        return "";
    }

    /**
     * pk로 편지 정보 조회 후, 데이터 삭제여부까지 확인하는 메서드
     *
     * @param lettersId
     * @return pk에 해당하는 Letters 객체
     */
    public Letters findById(Long lettersId) {
        log.info("{LettersService} : Id(Pk)로 편지 정보 조회");
        return lettersRepository.findByLettersIdAndIsDeletedFalse(lettersId)
                .orElseThrow(() -> BaseException.type(LettersErrorCode.LETTERS_NOT_FOUND));
    }

    /**
     * pk에 해당하는 편지의 번역된 한국어 text를 음성데이터로 반환하는 메서드
     *
     * @param lettersId
     * @return 번역문의 음성데이터
     */

    public StreamingResponseBody findLettersVoice(Long lettersId) {
        log.info("{LettersServie.findLettersVoice()} : 편지tts 메서드");
        Letters letter = findById(lettersId);
        letter.updateIsChecked();
        String inputText = letter.getLettersTranslationContent();
        return ttsService.textToSpeech(inputText);
    }

}
