package com.ssafy.bridgetalkback.letters.service;

import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class LettersService {

    /**
     * saveVoiceFile() : s3에 음성파일 저장 메소드
     * @param lettersRequestDTO : 입력된 음성 파일
     * @return String : 저장된 s3 url
     * */
    public String saveVoiceFile(LettersRequestDTO lettersRequestDTO){
        return "";
    }

    /**
     * createText() : 음성파일 텍스트화 메소드
     * @param voiceUrl : 입력된 음성 파일
     * @return LettersResponseDTO : 변환된 텍스트 responseDTO
     * */
    public LettersResponseDTO createText(String voiceUrl){
        return LettersResponseDTO.builder().build();
    }

    /**
     * stt() : 음성파일 텍스트화 api 호출 메소드
     * @param voiceUrl : 입력된 음성 파일
     * @return String : 변환된 텍스트
     * */
    private String stt(String voiceUrl) {
        return "";
    }

    /**
     * translation() : 번역 api 호출 메소드
     * @param orignal : 원본 텍스트
     * @return String : 번역본 텍스트
     * */
    private String translation(String orignal) {
        return "";
    }

}
