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
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClientException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatGptService {

    private final ChatGptConfig chatGptConfig;

    @Value("${OPENAI_URL}")
    private String legacyPromptUrl;

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<String[]> createSummary(String originText){
        String[] summary = new String[2];
        summary[0] = createPrompt(originText, ChatGptRequestCode.SUMMARY);
        summary[1] = createPrompt(summary[0], ChatGptRequestCode.TRANSLATE);
        return CompletableFuture.completedFuture(summary);
    }

    @Async("threadPoolTaskExecutor")
    public CompletableFuture<String[]> createKeywords(String originText){
        String[] keywords = new String[2];
        keywords[0] = createPrompt(originText, ChatGptRequestCode.KEYWORD);
        keywords[1] = createPrompt(keywords[0], ChatGptRequestCode.TRANSLATE);
        return CompletableFuture.completedFuture(keywords);
    }

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


    public String createText(String text, ChatGptRequestCode gptRequestCode) {
        if (gptRequestCode.equals(ChatGptRequestCode.SUMMARY)) {
            text += " 3줄 요약해서 한줄로 나열해줘";
            log.info(">> prompt : {}", text);
        } else if (gptRequestCode.equals(ChatGptRequestCode.TRANSLATE)) {
            text += " 베트남어로 번역해줘";
            log.info(">> prompt : {}", text);
        } else if (gptRequestCode.equals(ChatGptRequestCode.CONVERSION)) {
            text += " 이 베트남어 문단을 한국어로 번역하고, 부드럽고 친근한 엄마의 어조로 다듬어줘";
            log.info(">> prompt : {}", text);
        } else if (gptRequestCode.equals(ChatGptRequestCode.KEYWORD)) {
            text += " 핵심 키워드 3개 추출해서 한줄로 나열해줘";
            log.info(">> prompt : {}", text);
        } else if (gptRequestCode.equals(ChatGptRequestCode.ANSWER)) {
            text += "\n 위 문장들에 대해 공감하는 표현으로 두 문장으로 이어지게 대답해줘";
            log.info(">> prompt : {}", text);
        }
        return text;
    }

}