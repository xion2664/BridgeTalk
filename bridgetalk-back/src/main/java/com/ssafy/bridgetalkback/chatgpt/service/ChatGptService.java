package com.ssafy.bridgetalkback.chatgpt.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.bridgetalkback.chatgpt.config.ChatGptConfig;
import com.ssafy.bridgetalkback.chatgpt.config.ChatGptRequestCode;
import com.ssafy.bridgetalkback.chatgpt.dto.request.ChatGptRequestDto;
import com.ssafy.bridgetalkback.chatgpt.dto.response.Choice;
import com.ssafy.bridgetalkback.chatgpt.exception.ChatGptErrorCode;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatGptService {

    private final ChatGptConfig chatGptConfig;

    @Value("${OPENAI_URL}")
    private String legacyPromptUrl;

    public String createPrompt(String originText, ChatGptRequestCode gptRequestCode) {
        log.info("{ ChatGptService } : {} 진입", gptRequestCode);
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .prompt(createText(originText, gptRequestCode))
                .build();

        HttpHeaders headers = chatGptConfig.httpHeaders();

        HttpEntity<ChatGptRequestDto> requestEntity = new HttpEntity<>(chatGptRequestDto, headers);



        Map<String, Object> resultMap = new HashMap<>();
        try {
            ResponseEntity<String> response = chatGptConfig
                    .restTemplate()
                    .exchange(legacyPromptUrl, HttpMethod.POST, requestEntity, String.class);
            ObjectMapper om = new ObjectMapper();
            resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
        } catch (RestClientException e) {
            throw BaseException.type(ChatGptErrorCode.CHATGPT_FAILED);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        List<Choice> choices = (List<Choice>) resultMap.get("choices");
        Map<String, Object> textMap = (Map<String, Object>) choices.get(0);
        String result = (String) textMap.get("text");
        result = result.substring(2);

        log.info("{ ChatGptService } : {} 성공", gptRequestCode);
        log.info(">> result : {}", result);
        return result;
    }


    public String createText(String origin, ChatGptRequestCode gptRequestCode) {
        if (gptRequestCode.equals(ChatGptRequestCode.SUMMARY)){
            origin += " 3줄 요약해줘";
        } else if (gptRequestCode.equals(ChatGptRequestCode.CONVERSION)){
//            origin += " 이 문단을 부드럽고 친근한 엄마의 어조로 바꿔줘";
            origin += " 이 베트남어 문단을 한국어로 번역하고, 부드럽고 친근한 엄마의 어조로 다듬어줘";
            log.info(">> prompt : {}", origin);
        }
        return origin;
    }

    public String translatePrompt(String summaryText) {
        log.info("{ ChatGptService } : 요약본번역 진입");
        ChatGptRequestDto chatGptRequestDto = ChatGptRequestDto.builder()
                .prompt(translateText(summaryText))
                .build();

        HttpHeaders headers = chatGptConfig.httpHeaders();

        HttpEntity<ChatGptRequestDto> requestEntity = new HttpEntity<>(chatGptRequestDto, headers);
        ResponseEntity<String> response = chatGptConfig
                .restTemplate()
                .exchange(legacyPromptUrl, HttpMethod.POST, requestEntity, String.class);


        Map<String, Object> resultMap = new HashMap<>();
        try {
            ObjectMapper om = new ObjectMapper();
            resultMap = om.readValue(response.getBody(), new TypeReference<>() {
            });
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        } catch (RuntimeException e) {
            e.printStackTrace();
        }
        List<Choice> choices = (List<Choice>) resultMap.get("choices");
        Map<String, Object> textMap = (Map<String, Object>) choices.get(0);
        String result = (String) textMap.get("text");
        result = result.substring(2);

        log.info("{ ChatGptService } : 요약본번역 성공");
        return result;
    }


    public String translateText(String summary) {
        summary += " 베트남어로 번역해줘";
        return summary;
    }

}