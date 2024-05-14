package com.ssafy.bridgetalkback.comment.controller;

import com.ssafy.bridgetalkback.auth.exception.AuthErrorCode;
import com.ssafy.bridgetalkback.comments.dto.request.CommentsRequestDto;
import com.ssafy.bridgetalkback.comments.dto.request.CommentsUpdateRequestDto;
import com.ssafy.bridgetalkback.comments.dto.response.CommentsResponseDto;
import com.ssafy.bridgetalkback.common.ControllerTest;
import com.ssafy.bridgetalkback.reports.domain.Language;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import java.time.LocalDateTime;
import java.util.UUID;

import static com.google.common.net.HttpHeaders.AUTHORIZATION;
import static com.ssafy.bridgetalkback.fixture.CommentsFixture.COMMENTS_01;
import static com.ssafy.bridgetalkback.fixture.CommentsFixture.COMMENTS_02;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.BEARER_TOKEN;
import static com.ssafy.bridgetalkback.fixture.TokenFixture.REFRESH_TOKEN;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doReturn;
import static org.springframework.http.MediaType.APPLICATION_JSON;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@DisplayName("Comments [Controller Layer] -> CommentsControllerTest 테스트")
public class CommentsControllerTest extends ControllerTest {

    @Nested
    @DisplayName("Comments 생성 API [POST /api/comments]")
    class createComments {
        private static final String BASE_URL = "/api/comments";

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            final CommentsRequestDto commentsRequestDto = createCommentsRequestDto(Language.kor);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsRequestDto));

            //then
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
        @DisplayName("(한국어) 등록에 성공한다.")
        void successKor() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(createCommentsResponseDto(Language.kor))
                    .when(commentsService)
                    .createComments(any(), any());

            //when
            final CommentsRequestDto commentsRequestDto = createCommentsRequestDto(Language.kor);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsRequestDto));

            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isCreated());
        }

        @Test
        @DisplayName("(베트남어) 등록에 성공한다.")
        void successViet() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(createCommentsResponseDto(Language.viet))
                    .when(commentsService)
                    .createComments(any(), any());

            //when
            final CommentsRequestDto commentsRequestDto = createCommentsRequestDto(Language.viet);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .post(BASE_URL)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsRequestDto));

            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isCreated());
        }
    }

    @Nested
    @DisplayName("Comments 수정 API [PATCH /api/comments/{commentsId}]")
    class updateComments {
        private static final String BASE_URL = "/api/comments/{commentsId}";
        private static final Long COMMENTS_ID = 1L;

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            final CommentsUpdateRequestDto commentsUpdateRequestDto = createCommentsUpdateRequestDto(Language.kor);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .patch(BASE_URL, COMMENTS_ID)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsUpdateRequestDto));

            //then
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
        @DisplayName("(한국어) 수정에 성공한다.")
        void successKor() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(createCommentsResponseDto(Language.kor))
                    .when(commentsService)
                    .updateComments(any(), any(), any());

            //when
            final CommentsUpdateRequestDto commentsUpdateRequestDto = createCommentsUpdateRequestDto(Language.kor);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .patch(BASE_URL, COMMENTS_ID)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsUpdateRequestDto));

            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }

        @Test
        @DisplayName("(베트남어) 수정에 성공한다.")
        void successViet() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doReturn(createCommentsResponseDto(Language.viet))
                    .when(commentsService)
                    .updateComments(any(), any(), any());

            //when
            final CommentsUpdateRequestDto commentsUpdateRequestDto = createCommentsUpdateRequestDto(Language.viet);
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .patch(BASE_URL, COMMENTS_ID)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN)
                    .contentType(APPLICATION_JSON)
                    .content(convertObjectToJson(commentsUpdateRequestDto));

            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }
    }

    @Nested
    @DisplayName("Comments 삭제 API [DELETE /api/comments/{commentsId}]")
    class deleteComments {
        private static final String BASE_URL = "/api/comments/{commentsId}";
        private static final Long COMMENTS_ID = 1L;

        @Test
        @DisplayName("Authorization_Header에 RefreshToken이 없으면 예외가 발생한다")
        void throwExceptionByInvalidPermission() throws Exception {
            // when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .patch(BASE_URL, COMMENTS_ID);

            //then
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
        @DisplayName("삭제에 성공한다.")
        void success() throws Exception {
            //given
            given(jwtProvider.getId(anyString())).willReturn(String.valueOf(UUID.randomUUID()));
            doNothing()
                    .when(commentsService)
                    .deleteComments(any(), any());

            //when
            MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                    .delete(BASE_URL, COMMENTS_ID)
                    .header(AUTHORIZATION, BEARER_TOKEN + REFRESH_TOKEN);
            //then
            mockMvc.perform(requestBuilder)
                    .andExpect(status().isOk());
        }
    }

    private CommentsUpdateRequestDto createCommentsUpdateRequestDto(Language language) {
        return language.equals(Language.kor)
                ? new CommentsUpdateRequestDto(COMMENTS_02.getCommentsContentKor(), language)
                : new CommentsUpdateRequestDto(COMMENTS_02.getCommentsContentViet(), language);
    }

    private CommentsRequestDto createCommentsRequestDto(Language language) {
        return language.equals(Language.kor)
                ? new CommentsRequestDto(1L, COMMENTS_01.getCommentsContentKor(), language)
                : new CommentsRequestDto(1L, COMMENTS_01.getCommentsContentViet(), language);
    }

    private CommentsResponseDto createCommentsResponseDto(Language language) {
        return language.equals(Language.kor)
                ? new CommentsResponseDto(1L, String.valueOf(UUID.randomUUID()), "닉네임", COMMENTS_01.getCommentsContentKor(), LocalDateTime.now())
                : new CommentsResponseDto(1L, String.valueOf(UUID.randomUUID()), "닉네임", COMMENTS_01.getCommentsContentViet(), LocalDateTime.now());
    }
}
