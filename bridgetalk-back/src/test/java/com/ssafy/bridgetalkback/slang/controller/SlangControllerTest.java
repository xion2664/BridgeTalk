package com.ssafy.bridgetalkback.slang.controller;

import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.slang.dto.response.SlangListResponseDto;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.Collections;
import java.util.List;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.BEARER_TOKEN;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.REFRESH_TOKEN;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@DisplayName("Slang [Controller Layer] -> SlangController 테스트")
public class SlangControllerTest extends ControllerTest {


    @Nested
    @DisplayName("Slang 전체 조회 API [GET /api/slang]")
    class findAllSlang {
        private static final String BASE_URL = "/api/slang";

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL);

            // then
            final AuthErrorCode expectedError = AuthErrorCode.INVALID_PERMISSION;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isForbidden(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );

        }

        @Test
        @DisplayName("Slang 전체 조회에 성공한다.")
        void success() throws Exception {
            // given
            List<SlangListResponseDto> mockResponse = Collections.singletonList(
                    new SlangListResponseDto(1L, "slangWord", "originalWord", "meaning", "vietnamesePronunciation", "vietnameseTranslation")
            );
            given(slangService.findAllSlang()).willReturn(mockResponse);

            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .get(BASE_URL)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);

            // then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk())
                    .andExpect(content().contentType("application/json;charset=UTF-8"))
                    .andExpect(jsonPath("$[0].slangId").value(1L))
                    .andExpect(jsonPath("$[0].slangWord").value("slangWord"))
                    .andExpect(jsonPath("$[0].originalWord").value("originalWord"))
                    .andExpect(jsonPath("$[0].meaning").value("meaning"))
                    .andExpect(jsonPath("$[0].vietnamesePronunciation").value("vietnamesePronunciation"))
                    .andExpect(jsonPath("$[0].vietnameseTranslation").value("vietnameseTranslation"))
                    .andExpect(jsonPath("$.length()").value(1));
        }

    }
}