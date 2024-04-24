package com.ssafy.bridgetalkback.auth.controller;

import com.ssafy.bridgetalkback.auth.dto.ParentsSignupRequestDto;
import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.global.exception.BaseException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.util.UUID;

import static com.ssafy.bridgetalkback.fixture.ParentsFixture.SUNKYOUNG;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Auth [Controller Layer] -> AuthController 테스트")
public class AuthControllerTest extends ControllerTest {
    @Nested
    @DisplayName("회원가입(부모) API [POST /api/auth/signup]")
    class signup {
        private static final String BASE_URL = "/api/auth/signup";

        @Test
        @DisplayName("중복된 이메일이라면 회원가입에 실패한다")
        void throwExceptionByDuplicateEmail() throws Exception {
            // given
            doThrow(BaseException.type(AuthErrorCode.DUPLICATE_EMAIL))
                    .when(authService)
                    .signup(any());

            // when
            final ParentsSignupRequestDto request = createParentsSignupRequestDto();
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(request));

            // then
            final AuthErrorCode expectedError = AuthErrorCode.DUPLICATE_EMAIL;
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isBadRequest(),
                            jsonPath("$.status").exists(),
                            jsonPath("$.status").value(expectedError.getStatus().value()),
                            jsonPath("$.errorCode").exists(),
                            jsonPath("$.errorCode").value(expectedError.getErrorCode()),
                            jsonPath("$.message").exists(),
                            jsonPath("$.message").value(expectedError.getMessage())
                    );

        }

        @Test
        @DisplayName("회원가입에 성공한다")
        void success() throws Exception {
            // given
            doReturn(UUID.randomUUID())
                    .when(authService)
                    .signup(any());

            // when
            final ParentsSignupRequestDto request = createParentsSignupRequestDto();
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(request));

            // then
            mockMvc.perform(requestBuilder)
                    .andExpectAll(
                            status().isOk()
                    );
        }
    }

    private ParentsSignupRequestDto createParentsSignupRequestDto() {
        return new ParentsSignupRequestDto(SUNKYOUNG.getParentsEmail(), SUNKYOUNG.getParentsPassword(), SUNKYOUNG.getParentsName(),
                SUNKYOUNG.getParentsNickname(), SUNKYOUNG.getParentsDino());
    }
}
