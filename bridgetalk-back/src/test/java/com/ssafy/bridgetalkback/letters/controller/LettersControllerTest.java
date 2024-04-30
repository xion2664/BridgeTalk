package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.letters.dto.request.LettersRequestDTO;
import com.ssafy.bridgetalkback.letters.dto.response.LettersResponseDTO;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.InjectMocks;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileInputStream;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.UUID;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.BEARER_TOKEN;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.REFRESH_TOKEN;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.when;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class LettersControllerTest extends ControllerTest {

    private static final String BASE_URL = "/api/letters/upload";
    private static final String FILE_PATH = "src/test/resources/files/";

    @Test
    @DisplayName("부모 음성 편지 업로드 테스트")
    public void uploadLetters() throws Exception {
        // given
        String fileName = "test.mp3";
        String contentType = "audio/mpeg";
        String dir = "letters";
        MultipartFile file = createMockMultipartFile(dir, fileName, contentType);

        given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
        doReturn(createUploadUrl())
                .when(lettersService)
                .saveVoiceFile(file);

        given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
        doReturn(createLettersResponseDto())
                .when(lettersService)
                .createText(createUploadUrl(), UUID.randomUUID().toString(), 1L);

        // when
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .post(BASE_URL)
                .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);

        // then
        mockMvc.perform(requestBuilder)
                .andExpect(status().isOk());
    }
    private String createUploadUrl() {
        return "https://birdgetalk/uploadUrl.com";
    }
    private LettersResponseDTO createLettersResponseDto() {
        return LettersResponseDTO.builder()
                .lettersId(1L)
                .lettersOriginalContent("originContent")
                .lettersTranslationContent("translationContent")
                .build();
    }
    private MockMultipartFile createMockMultipartFile(String dir, String fileName, String contentType) throws IOException {
        try (FileInputStream stream = new FileInputStream(FILE_PATH + fileName)) {
            return new MockMultipartFile(dir, fileName, contentType, stream);
        }
    }


}