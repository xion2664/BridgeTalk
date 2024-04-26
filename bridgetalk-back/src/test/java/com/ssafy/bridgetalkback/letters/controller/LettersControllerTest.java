package com.ssafy.bridgetalkback.letters.controller;

import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.letters.service.LettersService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Letter [Controller Layer] -> LetterController 테스트")
class LettersControllerTest extends ControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private LettersService lettersService;

    @Nested
    @DisplayName("편지 음성 데이터 조회 API [GET /api/letters/{lettersId})")
    class FindLettersVoiceTest {
        private static final String BASE_URL = "/api/letters";

        @Test
        @DisplayName("음성데이터타입(audio) 값을 반환한다.")
        void shouldReturnAudioFile() throws Exception {
            // given
            Long testLettersId = 1L;
            Resource mockResource = mock(Resource.class);
            when(lettersService.findLettersVoice(any(Long.class))).thenReturn(mockResource);

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL + "/" + testLettersId)
                    .accept(MediaType.parseMediaType("audio/mpeg"));

            // then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType(MediaType.parseMediaType("audio/mpeg")));
        }

        @Test
        @DisplayName("편지에 대한 음성 데이터 조회에 성공한다.")
        void success() throws Exception {
            // given
            Long testLettersId = 1L;
            Resource mockResource = mock(Resource.class);
            when(lettersService.findLettersVoice(any(Long.class))).thenReturn(mockResource);

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL + "/" + testLettersId)
                    .accept(MediaType.parseMediaType("audio/mpeg"));

            // then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }
    }
}
