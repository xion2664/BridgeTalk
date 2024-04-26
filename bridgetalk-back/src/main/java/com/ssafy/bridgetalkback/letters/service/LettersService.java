package com.ssafy.bridgetalkback.letters.service;

import com.amazonaws.services.kms.model.NotFoundException;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bridgetalkback.files.service.S3FileService;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import com.ssafy.bridgetalkback.global.exception.GlobalErrorCode;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import com.ssafy.bridgetalkback.letters.exception.LettersErrorCode;
import com.ssafy.bridgetalkback.letters.repository.LettersRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import software.amazon.awssdk.services.s3.S3Client;

import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
@Slf4j
@RequiredArgsConstructor
public class LettersService {

    private final S3FileService s3FileService;
    private final LettersTranscribeService lettersTranscribeService;
    private final AmazonS3 s3Client;
    private final ObjectMapper objectMapper;
    private final LettersRepository lettersRepository;

    @Value("${S3_BUCKET_NAME}")
    private String bucketName;


    /**
     * saveVoiceFile() : s3에 음성파일 저장 메서드
     * @param lettersRequestDTO : 입력된 음성 파일
     * @return String : 저장된 s3 url
     * */
    public String saveVoiceFile(LettersRequestDTO lettersRequestDTO){
        log.info("{ LetterService.saveVoiceFile() } : 부모 음성 편지 s3업로드 메서드");
        return s3FileService.uploadLettersFiles(lettersRequestDTO.lettersFile());
    }

    /**
     * createText() : 음성파일 텍스트화 메서드
     * @param voiceUrl : 입력된 음성 파일
     * @return LettersResponseDTO : 변환된 텍스트 responseDTO
     * */
    public LettersResponseDTO createText(String voiceUrl){
        log.info("{ LetterService.createText() } : 텍스트화 메서드");
        String[] vrr = voiceUrl.split("/");
        int len = vrr.length;
        String fileName = vrr[len-2]+"/"+vrr[len-1];
        log.info(">> fileName : {}", fileName);
        // stt api 호출
        String extractText = stt(fileName);

        // 번역 api 호출

        return LettersResponseDTO.builder().build();
    }

    /**
     * stt() : 음성파일 텍스트화 api 호출 메서드
     * @param fileName : 파일명
     * @return String : 변환된 텍스트
     * */
    private String stt(String fileName) {
        log.info("{ LetterService.stt() } : stt api 호출 메서드");
        String jobName = lettersTranscribeService.transcribe(bucketName, fileName);
        String transcriptFileName = jobName + ".json";
        log.info(">> trancriptionFileName : {}", transcriptFileName);
        String extractText = "";
        try {
            S3Object s3Object = s3Client.getObject(bucketName, transcriptFileName);
            log.info(">> s3Object : {}",s3Object);
            S3ObjectInputStream objectContent = s3Object.getObjectContent();
            Map<String, Object> jsonData = objectMapper.readValue(objectContent, new TypeReference<Map<String, Object>>() {});
            log.info(">> jsonToObject : {}", jsonData);
            Map<String, Object> results = (Map<String, Object>) jsonData.get("results");
            List<Map<String, String>> rList = (List<Map<String, String>>) results.get("transcripts");
            extractText = rList.get(0).get("transcript");
            log.info(">> extractText : {}", extractText);

            // 스트림 및 객체 닫기
            objectContent.close();
            s3Object.close();
        } catch (NotFoundException ne) {
            log.error(ne.getMessage());
            throw BaseException.type(LettersErrorCode.LETTERS_NOT_FOUND);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw BaseException.type(GlobalErrorCode.INTERNAL_SERVER_ERROR);
        }

        return extractText;
    }

    public void jsonTotext(String jobName) {
        String transcriptFileName = jobName + ".json";
        log.info(">> trancriptionFileName : {}", transcriptFileName);
        String extractText = "";
        try {
            S3Object s3Object = s3Client.getObject(bucketName, transcriptFileName);
            log.info(">> s3Object : {}",s3Object);
            S3ObjectInputStream objectContent = s3Object.getObjectContent();
            Map<String, Object> jsonData = objectMapper.readValue(objectContent, new TypeReference<Map<String, Object>>() {});
            log.info(">> jsonToObject : {}", jsonData);
            Map<String, Object> results = (Map<String, Object>) jsonData.get("results");
            List<Map<String, String>> rList = (List<Map<String, String>>) results.get("transcripts");
            extractText = rList.get(0).get("transcript");
            log.info(">> extractText : {}", extractText);

            // 스트림 및 객체 닫기
            objectContent.close();
            s3Object.close();
        } catch (NotFoundException ne) {
            log.error(ne.getMessage());
            throw BaseException.type(LettersErrorCode.LETTERS_NOT_FOUND);
        } catch (Exception e) {
            log.error(e.getMessage());
            throw BaseException.type(GlobalErrorCode.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * translation() : 번역 api 호출 메서드
     * @param orignal : 원본 텍스트
     * @return String : 번역본 텍스트
     * */
    private String translation(String orignal) {
        log.info("{ LetterService.saveVoiceFile() } : 번역 api 호출 메서드 ");
        return "";
    }

}
